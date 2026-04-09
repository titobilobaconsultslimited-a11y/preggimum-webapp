import { useState } from 'react';

const Contact = () => {
    const [fbSuccess, setFbSuccess] = useState(false);
    const [subSuccess, setSubSuccess] = useState(false);

    const submitFeedback = () => {
        const name = document.getElementById('fb-name').value.trim();
        const phone = document.getElementById('fb-phone').value.trim();
        const cat = document.getElementById('fb-cat').value;
        const msg = document.getElementById('fb-msg').value.trim();
        if (!name || !msg) { alert('Please enter your name and message.'); return; }
        const text = encodeURIComponent("Hello PreggiMum! \n\nName: " + name + "\nPhone: " + phone + "\nCategory: " + cat + "\n\nMessage: " + msg);
        setFbSuccess(true);
        setTimeout(() => { window.open('https://wa.me/2347035084868?text=' + text, '_blank'); }, 800);
    };

    const submitSubscribe = () => {
        const name = document.getElementById('sub-name').value.trim();
        const email = document.getElementById('sub-email').value.trim();
        const phone = document.getElementById('sub-phone').value.trim();
        const cat = document.getElementById('sub-cat').value;
        if (!name || !email) { alert('Please enter your name and email.'); return; }
        setSubSuccess(true);
        const text = encodeURIComponent("Hello PreggiMum! I'd like to subscribe to updates.\n\nName: " + name + "\nEmail: " + email + "\nWhatsApp: " + phone + "\nStage: " + cat);
        setTimeout(() => { window.open('https://wa.me/2347035084868?text=' + text, '_blank'); }, 1000);
    };

    return (
        <main>
            <section id="contact" className="forms-section">
                <div className="section-header">
                    <span className="pill">📬 Stay Connected</span>
                    <h2>Feedback & Subscribe</h2>
                    <p>We'd love to hear from you — and keep you updated with everything maternal health.</p>
                </div>
                <div className="forms-grid">

                    <div className="form-card">
                        <h3>💬 Send Us Feedback</h3>
                        <p>Your experience helps us improve. Share your thoughts, questions, or suggestions.</p>
                        <div className="form-group">
                            <label htmlFor="fb-name">Full Name</label>
                            <input type="text" id="fb-name" placeholder="Your full name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fb-phone">Phone / WhatsApp</label>
                            <input type="tel" id="fb-phone" placeholder="+234 ..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fb-cat">Category</label>
                            <select id="fb-cat">
                                <option value="">Select your stage</option>
                                <option>Trying to Conceive</option>
                                <option>Pregnant Mother</option>
                                <option>Teenage Mother</option>
                                <option>Lactating Mother</option>
                                <option>Postpartum Recovery</option>
                                <option>General Inquiry</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fb-msg">Your Message</label>
                            <textarea id="fb-msg" placeholder="Share your feedback, question or experience..."></textarea>
                        </div>
                        <button className="form-submit" onClick={submitFeedback}>Send Feedback via WhatsApp</button>
                        <div className="success-msg" style={{ display: fbSuccess ? 'block' : 'none' }}>
                            ✅ Thank you! Redirecting you to WhatsApp...
                        </div>
                    </div>

                    <div className="form-card">
                        <h3>📧 Subscribe to Updates</h3>
                        <p>Get weekly tips, news, and expert articles delivered to your inbox or WhatsApp.</p>
                        <div className="form-group">
                            <label htmlFor="sub-name">Full Name</label>
                            <input type="text" id="sub-name" placeholder="Your full name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-email">Email Address</label>
                            <input type="email" id="sub-email" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-phone">WhatsApp Number</label>
                            <input type="tel" id="sub-phone" placeholder="+234 ..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-cat">What describes you?</label>
                            <select id="sub-cat">
                                <option value="">Select your stage</option>
                                <option>Trying to Conceive</option>
                                <option>Pregnant Mother</option>
                                <option>Teenage Mother</option>
                                <option>Lactating Mother</option>
                                <option>General Health Interest</option>
                            </select>
                        </div>
                        <button className="form-submit" onClick={submitSubscribe}>Subscribe Now</button>
                        <div className="success-msg" style={{ display: subSuccess ? 'block' : 'none' }}>
                            🎉 You're subscribed! Welcome to the PreggiMum family!
                        </div>

                        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--pink-light)', textAlign: 'center' }}>
                            <p style={{ fontWeight: '700', color: 'var(--text)', marginBottom: '14px' }}>Join our WhatsApp Group</p>
                            <a href="https://wa.me/2347035084868?text=Hello%20PreggiMum%2C%20I%20would%20like%20to%20join%20your%20WhatsApp%20group" target="_blank" rel="noreferrer" className="wa-btn" style={{ fontSize: '0.95rem', padding: '12px 28px' }}>
                                <svg viewBox="0 0 24 24" fill="white" width="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.107 1.508 5.836L.057 23.868a.75.75 0 0 0 .92.921l6.109-1.435A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.727 9.727 0 0 1-4.935-1.345l-.354-.21-3.658.859.875-3.57-.228-.368A9.714 9.714 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                                Join WhatsApp Group
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            <div className="social-section">
                <div className="section-header" style={{ marginBottom: '0' }}>
                    <span className="pill">📲 Follow Us</span>
                    <h2>Find Us on Social Media</h2>
                    <p style={{ marginTop: '10px' }}>Follow <strong>@preggimum</strong> for daily tips, inspiration, and community support across all platforms.</p>
                </div>
                <div className="social-links">
                    <a href="https://facebook.com/preggimum" target="_blank" rel="noreferrer" className="social-btn fb" aria-label="Facebook">
                        <svg width="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                        Facebook
                    </a>
                    <a href="https://instagram.com/preggimum" target="_blank" rel="noreferrer" className="social-btn ig" aria-label="Instagram">
                        <svg width="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                        Instagram
                    </a>
                    <a href="https://twitter.com/preggimum" target="_blank" rel="noreferrer" className="social-btn tw" aria-label="Twitter">
                        <svg width="20" viewBox="0 0 24 24" fill="white"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        Twitter / X
                    </a>
                    <a href="https://tiktok.com/@preggimum" target="_blank" rel="noreferrer" className="social-btn tk" aria-label="TikTok">
                        <svg width="20" viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                        TikTok
                    </a>
                    <a href="https://youtube.com/@preggimum" target="_blank" rel="noreferrer" className="social-btn yt" aria-label="YouTube">
                        <svg width="20" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                        YouTube
                    </a>
                </div>
            </div>
        </main>
    );
};

export default Contact;
