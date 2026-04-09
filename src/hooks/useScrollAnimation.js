import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollAnimation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We re-run the observer setup whenever the route (pathname) changes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Add .fade-in to elements we want to animate, if they don't have it
    const elementsToAnimate = document.querySelectorAll('.info-card, .doctor-card, .tip-card, .section-header, .form-card, .footer-col');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        // If they already have .visible from a previous route, remove it to re-animate
        el.classList.remove('visible'); 
        observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]); // Depend on pathname
};

export default useScrollAnimation;
