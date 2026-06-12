/* =============================================
   InAmigos Foundation – JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar: Scroll Behaviour ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- Mobile Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll(
    '.project-card, .impact-card, .gi-card, .mission-card, ' +
    '.contact-item, .hashtag-pill, .social-link-btn, .about-text, ' +
    '.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-stats, ' +
    '.hero-visual, .section-label, .section-title, .section-subtitle, ' +
    '.section-subtitle-dark, .quote-band, .contact-cta-card, ' +
    '.footer-brand, .footer-col'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  /* ---- Animated Counter ---- */
  const counters = document.querySelectorAll('.stat-number, .impact-num');

  function animateCounter(el) {
    const target = el.textContent.trim();
    // Only animate numeric values
    const numMatch = target.match(/^([\d,]+)(\+?)$/);
    if (!numMatch) return;

    const end    = parseInt(numMatch[1].replace(/,/g, ''));
    const suffix = numMatch[2] || '';
    const duration = 1800;
    const step   = end / (duration / 16);
    let current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#00CC83';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- Parallax subtle on hero shapes ---- */
  window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 8;
      shape.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('%c🤝 InAmigos Foundation Awareness Page', 'color: #00CC83; font-size: 18px; font-weight: bold;');
  console.log('%cBuilt with ❤️ to spread awareness about social impact.', 'color: #666; font-size: 12px;');
});
