import { getDb, setCorsHeaders, sendSuccess, sendError } from '../_lib/db.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET') { sendError(res, 405, 'Method not allowed'); return; }

  try {
    const sql = getDb();
    const articles = await sql`
      SELECT 
        id, 
        title, 
        slug, 
        excerpt, 
        content, 
        category, 
        author, 
        reviewer, 
        published_at, 
        featured_image
      FROM articles
      WHERE is_published = true
      ORDER BY published_at DESC
    `;

    sendSuccess(res, { articles });
  } catch (error) {
    console.error('Articles fetch error:', error);
    sendError(res, 500, 'Failed to fetch articles');
  }
}
