import { getDb, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const sql = getDb();
    const clinicians = await sql`
      SELECT 
        id, 
        full_name, 
        title, 
        specialty, 
        qualifications, 
        registration_number, 
        registration_body, 
        verification_status, 
        bio, 
        photo_url, 
        consultation_methods, 
        languages,
        is_active
      FROM clinicians
      WHERE is_active = true
      ORDER BY full_name ASC
    `;

    sendSuccess(res, { clinicians });
  } catch (error) {
    console.error('Clinicians fetch error:', error);
    sendError(res, 500, 'Failed to fetch clinicians');
  }
}
