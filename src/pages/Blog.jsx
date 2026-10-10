import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Blog({ onOpenEmergencyGuide }) {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await api.getArticles();
        setArticles(data);
      } catch (e) {
        console.error('Failed to load articles', e);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const categories = ['All', 'Emergency & Safety', 'Nutrition & Wellness', 'Labour & Delivery'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="blog-page" style={{ paddingTop: '20px' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(180deg, #FDFBF8 0%, #F5EDE6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>
            Clinical Evidence & Guidance
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
            Maternal Knowledge Hub
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Peer-reviewed maternal health guides written and medically vetted by practicing Nigerian obstetricians and midwives.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '40px 24px 80px', background: 'var(--color-ivory)' }}>
        <div className="section-container">
          {/* Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`badge-pill ${activeCategory === cat ? 'badge-terracotta' : 'badge-plum'}`}
                style={{ padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Loading educational library...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
              {filteredArticles.map((art) => (
                <div 
                  key={art.id} 
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge-pill badge-terracotta">{art.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{art.read_time || '5 min read'}</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--color-plum)', lineHeight: '1.3' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '20px', flexGrow: 1 }}>
                    {art.excerpt}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginBottom: '18px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div>✍️ Author: <strong>{art.author}</strong></div>
                    <div style={{ color: 'var(--color-sage)', fontWeight: 600 }}>✓ Medically Reviewed: {art.reviewer}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(art)}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    Read Full Clinical Guide →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Maternal Care Tips (Preserved & Enhanced) */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span className="badge-pill badge-sage">Daily Essentials</span>
              <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>Practical maternal wellness tips</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💧</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Consistent Safe Hydration</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Drink at least 2.5 to 3 liters of clean, safe drinking water daily in Nigeria's tropical climate to maintain amniotic fluid volume and prevent urinary tract infections.
                </p>
              </div>

              <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💤</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Left-Side Sleeping</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  From week 24 onwards, sleep on your left side using a pillow between your knees to maximize placental blood flow and take pressure off your inferior vena cava.
                </p>
              </div>

              <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🥗</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Steamed Local Greens</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Lightly steam ugwu, spinach, or waterleaf to preserve delicate folic acid and vitamin C while enhancing iron absorption from meals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
            <div className="modal-header">
              <div>
                <span className="badge-pill badge-terracotta" style={{ marginBottom: '4px' }}>
                  {selectedArticle.category}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-plum)', lineHeight: '1.3' }}>
                  {selectedArticle.title}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedArticle(null)} 
                className="modal-close-btn"
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ background: 'var(--color-ivory)', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span>✍️ Author: <strong>{selectedArticle.author}</strong></span>
                <span>✓ Reviewed By: <strong>{selectedArticle.reviewer}</strong></span>
              </div>

              <div style={{ fontSize: '0.96rem', lineHeight: '1.8', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => setSelectedArticle(null)} 
                  className="btn-secondary"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
