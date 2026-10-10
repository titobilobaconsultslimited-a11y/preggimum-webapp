import bcrypt from 'bcryptjs';
import { getDb, parseBody, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';
import { generateToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const { email, password } = await parseBody(req);

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    const sql = getDb();

    const result = await sql`
      SELECT id, email, password_hash, full_name, phone, role
      FROM users WHERE email = ${email.toLowerCase().trim()}
    `;

    if (result.length === 0) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user);

    sendSuccess(res, {
      user: { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone, role: user.role },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 500, 'Login failed. Please try again.');
  }
}
