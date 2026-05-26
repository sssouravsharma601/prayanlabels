/* =============================================
   PRAYAN LABELS & CRAFT — main.js
   ============================================= */
(function () {
  'use strict';

  /* ---- Dynamic year in footer ---- */
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- NAV: transparent → solid on scroll ---- */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const update = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---- NAV: hamburger toggle ---- */
  const burger    = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on outside click
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    // close on nav link click
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- NAV: mark active link ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- SMOOTH ANCHOR scroll (offset for fixed nav) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 68;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navH - 12,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
      '.reveal, .product-card, .product-full-card, .usp-card, .stat-item, .testimonial-card, .process-step, .mosaic-item'
    ).forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      obs.observe(el);
    });
  }

  /* ---- HERO background image: trigger scale-in once loaded ---- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    const img  = new Image();
    const url  = getComputedStyle(heroBg).backgroundImage.match(/url\(["']?(.+?)["']?\)/);
    if (url) { img.onload = () => heroBg.classList.add('loaded'); img.src = url[1]; }
  }

  /* ---- CONTACT FORM: Formspree AJAX submit ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Sending…';
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
          btn.innerHTML = '✓ Sent!';
        } else {
          btn.innerHTML = orig;
          btn.disabled = false;
          alert('Something went wrong. Please WhatsApp or call us directly at +91 97803 33055.');
        }
      } catch {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
    });
  }

  /* ---- GALLERY LIGHTBOX ---- */
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');

  if (lb && lbImg) {
    let items  = [];
    let cursor = 0;

    const open = (idx) => {
      cursor = ((idx % items.length) + items.length) % items.length;
      lbImg.src = items[cursor].dataset.src || items[cursor].querySelector('img').src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };

    // collect all mosaic items
    document.querySelectorAll('.mosaic-item[data-src]').forEach((el, i) => {
      items.push(el);
      el.addEventListener('click', () => open(i));
    });

    if (lbClose) lbClose.addEventListener('click', close);
    if (lbPrev)  lbPrev.addEventListener('click',  () => open(cursor - 1));
    if (lbNext)  lbNext.addEventListener('click',  () => open(cursor + 1));

    lb.addEventListener('click', e => { if (e.target === lb) close(); });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   open(cursor - 1);
      if (e.key === 'ArrowRight')  open(cursor + 1);
    });
  }

  /* ---- FAQ accordion: swap +/- icon ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      const icon = item.querySelector('summary span:last-child');
      if (icon) icon.textContent = item.open ? '−' : '+';
    });
  });

})();
