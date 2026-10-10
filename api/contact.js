import { parseBody, setCorsHeaders, sendSuccess, sendError } from './_lib/db.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const { name, email, phone, subject, message } = await parseBody(req);
    if (!name || !email || !message) {
      return sendError(res, 400, 'Name, email, and message are required');
    }

    // In production this can dispatch email via Resend/SendGrid and log into DB
    console.log('PreggiMum Contact Inquiry:', { name, email, phone, subject, message, receivedAt: new Date().toISOString() });

    sendSuccess(res, {
      message: 'Thank you for reaching out to PreggiMum. Our care coordination team will respond within 24 hours.'
    }, 200);
  } catch (error) {
    console.error('Contact endpoint error:', error);
    sendError(res, 500, 'Failed to process inquiry');
  }
}
