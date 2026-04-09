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
           <section id="blog" style={{ background: 'white', minHeight: 'calc(100vh - 76px)', padding: '60px 40px' }}>
             <div className="section-header">
               <span className="pill">📝 Articles & News</span>
               <h2>Maternal Blog</h2>
               <p>Read the latest updates, stories, and expert articles directly from the PreggiMum community.</p>
             </div>
             
             <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '600px' }}>
                <div className="elfsight-app-abc1a5c7-aaef-42bf-9928-da2b0f1bf579" data-elfsight-app-lazy></div>
             </div>
           </section>
        </main>
    );
}

export default Blog;
