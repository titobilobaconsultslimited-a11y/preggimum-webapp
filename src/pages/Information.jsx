const Information = () => {
    return (
      <main>
        <section id="info" className="info-bg" style={{ minHeight: 'calc(100vh - 76px)' }}>
          <div className="section-header">
            <span className="pill">📚 Up-to-date Knowledge</span>
            <h2>Pregnancy & Maternal Information</h2>
            <p>Reliable, up-to-date information for every stage of your maternal journey.</p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <span className="tag">🌸 Conception</span>
              <h3>Understanding Conception</h3>
              <p>Learn about fertility cycles, the best time to conceive, ovulation tracking, and how to optimise your chances of getting pregnant. We cover everything from nutrition to lifestyle habits that support healthy conception.</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: 'var(--blue)' }}>
              <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue-dark)' }}>🤰 Pregnancy</span>
              <h3>Your Pregnancy Journey</h3>
              <p>Month-by-month guides covering physical changes, emotional health, prenatal check-ups, nutrition, what to expect at each trimester, and how to prepare for birth. Tailored for first-time and experienced mothers alike.</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#9c27b0' }}>
              <span className="tag" style={{ background: '#f3e5f5', color: '#7b1fa2' }}>👨‍👩‍👧 Teen Mothers</span>
              <h3>For Teenage Mothers</h3>
              <p>Safe, supportive, and judgment-free guidance for young mothers. We cover education rights, health decisions, emotional challenges, and building a strong support network for both mother and baby.</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: 'var(--teal)' }}>
              <span className="tag" style={{ background: '#e0f7fa', color: '#00838f' }}>🍼 Lactation</span>
              <h3>Breastfeeding & Lactation</h3>
              <p>Comprehensive guides on breastfeeding positions, managing milk supply, dealing with engorgement, introducing formula when needed, and knowing when and how to wean your baby safely.</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#ff9800' }}>
              <span className="tag" style={{ background: '#fff8e1', color: '#e65100' }}>🌟 Child Wellness</span>
              <h3>Child Growth & Development</h3>
              <p>Track your child's developmental milestones, understand vaccinations, handle common childhood illnesses, and learn how to support healthy emotional and cognitive growth from birth to school age.</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#e91e63' }}>
              <span className="tag" style={{ background: '#fce4ec', color: '#880e4f' }}>💗 Postpartum</span>
              <h3>Postpartum Recovery</h3>
              <p>What to expect after delivery, managing postpartum depression, healing your body, re-bonding with your partner, and the support systems that help new mothers thrive in the weeks and months after birth.</p>
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default Information;
