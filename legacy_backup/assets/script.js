function submitFeedback() {
  const name = document.getElementById('fb-name').value.trim();
  const phone = document.getElementById('fb-phone').value.trim();
  const cat = document.getElementById('fb-cat').value;
  const msg = document.getElementById('fb-msg').value.trim();
  if (!name || !msg) { alert('Please enter your name and message.'); return; }
  const text = encodeURIComponent("Hello PreggiMum! \n\nName: " + name + "\nPhone: " + phone + "\nCategory: " + cat + "\n\nMessage: " + msg);
  document.getElementById('fb-success').style.display = 'block';
  setTimeout(() => { window.open('https://wa.me/2348162714844?text=' + text, '_blank'); }, 800);
}

function submitSubscribe() {
  const name = document.getElementById('sub-name').value.trim();
  const email = document.getElementById('sub-email').value.trim();
  const phone = document.getElementById('sub-phone').value.trim();
  const cat = document.getElementById('sub-cat').value;
  if (!name || !email) { alert('Please enter your name and email.'); return; }
  document.getElementById('sub-success').style.display = 'block';
  const text = encodeURIComponent("Hello PreggiMum! I'd like to subscribe to updates.\n\nName: " + name + "\nEmail: " + email + "\nWhatsApp: " + phone + "\nStage: " + cat);
  setTimeout(() => { window.open('https://wa.me/2348162714844?text=' + text, '_blank'); }, 1000);
}
// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.info-card, .doctor-card, .tip-card, .section-header, .form-card, .footer-col').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});
