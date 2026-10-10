import { getDb, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const sql = getDb();
    const services = await sql`
      SELECT 
        id, 
        name, 
        slug, 
        description, 
        category, 
        price_ngn, 
        duration_minutes, 
        icon, 
        sort_order
      FROM services
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;

    sendSuccess(res, { services });
  } catch (error) {
    console.error('Services fetch error:', error);
    sendError(res, 500, 'Failed to fetch services');
  }
}
