import { getDb, setCorsHeaders, sendSuccess, sendError } from './_lib/db.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { sendError(res, 405, 'Method not allowed'); return; }

  const sql = getDb();

  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'patient' CHECK (role IN ('patient', 'clinician', 'admin')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS clinicians (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        full_name VARCHAR(255) NOT NULL,
        title VARCHAR(50),
        specialty VARCHAR(100) NOT NULL,
        qualifications TEXT,
        registration_number VARCHAR(100),
        registration_body VARCHAR(100),
        verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
        verified_at TIMESTAMPTZ,
        verified_by VARCHAR(255),
        licence_expiry DATE,
        bio TEXT,
        photo_url TEXT,
        consultation_methods TEXT DEFAULT 'video,phone',
        languages TEXT DEFAULT 'English',
        is_active BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        price_ngn INTEGER NOT NULL,
        duration_minutes INTEGER DEFAULT 30,
        icon VARCHAR(10) DEFAULT '🩺',
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS clinician_services (
        clinician_id UUID REFERENCES clinicians(id) ON DELETE CASCADE,
        service_id UUID REFERENCES services(id) ON DELETE CASCADE,
        custom_price_ngn INTEGER,
        PRIMARY KEY (clinician_id, service_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS availability_slots (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        clinician_id UUID REFERENCES clinicians(id) ON DELETE CASCADE,
        slot_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        is_booked BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(clinician_id, slot_date, start_time)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reference VARCHAR(20) UNIQUE NOT NULL,
        patient_id UUID REFERENCES users(id),
        clinician_id UUID REFERENCES clinicians(id),
        service_id UUID REFERENCES services(id),
        slot_id UUID REFERENCES availability_slots(id),
        appointment_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
        consultation_method VARCHAR(20) DEFAULT 'video',
        reason TEXT,
        gestational_week INTEGER,
        patient_name VARCHAR(255),
        patient_phone VARCHAR(20),
        patient_email VARCHAR(255),
        amount_ngn INTEGER NOT NULL,
        service_fee_ngn INTEGER DEFAULT 0,
        total_ngn INTEGER NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'refunded', 'failed')),
        payment_reference VARCHAR(100),
        payment_provider VARCHAR(20),
        payment_verified_at TIMESTAMPTZ,
        consent_given BOOLEAN DEFAULT false,
        consent_timestamp TIMESTAMPTZ,
        consent_version VARCHAR(20),
        emergency_acknowledged BOOLEAN DEFAULT false,
        clinician_notes TEXT,
        follow_up_notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS consents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id),
        consent_type VARCHAR(50) NOT NULL,
        consent_version VARCHAR(20) NOT NULL DEFAULT '1.0',
        accepted BOOLEAN NOT NULL,
        given_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(255),
        reviewer VARCHAR(255),
        published_at TIMESTAMPTZ,
        reviewed_at TIMESTAMPTZ,
        is_published BOOLEAN DEFAULT false,
        featured_image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Seed default services
    const existingServices = await sql`SELECT COUNT(*) as count FROM services`;
    if (parseInt(existingServices[0].count) === 0) {
      await sql`
        INSERT INTO services (name, slug, description, category, price_ngn, duration_minutes, icon, sort_order) VALUES
        ('General Pregnancy Questions', 'general-pregnancy', 'General questions about pregnancy, symptoms, and what to expect at each stage.', 'pregnancy', 3000, 30, '🤰', 1),
        ('Antenatal Care Guidance', 'antenatal-care', 'Guidance on antenatal visits, tests, screenings, and prenatal health.', 'pregnancy', 3000, 30, '📋', 2),
        ('Pregnancy Nutrition', 'pregnancy-nutrition', 'Dietary advice, meal planning, supplements, and nutrition during pregnancy.', 'pregnancy', 3000, 30, '🥗', 3),
        ('Labour & Birth Preparation', 'birth-preparation', 'Preparing for labour, birth plans, pain management options, and what to expect.', 'birth', 4000, 30, '🏥', 4),
        ('Postpartum Recovery', 'postpartum-recovery', 'Physical and emotional recovery after childbirth, wound care, and adjusting to motherhood.', 'postnatal', 4000, 30, '💗', 5),
        ('Breastfeeding Support', 'breastfeeding-support', 'Latch techniques, milk supply, expressing, weaning, and common breastfeeding challenges.', 'postnatal', 3000, 30, '🤱', 6),
        ('Women''s Health Consultation', 'womens-health', 'Gynaecological concerns, reproductive health, and women''s wellness consultations.', 'specialist', 5000, 45, '👩‍⚕️', 7)
      `;
    }

    // Seed admin user if none exists
    const existingAdmins = await sql`SELECT COUNT(*) as count FROM users WHERE role = 'admin'`;
    if (parseInt(existingAdmins[0].count) === 0) {
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.hash('PreggiMum2026!', 10);
      await sql`
        INSERT INTO users (email, password_hash, full_name, role)
        VALUES ('admin@preggimum.com', ${hash}, 'PreggiMum Admin', 'admin')
      `;
    }

    sendSuccess(res, { message: 'Database setup completed successfully. Tables created and seed data inserted.' });
  } catch (error) {
    console.error('DB Setup Error:', error);
    sendError(res, 500, 'Database setup failed: ' + error.message);
  }
}
