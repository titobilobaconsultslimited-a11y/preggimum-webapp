import bcrypt from 'bcryptjs';
import { getDb, parseBody, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';
import { generateToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const { email, password, full_name, phone } = await parseBody(req);

    if (!email || !password || !full_name) {
      return sendError(res, 400, 'Email, password, and full name are required');
    }
    if (password.length < 8) {
      return sendError(res, 400, 'Password must be at least 8 characters');
    }

    const sql = getDb();

    // Check if user already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase().trim()}`;
    if (existing.length > 0) {
      return sendError(res, 409, 'An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (email, password_hash, full_name, phone, role)
      VALUES (${email.toLowerCase().trim()}, ${passwordHash}, ${full_name.trim()}, ${phone || null}, 'patient')
      RETURNING id, email, full_name, phone, role, created_at
    `;

    const user = result[0];
    const token = generateToken(user);

    sendSuccess(res, {
      user: { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone, role: user.role },
      token
    }, 201);
  } catch (error) {
    console.error('Register error:', error);
    sendError(res, 500, 'Registration failed. Please try again.');
  }
}
