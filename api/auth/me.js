import { getDb, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET') { sendError(res, 405, 'Method not allowed'); return; }

  const auth = requireAuth(req, res);
  if (!auth) return;

  try {
    const sql = getDb();
    const users = await sql`
      SELECT id, email, full_name, phone, role, created_at
      FROM users WHERE id = ${auth.id}
    `;

    if (users.length === 0) {
      return sendError(res, 404, 'User not found');
    }

    sendSuccess(res, { user: users[0] });
  } catch (error) {
    console.error('Me endpoint error:', error);
    sendError(res, 500, 'Failed to fetch user details');
  }
}
