const Tips = () => {
    return (
      <main>
        <section id="tips" style={{ background: 'white', minHeight: 'calc(100vh - 76px)' }}>
          <div className="section-header">
            <span className="pill">💡 Practical Guidance</span>
            <h2>Tips & Guides for Every Mum</h2>
            <p>Simple, practical advice to help you feel confident and informed throughout your journey.</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🥦</div>
              <h3>Nutrition During Pregnancy</h3>
              <p>Eat a balanced diet rich in folic acid, iron, calcium, and DHA. Avoid raw fish, unpasteurised cheese, and excess caffeine. Hydration is your best friend.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🧘</div>
              <h3>Exercise & Movement</h3>
              <p>Gentle walking, swimming, and prenatal yoga are safe and beneficial. Always consult your doctor before starting any exercise programme during pregnancy.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">😴</div>
              <h3>Sleep & Rest</h3>
              <p>Sleep on your left side in your third trimester to improve circulation. Use pillows for support and aim for 7-9 hours of rest per night.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💊</div>
              <h3>Prenatal Vitamins</h3>
              <p>Start folic acid supplements at least one month before conception. Continue with prescribed prenatal vitamins throughout your pregnancy and while breastfeeding.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">❤️</div>
              <h3>Emotional Wellbeing</h3>
              <p>Hormonal changes are normal. Talk to someone you trust, join support groups, and don't hesitate to seek professional help if you're feeling overwhelmed.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🏥</div>
              <h3>Antenatal Check-ups</h3>
              <p>Don't skip your scheduled visits. Regular check-ups monitor baby's growth, detect complications early, and keep both mother and baby safe throughout pregnancy.</p>
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default Tips;
