import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Error: DATABASE_URL environment variable is not set.");
  process.exit(1);
}
const sql = neon(dbUrl);

async function runSetup() {
  console.log("Connecting to Neon database...");

  // 1. Users table
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
  console.log("✓ users table ready");

  // 2. Clinicians table
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
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ clinicians table ready");

  // 3. Services table
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
  console.log("✓ services table ready");

  // 4. Clinician services
  await sql`
    CREATE TABLE IF NOT EXISTS clinician_services (
      clinician_id UUID REFERENCES clinicians(id) ON DELETE CASCADE,
      service_id UUID REFERENCES services(id) ON DELETE CASCADE,
      custom_price_ngn INTEGER,
      PRIMARY KEY (clinician_id, service_id)
    )
  `;
  console.log("✓ clinician_services table ready");

  // 5. Availability slots
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
  console.log("✓ availability_slots table ready");

  // 6. Appointments table
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
  console.log("✓ appointments table ready");

  // 7. Consents table
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
  console.log("✓ consents table ready");

  // 8. Articles table
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
      is_published BOOLEAN DEFAULT true,
      featured_image TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ articles table ready");

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
    console.log("✓ Default services seeded");
  }

  // Seed sample verified clinicians
  const existingClinicians = await sql`SELECT COUNT(*) as count FROM clinicians`;
  if (parseInt(existingClinicians[0].count) === 0) {
    await sql`
      INSERT INTO clinicians (full_name, title, specialty, qualifications, registration_number, registration_body, verification_status, verified_at, verified_by, bio, consultation_methods, languages, is_active) VALUES
      ('Dr. Ngozi Eze', 'Dr.', 'Obstetrician & Gynaecologist', 'MBBS, FWACS (OBGYN), FMCOG', 'MDCN/64821', 'Medical and Dental Council of Nigeria', 'verified', NOW(), 'PreggiMum Medical Board', 'Senior Consultant Obstetrician with over 12 years of clinical maternal care experience in Lagos and Abuja teaching hospitals. Passionate about safe deliveries and maternal wellness.', 'video,phone', 'English, Igbo, Yoruba', true),
      ('Nurse Folashade Adeleke', 'RN, RM', 'Certified Nurse-Midwife & Lactation Consultant', 'RN, RM, BNSc, IBCLC', 'NMCN/RN/99204', 'Nursing and Midwifery Council of Nigeria', 'verified', NOW(), 'PreggiMum Medical Board', 'Practicing certified midwife with 9 years supporting antenatal clinics, labour wards, and home postpartum visits across South-Western Nigeria.', 'video,phone', 'English, Yoruba', true),
      ('Dr. Amina Bello', 'Dr.', 'Maternal & Child Health Specialist', 'MBBS, MPH (Maternal Health)', 'MDCN/71339', 'Medical and Dental Council of Nigeria', 'verified', NOW(), 'PreggiMum Medical Board', 'Community maternal health physician focusing on prenatal nutrition, high-risk pregnancy screening, and comprehensive postnatal care.', 'video,phone', 'English, Hausa', true),
      ('Dr. Chioma Okonkwo', 'Dr.', 'Perinatal Mental Health Specialist & Physician', 'MBBS, MSc Perinatal Psych', 'MDCN/82194', 'Medical and Dental Council of Nigeria', 'verified', NOW(), 'PreggiMum Medical Board', 'Compassionate clinician dedicated to addressing postpartum depression, pregnancy anxiety, birth trauma, and new mother mental wellbeing.', 'video,phone', 'English, Igbo', true)
    `;
    console.log("✓ Sample verified clinicians seeded");
  }

  // Seed admin user
  const existingAdmins = await sql`SELECT COUNT(*) as count FROM users WHERE role = 'admin'`;
  if (parseInt(existingAdmins[0].count) === 0) {
    const hash = await bcrypt.hash('PreggiMum2026!', 10);
    await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES ('admin@preggimum.com', ${hash}, 'PreggiMum Admin', 'admin')
    `;
    console.log("✓ Admin user seeded");
  }

  // Seed essential articles
  const existingArticles = await sql`SELECT COUNT(*) as count FROM articles`;
  if (parseInt(existingArticles[0].count) === 0) {
    await sql`
      INSERT INTO articles (title, slug, excerpt, content, category, author, reviewer, published_at, reviewed_at, is_published) VALUES
      (
        'Warning Signs in Pregnancy Every Nigerian Mother Must Know',
        'warning-signs-in-pregnancy',
        'Essential danger signs during pregnancy that require immediate emergency medical attention at your nearest healthcare facility.',
        'During pregnancy, knowing when a symptom is a normal body adjustment versus when it is a red flag can save lives. Severe persistent headaches, sudden blurred vision, vaginal bleeding, fluid leaking, severe epigastric pain, or high fever are signs that warrant urgent evaluation. Never hesitate to visit your nearest maternity hospital emergency room if you experience any of these symptoms.',
        'Emergency & Safety',
        'Dr. Ngozi Eze, FWACS',
        'PreggiMum Clinical Safety Board',
        NOW(),
        NOW(),
        true
      ),
      (
        'First Trimester Nutrition: Essential Foods for You and Baby in Nigeria',
        'first-trimester-nutrition-nigeria',
        'A practical guide to nourishing foods, folate sources, and safe hydration during early pregnancy using affordable local ingredients.',
        'Early pregnancy places substantial metabolic demands on your body. Folate-rich leafy greens like ugwu, spinach, and waterleaf, alongside iron-rich legumes, boiled eggs, sweet potatoes, and fortified grain foods provide essential micronutrients necessary for neural tube formation and maternal blood volume expansion.',
        'Nutrition & Wellness',
        'Nurse Folashade Adeleke, RN',
        'Dr. Amina Bello, MPH',
        NOW(),
        NOW(),
        true
      ),
      (
        'Your Practical Birth Plan Checklist for Nigerian Hospitals',
        'practical-birth-plan-checklist-nigeria',
        'How to prepare emotionally, logistically, and medically for labour day in private or public hospitals across Nigeria.',
        'Creating a birth plan provides clarity for you, your partner, and your attending medical team. Prepare your hospital bag well in advance by week 34, confirm transport arrangements, have emergency contact numbers at hand, and discuss pain management expectations with your midwife or obstetrician before labour begins.',
        'Labour & Delivery',
        'Nurse Folashade Adeleke, RM',
        'Dr. Ngozi Eze, FWACS',
        NOW(),
        NOW(),
        true
      )
    `;
    console.log("✓ Educational articles seeded");
  }

  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
  console.log("Database initialized successfully! Public tables:", tables.map(t => t.table_name));
}

runSetup().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
