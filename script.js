/* ==============================================
   HEARTFELT GREETINGS — script.js
   Enhanced April 2025
   ============================================== */

/* --- Mobile Nav Toggle --- */
(function () {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.querySelectorAll('span').forEach((s, i) => {
      if (isOpen) {
        if (i === 0) s.style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
        if (i === 1) s.style.opacity   = '0';
        if (i === 2) s.style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
      } else {
        s.style.transform = '';
        s.style.opacity   = '';
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
})();


/* --- Active Nav Link --- */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* --- Scroll Reveal Animations --- */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


/* --- Back to Top Button --- */
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 320) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* --- Portfolio Filter with Item Counts --- */
(function () {
  const pills = document.querySelectorAll('.filter-pill');
  const items = document.querySelectorAll('.portfolio-item');
  if (!pills.length || !items.length) return;

  // Count items per category
  const counts = { all: items.length };
  items.forEach(item => {
    const cat = item.dataset.category;
    if (cat) counts[cat] = (counts[cat] || 0) + 1;
  });

  // Inject count badges into pills
  pills.forEach(pill => {
    const cat = pill.dataset.filter;
    const count = counts[cat];
    if (count !== undefined) {
      const badge = document.createElement('span');
      badge.className = 'pill-count';
      badge.textContent = count;
      pill.appendChild(badge);
    }
  });

  // Filter behaviour
  pills.forEach(pill => {
    pill.addEventListener('click', function () {
      pills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      const cat = this.dataset.filter;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        if (match) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();


/* --- Lightbox --- */
(function () {
  const overlay   = document.getElementById('lightboxOverlay');
  const lightImg  = document.getElementById('lightboxImg');
  const closeBtn  = document.getElementById('lightboxClose');
  const prevBtn   = document.getElementById('lightboxPrev');
  const nextBtn   = document.getElementById('lightboxNext');
  if (!overlay) return;

  let images  = [];
  let current = 0;

  function openLightbox(src, set, idx) {
    images  = set || [src];
    current = idx || 0;
    lightImg.src = images[current];
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateNavVisibility();
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lightImg.src = '';
  }

  function showPrev() {
    if (current > 0) { current--; lightImg.src = images[current]; updateNavVisibility(); }
  }

  function showNext() {
    if (current < images.length - 1) { current++; lightImg.src = images[current]; updateNavVisibility(); }
  }

  function updateNavVisibility() {
    if (prevBtn) prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
    if (prevBtn) prevBtn.style.opacity = current === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = current === images.length - 1 ? '0.3' : '1';
  }

  document.querySelectorAll('.lightbox-group').forEach(group => {
    const its  = group.querySelectorAll('[data-lightbox-src]');
    const srcs = Array.from(its).map(i => i.dataset.lightboxSrc);
    its.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(srcs[idx], srcs, idx));
    });
  });

  document.querySelectorAll('[data-lightbox-src]:not(.lightbox-group [data-lightbox-src])').forEach(item => {
    item.addEventListener('click', () => openLightbox(item.dataset.lightboxSrc, [item.dataset.lightboxSrc], 0));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
  if (nextBtn)  nextBtn.addEventListener('click', e => { e.stopPropagation(); showNext(); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  window.openLightbox = openLightbox;
})();


/* --- Contact Form (Web3Forms) --- */
(function () {
  const form      = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;
    const errEl = group.querySelector('.form-error');
    let valid = true;
    let msg   = '';

    if (field.required && !field.value.trim()) {
      valid = false; msg = 'This field is required.';
    } else if (field.type === 'email' && field.value.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(field.value.trim())) { valid = false; msg = 'Please enter a valid email address.'; }
    }

    group.classList.toggle('has-error', !valid);
    if (errEl) errEl.textContent = msg;
    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group') && field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let allValid = true;
    form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });
    if (!allValid) return;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    form.classList.add('form-submitting');

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        form.reset();
        if (successEl) { successEl.style.display = 'block'; }
        if (errorEl)   { errorEl.style.display = 'none'; }
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      if (errorEl)   { errorEl.style.display = 'block'; }
      if (successEl) { successEl.style.display = 'none'; }
    } finally {
      submitBtn.textContent = 'Send Enquiry →';
      submitBtn.disabled = false;
      form.classList.remove('form-submitting');
    }
  });
})();
