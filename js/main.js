/* =============================================
   PRAYAN LABELS — main.js
   ============================================= */
(function () {
  'use strict';

  /* ---- NAV: transparent → solid on scroll ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const update = () => {
      if (window.scrollY > 60) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      } else {
        nav.classList.remove('nav--solid');
        nav.classList.add('nav--transparent');
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---- NAV: hamburger ---- */
  const burger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- NAV: active link ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- HERO: bg loaded class for Ken Burns ---- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    const img = new Image();
    const url = getComputedStyle(heroBg).backgroundImage.match(/url\("?(.+?)"?\)/);
    if (url) {
      img.onload = () => heroBg.classList.add('loaded');
      img.src = url[1];
    }
  }

  /* ---- SCROLL: smooth anchor ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' });
      }
    });
  });

  /* ---- REVEAL on scroll ---- */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
      '.product-card, .product-full-card, .usp-card, .gallery-item-luxury, .stat, .testimonial-card, .step, .reveal'
    ).forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  /* ---- CONTACT form AJAX ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          const msg = document.getElementById('successMsg');
          if (msg) msg.classList.add('show');
          btn.textContent = 'Sent ✓';
        } else {
          btn.textContent = 'Send Inquiry';
          btn.disabled = false;
          alert('Something went wrong. Please WhatsApp or call us directly.');
        }
      } catch {
        btn.textContent = 'Send Inquiry';
        btn.disabled = false;
      }
    });
  }

})();
