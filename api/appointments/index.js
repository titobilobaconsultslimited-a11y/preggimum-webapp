import { getDb, parseBody, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';
import { getAuthUser } from '../_lib/auth.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const sql = getDb();
  const authUser = getAuthUser(req);

  if (req.method === 'GET') {
    if (!authUser) {
      return sendError(res, 401, 'Authentication required to view appointments');
    }

    try {
      let appointments;
      if (authUser.role === 'admin') {
        appointments = await sql`
          SELECT 
            a.*,
            s.name as service_name,
            c.full_name as clinician_name,
            c.specialty as clinician_specialty
          FROM appointments a
          LEFT JOIN services s ON a.service_id = s.id
          LEFT JOIN clinicians c ON a.clinician_id = c.id
          ORDER BY a.appointment_date DESC, a.start_time DESC
        `;
      } else {
        appointments = await sql`
          SELECT 
            a.*,
            s.name as service_name,
            c.full_name as clinician_name,
            c.specialty as clinician_specialty
          FROM appointments a
          LEFT JOIN services s ON a.service_id = s.id
          LEFT JOIN clinicians c ON a.clinician_id = c.id
          WHERE a.patient_id = ${authUser.id} OR a.patient_email = ${authUser.email}
          ORDER BY a.appointment_date DESC, a.start_time DESC
        `;
      }

      return sendSuccess(res, { appointments });
    } catch (error) {
      console.error('Fetch appointments error:', error);
      return sendError(res, 500, 'Failed to fetch appointments');
    }
  }

  if (req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const {
        service_id,
        clinician_id,
        appointment_date,
        start_time,
        end_time,
        consultation_method = 'video',
        reason,
        gestational_week,
        patient_name,
        patient_phone,
        patient_email,
        amount_ngn = 3000,
        consent_given = true,
        emergency_acknowledged = true
      } = data;

      if (!appointment_date || !start_time || !patient_name || !patient_phone || !patient_email) {
        return sendError(res, 400, 'Appointment date, time, patient name, phone, and email are required');
      }

      if (!emergency_acknowledged) {
        return sendError(res, 400, 'Emergency acknowledgement is required');
      }

      // Generate human-friendly reference: PG-XXXXXX
      const randDigits = Math.floor(100000 + Math.random() * 900000);
      const reference = `PG-${randDigits}`;
      const total_ngn = Number(amount_ngn);

      const patientId = authUser ? authUser.id : null;

      const created = await sql`
        INSERT INTO appointments (
          reference,
          patient_id,
          clinician_id,
          service_id,
          appointment_date,
          start_time,
          end_time,
          consultation_method,
          reason,
          gestational_week,
          patient_name,
          patient_phone,
          patient_email,
          amount_ngn,
          total_ngn,
          status,
          payment_status,
          consent_given,
          consent_timestamp,
          consent_version,
          emergency_acknowledged
        ) VALUES (
          ${reference},
          ${patientId},
          ${clinician_id || null},
          ${service_id || null},
          ${appointment_date},
          ${start_time},
          ${end_time || '00:00:00'},
          ${consultation_method},
          ${reason || ''},
          ${gestational_week ? parseInt(gestational_week) : null},
          ${patient_name},
          ${patient_phone},
          ${patient_email},
          ${total_ngn},
          ${total_ngn},
          'confirmed',
          'pending',
          ${consent_given},
          NOW(),
          '1.0',
          ${emergency_acknowledged}
        )
        RETURNING *
      `;

      return sendSuccess(res, {
        appointment: created[0],
        message: 'Appointment reserved successfully'
      }, 201);
    } catch (error) {
      console.error('Create appointment error:', error);
      return sendError(res, 500, 'Failed to create appointment: ' + error.message);
    }
  }

  sendError(res, 405, 'Method not allowed');
}
