(function () {
  const S = window.SITE;
  const B = S.business;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => '$' + (n < 10 && n % 1 ? n.toFixed(2) : Math.round(n).toLocaleString('en-US'));
  const roundTo = (n, step) => Math.round(n / step) * step;
  const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const serviceById = (id) => S.services.find((s) => s.id === id);

  // Service pages set data-service (the service shown) and data-base (path back to the site root).
  const PAGE_SERVICE = document.body.dataset.service || '';
  const BASE = document.body.dataset.base || '';
  const pageUrl = (id) => BASE + 'services/' + id + '.html';
  const asset = (path) => /^(https?:)?\/\//.test(path) ? path : BASE + path;

  /* ---------- Business details ---------- */
  const tel = 'tel:' + B.phone.replace(/[^\d+]/g, '');
  $$('[data-bind]').forEach((el) => { el.textContent = B[el.dataset.bind] ?? ''; });
  $$('[data-bind-href="tel"]').forEach((el) => { el.href = tel; });
  $$('[data-bind-href="mailto"]').forEach((el) => { el.href = 'mailto:' + B.email; });
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Header ---------- */
  const header = $('.site-header');
  const nav = $('#main-nav');
  const toggle = $('.menu-toggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Highlight the nav link for the section in view
  const navLinks = $$('.main-nav a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    const sec = href.startsWith('#') && $(href);
    if (sec) spy.observe(sec);
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  /* ---------- Services ---------- */
  const unitShort = (s) => s.unit === 'hours' ? 'hr' : s.unit === 'windows' ? 'window' : s.unit.split(' of ')[0];
  const startingPrice = (s) => money(Object.values(s.tiers)[0][0]) + '/' + unitShort(s);

  const categories = [['all', 'All services'], ['outdoor', 'Outdoor'], ['painting', 'Painting'], ['remodeling', 'Remodeling'], ['interior', 'Interior'], ['exterior', 'Exterior']]
    .filter(([id]) => id === 'all' || S.services.some((s) => s.category === id));
  const filterBox = $('#service-filters');
  if (filterBox) filterBox.innerHTML = categories.map(([id, label], i) =>
    `<button class="filter" role="tab" data-cat="${id}" aria-selected="${i === 0}">${label}</button>`).join('');

  function renderServices(cat) {
    $('#service-grid').innerHTML = S.services
      .filter((s) => s.id !== PAGE_SERVICE && (cat === 'all' || s.category === cat))
      .map((s, i) => `
        <article class="service-card" style="animation-delay:${i * 40}ms">
          <div class="service-icon">${ART.icon(s.icon)}</div>
          <h3><a class="card-link" href="${pageUrl(s.id)}">${esc(s.name)}</a></h3>
          <p>${esc(s.blurb)}</p>
          <ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
          <div class="from">
            <span>From <strong>${startingPrice(s)}</strong></span>
            <a class="link-btn" href="${pageUrl(s.id)}">Details →</a>
          </div>
        </article>`).join('');
  }
  filterBox?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    $$('.filter', filterBox).forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    renderServices(btn.dataset.cat);
  });
  renderServices('all');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-estimate]');
    if (!btn) return;
    selectEstimateService(btn.dataset.estimate);
    $('#estimate').scrollIntoView();
  });

  $('#footer-services').innerHTML = S.services.map((s) => `<li><a href="${pageUrl(s.id)}">${esc(s.name)}</a></li>`).join('');

  /* ---------- Quick quote (hero, home page only) ---------- */
  const qqGrid = $('#qq-services');
  if (qqGrid) {
  const qqServices = S.services.slice(0, 6);
  let qqChoice = qqServices[0].id;
  qqGrid.innerHTML = qqServices.map((s, i) =>
    `<button type="button" class="qq-option" role="radio" aria-checked="${i === 0}" data-id="${s.id}">${ART.icon(s.icon)}${esc(s.name.replace(' Remodeling', ''))}</button>`).join('');
  qqGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.qq-option');
    if (!btn) return;
    qqChoice = btn.dataset.id;
    $$('.qq-option', qqGrid).forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
  });
  $('#quick-quote').addEventListener('submit', (e) => {
    e.preventDefault();
    const zip = e.target.zip.value.trim();
    if (zip) $('#contact-form').zip.value = zip;
    selectEstimateService(qqChoice);
    $('#estimate').scrollIntoView();
  });
  }

  /* ---------- Process & FAQ & areas ---------- */
  const processList = $('#process-list');
  if (processList) processList.innerHTML = S.process.map(([t, d]) => `<li class="reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('');
  const pageDetails = (S.serviceDetails || {})[PAGE_SERVICE] || {};
  $('#faq-list').innerHTML = [...(pageDetails.faqs || []), ...S.faqs].map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const areaList = $('#area-list');
  if (areaList) areaList.innerHTML = B.serviceArea.map((a) => `<li>${esc(a)}</li>`).join('');

  /* ---------- Estimate calculator ---------- */
  const est = { service: null, qty: 0, tier: null, addons: new Set(), complexity: 1 };
  const elSvc = $('#est-service');
  const elRange = $('#est-qty-range');
  const elQty = $('#est-qty');
  elSvc.innerHTML = S.services.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('');

  function selectEstimateService(id) {
    const s = serviceById(id);
    if (!s) return;
    est.service = s;
    est.qty = s.defaultQty;
    est.tier = Object.keys(s.tiers)[Math.min(1, Object.keys(s.tiers).length - 1)];
    est.addons = new Set();
    elSvc.value = id;
    $('#est-qty-label').textContent = s.unit;
    [elRange, elQty].forEach((el) => { el.min = s.min; el.max = s.max; el.step = s.step; el.value = s.defaultQty; });

    $('#est-tiers').innerHTML = Object.entries(s.tiers).map(([name, [lo, hi]]) => `
      <label class="tier">
        <input type="radio" name="tier" value="${name}" ${name === est.tier ? 'checked' : ''}>
        <span><strong>${name}</strong><small>${esc(s.tierNotes[name] || '')}</small><small>${money(lo)}–${money(hi)} / ${unitShort(s)}</small></span>
      </label>`).join('');

    $('#est-addons').innerHTML = s.addons.map(([name, lo, hi], i) => `
      <label class="addon"><input type="checkbox" value="${i}"><span>${esc(name)}</span><small>+${money(lo)}–${money(hi)}</small></label>`).join('');

    const cs = $('#contact-service');
    if (cs) cs.value = id;
    calc();
  }

  function calc() {
    const s = est.service;
    const [tLo, tHi] = s.tiers[est.tier];
    let lo = tLo * est.qty;
    let hi = tHi * est.qty;
    const rows = [[`${est.tier} · ${est.qty.toLocaleString()} ${s.unit}`, `${money(lo)}–${money(hi)}`]];
    est.addons.forEach((i) => {
      const [name, aLo, aHi] = s.addons[i];
      lo += aLo; hi += aHi;
      rows.push([name, `${money(aLo)}–${money(aHi)}`]);
    });
    if (est.complexity !== 1) {
      const pct = Math.round((est.complexity - 1) * 100);
      rows.push(['Condition / access', (pct > 0 ? '+' : '') + pct + '%']);
    }
    lo = roundTo(lo * est.complexity, lo > 5000 ? 100 : 10);
    hi = roundTo(hi * est.complexity, hi > 5000 ? 100 : 10);

    $('#est-low').textContent = money(lo);
    $('#est-high').textContent = money(hi);
    $('#est-breakdown').innerHTML = rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('');

    // Visual bar: position the range against this service's own min/max possible cost
    const tiers = Object.values(s.tiers);
    const scaleMax = tiers[tiers.length - 1][1] * s.max + s.addons.reduce((t, a) => t + a[2], 0);
    const bar = $('#est-bar-fill');
    bar.style.marginLeft = Math.min(95, (lo / scaleMax) * 100) + '%';
    bar.style.width = Math.max(5, ((hi - lo) / scaleMax) * 100) + '%';

    // Illustrative monthly payment: 120 months at 8.99% APR on the midpoint
    const r = 0.0899 / 12, n = 120, p = (lo + hi) / 2;
    $('#est-monthly').textContent = money((p * r) / (1 - Math.pow(1 + r, -n)));

    est.summary = `${s.name} — ${est.tier}, ${est.qty.toLocaleString()} ${s.unit}` +
      (est.addons.size ? `, add-ons: ${[...est.addons].map((i) => s.addons[i][0]).join(', ')}` : '') +
      `. Online estimate: ${money(lo)}–${money(hi)}.`;
  }

  elSvc.addEventListener('change', () => selectEstimateService(elSvc.value));
  const setQty = (v) => {
    const s = est.service;
    const n = Math.min(s.max, Math.max(s.min, Number(v) || s.min));
    est.qty = n;
    elRange.value = n;
    calc();
    return n;
  };
  elRange.addEventListener('input', () => { elQty.value = setQty(elRange.value); });
  elQty.addEventListener('input', () => { if (elQty.value !== '') setQty(elQty.value); });
  elQty.addEventListener('change', () => { elQty.value = setQty(elQty.value); });
  $('#est-tiers').addEventListener('change', (e) => { est.tier = e.target.value; calc(); });
  $('#est-addons').addEventListener('change', (e) => {
    const i = Number(e.target.value);
    e.target.checked ? est.addons.add(i) : est.addons.delete(i);
    calc();
  });
  $('#est-complexity').addEventListener('change', (e) => { est.complexity = Number(e.target.value); calc(); });

  $('#est-send').addEventListener('click', () => {
    const f = $('#contact-form');
    f.service.value = est.service.id;
    if (!f.message.value.trim() || f.message.dataset.fromEstimate === 'true') {
      f.message.value = est.summary + '\n\n';
      f.message.dataset.fromEstimate = 'true';
    }
    setTimeout(() => f.name.focus({ preventScroll: true }), 600);
    toast('Estimate details added to your quote request');
  });

  /* ---------- Before / after gallery ---------- */
  // Real photos (p.before / p.after) take priority over the built-in illustrations.
  const baImage = (p, after) => {
    const src = after ? p.after : p.before;
    return src
      ? `<img src="${esc(asset(src))}" alt="${after ? 'After' : 'Before'}: ${esc(p.title)}" loading="lazy" draggable="false">`
      : ART.scene(p.scene, after);
  };
  const projects = S.projects.filter((p) => !PAGE_SERVICE || p.service === PAGE_SERVICE);
  if (!projects.length && $('#projects')) {
    // No projects for this service yet: drop the section and send its links to the home page gallery
    $('#projects').remove();
    $$('a[href="#projects"]').forEach((a) => { a.href = BASE + 'index.html#projects'; });
  }
  $('#project-grid') && ($('#project-grid').innerHTML = projects.map((p) => {
    const svc = serviceById(p.service);
    return `
      <article class="project reveal">
        <div class="ba">
          <div class="before">${baImage(p, false)}</div>
          <div class="after">${baImage(p, true)}</div>
          <span class="ba-label b">Before</span><span class="ba-label a">After</span>
          <div class="ba-handle"></div>
          <input type="range" min="0" max="100" value="50" aria-label="Compare before and after: ${esc(p.title)}">
        </div>
        <div class="project-body">
          <span class="tag">${esc(svc ? svc.name : '')} · ${esc(p.town)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.detail)}</p>
        </div>
      </article>`;
  }).join(''));
  $$('.ba').forEach((ba) => {
    const input = $('input', ba);
    input.addEventListener('input', () => ba.style.setProperty('--pos', input.value + '%'));
  });

  /* ---------- Reviews ---------- */
  const REVIEW_KEY = 'his-reviews';
  const loadLocal = () => { try { return JSON.parse(localStorage.getItem(REVIEW_KEY)) || []; } catch { return []; } };
  const saveLocal = (list) => { try { localStorage.setItem(REVIEW_KEY, JSON.stringify(list)); } catch { /* storage unavailable */ } };
  let reviews = [...loadLocal(), ...S.reviews];
  const reviewState = { filter: PAGE_SERVICE || 'all', stars: 0, sort: 'new', shown: 6 };
  const avatarColors = ['#315c49', '#dd7656', '#b08d57', '#4f7a8a', '#7a5c8a', '#5a7d4f'];
  const starStr = (n) => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);

  $('#sample-notice').hidden = !S.showSampleReviewNotice;
  const serviceOpts = S.services.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  $('#review-filter').insertAdjacentHTML('beforeend', serviceOpts);
  $('#review-filter').value = reviewState.filter;
  $('#review-service').innerHTML = serviceOpts;
  $('#contact-service').innerHTML = '<option value="">Select a service…</option>' + serviceOpts + '<option value="other">Something else</option>';

  function renderSummary() {
    const total = reviews.length;
    const avg = total ? reviews.reduce((t, r) => t + r.rating, 0) / total : 0;
    const avgText = avg.toFixed(1);
    $('#avg-rating').textContent = avgText;
    $('#avg-stars').textContent = starStr(Math.round(avg));
    $('#review-count').textContent = `Based on ${total} reviews`;
    const statRating = $('#stat-rating');
    const heroRating = $('#hero-rating');
    if (statRating) statRating.textContent = avgText + '★';
    if (heroRating) heroRating.textContent = `Rated ${avgText}/5 by ${total}+ homeowners`;
    $('#rating-bars').innerHTML = [5, 4, 3, 2, 1].map((n) => {
      const c = reviews.filter((r) => r.rating === n).length;
      const pct = total ? (c / total) * 100 : 0;
      return `<button class="rating-bar" data-stars="${n}" aria-pressed="${reviewState.stars === n}" title="Show ${n}-star reviews">
        <span>${n}★</span><span class="track"><span style="width:${pct}%"></span></span><span>${c}</span></button>`;
    }).join('');
  }

  function renderReviews() {
    let list = reviews.filter((r) =>
      (reviewState.filter === 'all' || r.service === reviewState.filter) &&
      (!reviewState.stars || r.rating === reviewState.stars));
    list.sort((a, b) =>
      reviewState.sort === 'high' ? b.rating - a.rating || b.date.localeCompare(a.date)
        : reviewState.sort === 'low' ? a.rating - b.rating || b.date.localeCompare(a.date)
          : b.date.localeCompare(a.date));
    const shown = list.slice(0, reviewState.shown);
    $('#review-list').innerHTML = shown.length ? shown.map((r, i) => {
      const svc = serviceById(r.service);
      const initials = r.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
      const date = new Date(r.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return `
        <article class="review" style="animation-delay:${i * 40}ms">
          <div class="review-head">
            <span class="avatar" style="background:${avatarColors[r.name.length % avatarColors.length]}">${esc(initials)}</span>
            <div><strong>${esc(r.name)}</strong><small>${esc(r.town || '')}</small></div>
            ${r.local ? '<span class="verified">Your review</span>' : ''}
          </div>
          <div class="stars" aria-label="${r.rating} out of 5 stars">${starStr(r.rating)}</div>
          <p class="text">${esc(r.text)}</p>
          <div class="meta"><span>${esc(svc ? svc.name : '')}</span><span>${date}</span></div>
        </article>`;
    }).join('') : '<p class="empty">No reviews match these filters yet.</p>';
    $('#more-reviews').hidden = list.length <= reviewState.shown;
  }

  $('#review-filter').addEventListener('change', (e) => { reviewState.filter = e.target.value; reviewState.shown = 6; renderReviews(); });
  $('#review-sort').addEventListener('change', (e) => { reviewState.sort = e.target.value; renderReviews(); });
  $('#more-reviews').addEventListener('click', () => { reviewState.shown += 6; renderReviews(); });
  $('#rating-bars').addEventListener('click', (e) => {
    const bar = e.target.closest('.rating-bar');
    if (!bar) return;
    const n = Number(bar.dataset.stars);
    reviewState.stars = reviewState.stars === n ? 0 : n;
    reviewState.shown = 6;
    renderSummary();
    renderReviews();
  });

  // Review dialog
  const dialog = $('#review-dialog');
  const reviewForm = $('#review-form');
  const starInput = $('#star-input');
  let newRating = 0;
  starInput.innerHTML = [1, 2, 3, 4, 5].map((n) => `<button type="button" data-n="${n}" role="radio" aria-checked="false" aria-label="${n} star${n > 1 ? 's' : ''}">★</button>`).join('');
  const paintStars = (n) => $$('button', starInput).forEach((b) => b.classList.toggle('on', Number(b.dataset.n) <= n));
  starInput.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    newRating = Number(b.dataset.n);
    $$('button', starInput).forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    paintStars(newRating);
  });
  starInput.addEventListener('mouseover', (e) => { const b = e.target.closest('button'); if (b) paintStars(Number(b.dataset.n)); });
  starInput.addEventListener('mouseleave', () => paintStars(newRating));

  $('#open-review').addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  });
  $('#close-review').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!newRating) { toast('Please choose a star rating'); return; }
    if (!reviewForm.reportValidity()) return;
    const r = {
      name: reviewForm.name.value.trim(),
      town: reviewForm.town.value.trim(),
      service: reviewForm.service.value,
      rating: newRating,
      text: reviewForm.text.value.trim(),
      date: new Date().toISOString().slice(0, 10),
      local: true
    };
    const local = loadLocal();
    local.unshift(r);
    saveLocal(local);
    reviews.unshift(r);
    reviewForm.reset();
    newRating = 0;
    paintStars(0);
    dialog.close();
    Object.assign(reviewState, { filter: 'all', stars: 0, sort: 'new', shown: 6 });
    $('#review-filter').value = 'all';
    $('#review-sort').value = 'new';
    renderSummary();
    renderReviews();
    toast('Thanks for your review!');
  });

  renderSummary();
  renderReviews();

  /* ---------- Contact form ---------- */
  const form = $('#contact-form');
  const status = $('#form-status');
  form.message.addEventListener('input', () => { form.message.dataset.fromEstimate = 'false'; });

  function validate() {
    let ok = true;
    $$('[required]', form).forEach((el) => {
      const valid = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
      el.closest('.field').classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }
  form.addEventListener('input', (e) => {
    const f = e.target.closest('.field');
    if (f && f.classList.contains('invalid')) validate();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    if (form._gotcha.value) return; // bot
    if (!validate()) {
      status.textContent = 'Please fill in the highlighted fields.';
      status.classList.add('err');
      $('.invalid input, .invalid select, .invalid textarea', form)?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    delete data._gotcha;
    const svc = serviceById(data.service);
    data.service = svc ? svc.name : data.service;

    if (B.formspreeId) {
      const btn = $('button[type=submit]', form);
      btn.disabled = true;
      status.textContent = 'Sending…';
      try {
        const res = await fetch('https://formspree.io/f/' + encodeURIComponent(B.formspreeId), {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        status.textContent = "Thanks! We'll be in touch within one business day.";
        status.classList.add('ok');
      } catch (err) {
        status.textContent = `Something went wrong. Please call us at ${B.phone}.`;
        status.classList.add('err');
      } finally {
        btn.disabled = false;
      }
      return;
    }

    // No form backend configured: open the visitor's email app with everything filled in
    const body = [
      `Name: ${data.name}`, `Phone: ${data.phone}`, `Email: ${data.email}`, `ZIP: ${data.zip || '-'}`,
      `Service: ${data.service}`, `Budget: ${data.budget || 'Not sure'}`, `Timeline: ${data.timeline}`, '', data.message
    ].join('\n');
    window.location.href = `mailto:${B.email}?subject=${encodeURIComponent('Quote request: ' + data.service)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app to send your request…';
    status.classList.add('ok');
  });

  /* ---------- Animated counters & reveal ---------- */
  const countUp = (el) => {
    const target = Number(B[el.dataset.count]) || 0;
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      if (entry.target.dataset.count) countUp(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal, .count').forEach((el) => io.observe(el));

  selectEstimateService(PAGE_SERVICE || S.services[0].id);
})();
