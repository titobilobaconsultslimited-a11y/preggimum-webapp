import { useEffect } from 'react';

const Blog = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <main>
           {/* 1. Blog Section */}
           <section id="blog" style={{ background: 'white', padding: '60px 40px' }}>
             <div className="section-header">
               <span className="pill">📝 Articles & News</span>
               <h2>Maternal Blog & Updates</h2>
               <p>Read the latest updates, stories, and expert articles directly from the PreggiMum community.</p>
             </div>
             <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '600px' }}>
                <div className="elfsight-app-abc1a5c7-aaef-42bf-9928-da2b0f1bf579" data-elfsight-app-lazy></div>
             </div>
           </section>

           {/* 2. Core Guides Section */}
           <section id="info" className="info-bg">
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

           {/* 3. Practical Tips Section */}
           <section id="tips" style={{ background: 'white' }}>
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
}

export default Blog;
