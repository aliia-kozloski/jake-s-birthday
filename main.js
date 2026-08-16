/* ==========================================================================
   JAKE'S BIRTHDAY WEEK — LOGIC
   (You shouldn't need to edit this file — all words live in content.js)
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  // Parse "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM[:SS]" as LOCAL time
  // (new Date("YYYY-MM-DD") would parse as UTC and unlock doors at the wrong hour)
  function parseLocal(str) {
    const m = String(str).trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
    if (!m) return null;
    return new Date(+m[1], m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  }

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const fmtDay = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });

  /* ---------- URL params: preview & simulated date ---------- */
  const params = new URLSearchParams(location.search);
  const simStart = params.get('date') ? parseLocal(params.get('date')) : null;
  const realStart = Date.now();
  const now = () => (simStart ? new Date(simStart.getTime() + (Date.now() - realStart)) : new Date());
  const previewAll = ['1', 'all', 'true'].includes((params.get('preview') || '').toLowerCase());
  const noIntro = params.has('nointro');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  /* ---------- persistence ---------- */
  const store = {
    get opened() {
      try { return JSON.parse(localStorage.getItem('bw_opened') || '[]'); } catch (e) { return []; }
    },
    markOpened(date) {
      try {
        const o = new Set(this.opened);
        o.add(date);
        localStorage.setItem('bw_opened', JSON.stringify([...o]));
      } catch (e) { /* private mode — fine */ }
    }
  };

  /* ---------- icons ---------- */
  const SVG_ATTRS = 'viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    suns: `<svg ${SVG_ATTRS}><circle cx="17" cy="20" r="7"/><circle cx="33" cy="15" r="4.5"/><path d="M4 34h40M10 40h28"/></svg>`,
    droid: `<svg ${SVG_ATTRS}><path d="M12 30v-7a12 12 0 0 1 24 0v7"/><circle cx="24" cy="21" r="3.5"/><path d="M8 30h32M14 36h20M31 13l3-3"/></svg>`,
    saber: `<svg ${SVG_ATTRS}><rect x="21" y="30" width="6" height="13" rx="1.5"/><path d="M24 30V5"/><path d="M24 30V5" stroke-width="6" opacity=".25"/><path d="M19 33h-4M33 33h-4"/></svg>`,
    holo: `<svg ${SVG_ATTRS}><path d="M17 42h14l-3.5-7h-7z"/><circle cx="24" cy="17" r="8"/><path d="M24 35v-6M12 17h-4M40 17h-4M24 1v4" opacity=".6"/></svg>`,
    xwing: `<svg ${SVG_ATTRS}><path d="M24 6l2 15 13-8M24 6l-2 15-13-8M24 42l2-15 13 8M24 42l-2-15-13 8"/><rect x="21" y="20" width="6" height="8" rx="2"/></svg>`,
    ticket: `<svg ${SVG_ATTRS}><path d="M8 16a4 4 0 0 0 0 8v8h32v-8a4 4 0 0 1 0-8v-8H8z" transform="translate(0 4)"/><path d="M29 12v24" stroke-dasharray="3 4"/></svg>`,
    fleet: `<svg ${SVG_ATTRS}><path d="M24 5l6 13H18zM11 26l5 12H6zM37 26l5 12H32z"/><path d="M24 25v6M11 21v2M37 21v2" opacity=".6"/></svg>`,
    cake: `<svg ${SVG_ATTRS}><path d="M10 42h28V30a4 4 0 0 0-4-4H14a4 4 0 0 0-4 4zM10 34h28"/><path d="M17 26v-7M24 26v-9M31 26v-7"/><circle cx="17" cy="16" r="1.6"/><circle cx="24" cy="14" r="1.6"/><circle cx="31" cy="16" r="1.6"/></svg>`,
    star: `<svg ${SVG_ATTRS}><path d="M24 6l4.6 11.2L40 18.6l-8.6 7.8 2.6 11.8L24 32l-10 6.2 2.6-11.8L8 18.6l11.4-1.4z"/></svg>`
  };

  const CAKE_BIG = `
    <svg class="finale__cake" viewBox="0 0 130 110" fill="none" aria-hidden="true">
      <rect x="15" y="62" width="100" height="40" rx="8" fill="#1a2236" stroke="#39456b" stroke-width="1.5"/>
      <path d="M15 78c10 8 20-8 30 0s20-8 30 0 20-8 30 0 8 0 10 0" stroke="#39456b" stroke-width="1.5"/>
      <rect x="38" y="34" width="4" height="28" rx="2" fill="#8b93a8"/>
      <rect x="63" y="26" width="4" height="36" rx="2" fill="#8b93a8"/>
      <rect x="88" y="34" width="4" height="28" rx="2" fill="#8b93a8"/>
      <ellipse class="flame" cx="40" cy="26" rx="4" ry="8" fill="#6cd7ff" opacity=".9"/>
      <ellipse class="flame flame--2" cx="65" cy="18" rx="4" ry="8" fill="#3bff6f" opacity=".9"/>
      <ellipse class="flame flame--3" cx="90" cy="26" rx="4" ry="8" fill="#ff5c5c" opacity=".9"/>
    </svg>`;

  /* ---------- fleet ship artwork ----------
     Each ship: stylized line art (120×90) + where its cockpit window sits,
     so a person's photo can be dropped into the right spot automatically. */
  const SHIP_WRAP = (inner) =>
    `<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  const SHIPS = {
    xwing: {
      cockpit: { x: 60, y: 42, r: 12 },
      art: SHIP_WRAP(`
        <path d="M60 6l5 24v28l-5 26-5-26V30z"/>
        <path d="M55 34L12 16M65 34l43-18M55 52L12 72M65 52l43 20" stroke-width="5"/>
        <path d="M12 8v14M108 8v14M12 66v14M108 64v16"/>`)
    },
    awing: {
      cockpit: { x: 60, y: 44, r: 12 },
      art: SHIP_WRAP(`
        <path d="M60 8l32 70H74L60 64 46 78H28z"/>
        <path d="M28 64v18M92 64v18"/>`)
    },
    ywing: {
      cockpit: { x: 60, y: 25, r: 13 },
      art: SHIP_WRAP(`
        <circle cx="60" cy="25" r="14"/>
        <path d="M60 39v10M26 49h68"/>
        <rect x="19" y="43" width="14" height="40" rx="7"/>
        <rect x="87" y="43" width="14" height="40" rx="7"/>`)
    },
    falcon: {
      cockpit: { x: 100, y: 68, r: 9 },
      art: SHIP_WRAP(`
        <circle cx="56" cy="52" r="32"/>
        <path d="M46 22V5h7v16M66 21V5h7v17"/>
        <path d="M84 60l8 5"/>
        <circle cx="100" cy="68" r="9.5"/>
        <circle cx="47" cy="43" r="5" opacity=".5"/>
        <path d="M36 64h18M40 72h14" opacity=".35"/>`)
    },
    shuttle: {
      cockpit: { x: 60, y: 57, r: 12 },
      art: SHIP_WRAP(`
        <path d="M60 4l5 36H55z"/>
        <path d="M53 44L14 84h22M67 44l39 40H84"/>
        <path d="M50 44h20v24a10 10 0 0 1-20 0z"/>`)
    }
  };

  /* ==========================================================================
     STARFIELD (with hyperspace warp)
     ========================================================================== */
  const starfield = (function () {
    const canvas = $('#starfield');
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, warpUntil = 0, speed = 0.00016, last = 0;
    const COUNT = reduced ? 120 : 230;
    const stars = [];

    function makeStar(z) {
      return {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: z != null ? z : Math.random() * 0.85 + 0.15,
        tw: Math.random() * Math.PI * 2,
        px: null, py: null
      };
    }

    function resize() {
      W = canvas.width = Math.floor(innerWidth * dpr);
      H = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      if (reduced) drawStatic();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#cfd8ec';
      for (let i = 0; i < COUNT; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        const r = Math.random() * 1.2 + 0.3;
        ctx.globalAlpha = Math.random() * 0.7 + 0.2;
        ctx.beginPath(); ctx.arc(x, y, r * dpr, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame(ts) {
      const dt = Math.min(ts - last || 16, 50);
      last = ts;
      const target = Date.now() < warpUntil ? 0.004 : 0.00016;
      speed += (target - speed) * 0.07;

      ctx.clearRect(0, 0, W, H);
      const f = Math.min(W, H) * 0.5;

      for (const s of stars) {
        s.z -= speed * dt;
        if (s.z <= 0.03) { Object.assign(s, makeStar(1)); }

        const x = W / 2 + (s.x / s.z) * f * 0.9;
        const y = H / 2 + (s.y / s.z) * f * 0.9;

        if (x < -40 || x > W + 40 || y < -40 || y > H + 40) {
          Object.assign(s, makeStar(1));
          continue;
        }

        const tw = 0.55 + 0.45 * Math.sin(ts * 0.0012 + s.tw * 7);
        const size = Math.max(0.4, (1.1 - s.z)) * 1.7 * dpr;

        if (s.px !== null && speed > 0.0007) {
          ctx.strokeStyle = `rgba(190, 216, 255, ${0.75 * tw})`;
          ctx.lineWidth = size * 0.9;
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(223, 233, 252, ${0.85 * tw})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 7);
          ctx.fill();
        }
        s.px = x; s.py = y;
      }
      requestAnimationFrame(frame);
    }

    for (let i = 0; i < COUNT; i++) stars.push(makeStar());
    addEventListener('resize', resize);
    resize();
    if (!reduced) requestAnimationFrame(frame);

    return {
      warp() { if (!reduced) warpUntil = Date.now() + 750; }
    };
  })();

  /* ==========================================================================
     FIREWORKS
     ========================================================================== */
  const fx = (function () {
    const canvas = $('#fx');
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, raf = null, until = 0, lastLaunch = 0, last = 0;
    const rockets = [], parts = [];
    const COLORS = ['#ffe81f', '#6cd7ff', '#3bff6f', '#b98cff', '#ff5c5c', '#ff9d3b', '#4f8cff'];
    const rnd = (a, b) => a + Math.random() * (b - a);

    function resize() {
      W = canvas.width = Math.floor(innerWidth * dpr);
      H = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
    }
    addEventListener('resize', resize);
    resize();

    function explode(x, y, color) {
      const n = Math.floor(rnd(55, 95));
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = rnd(0.4, 3.4) * dpr;
        parts.push({
          x, y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: rnd(700, 1400),
          age: 0,
          color,
          size: rnd(1.4, 2.8) * dpr
        });
      }
    }

    function frame(ts) {
      const dt = Math.min(ts - last || 16, 50);
      last = ts;

      // fade previous frame (works on transparent canvas)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.16)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const t = Date.now();
      if (t < until && t - lastLaunch > rnd(240, 460)) {
        lastLaunch = t;
        rockets.push({
          x: rnd(W * 0.15, W * 0.85),
          y: H,
          vy: -rnd(0.55, 0.75) * dpr,
          targetY: rnd(H * 0.16, H * 0.45),
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * dt;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2 * dpr, 0, 7);
        ctx.fill();
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age += dt;
        if (p.age >= p.life) { parts.splice(i, 1); continue; }
        p.vy += 0.0016 * dt * dpr;
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        const alpha = 1 - p.age / p.life;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (t < until || parts.length || rockets.length) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, W, H);
        raf = null;
      }
    }

    return {
      burst(ms) {
        if (reduced) return;
        until = Date.now() + ms;
        if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
      },
      stop() { until = 0; }
    };
  })();

  /* ==========================================================================
     COUNTDOWNS (shared ticker)
     ========================================================================== */
  let countdowns = [];

  function registerCountdown(el, target, doneText, persistent) {
    countdowns.push({ el, target, doneText, persistent: !!persistent, done: false });
    tick();
  }

  function cdMarkup(ms) {
    const s = Math.floor(ms / 1000);
    const cells = [
      [Math.floor(s / 86400), 'days'],
      [Math.floor((s % 86400) / 3600), 'hours'],
      [Math.floor((s % 3600) / 60), 'min'],
      [s % 60, 'sec']
    ];
    return cells.map(([n, lab]) =>
      `<div class="cd__cell"><span class="cd__num">${String(n).padStart(2, '0')}</span><span class="cd__lab">${lab}</span></div>`
    ).join('');
  }

  /* ==========================================================================
     DOORS
     ========================================================================== */
  function dayState(day) {
    const unlockAt = parseLocal(day.date);
    return {
      unlockAt,
      unlocked: previewAll || now() >= unlockAt,
      isToday: sameDay(now(), unlockAt),
      viewed: store.opened.includes(day.date)
    };
  }

  function renderDoors() {
    const grid = $('#doors');
    grid.innerHTML = DAYS.map((day, i) => {
      const st = dayState(day);
      const cls = [
        'door',
        st.unlocked ? 'is-unlocked' : 'is-locked',
        st.isToday ? 'is-today' : '',
        st.viewed ? 'is-viewed' : '',
        i === DAYS.length - 1 ? 'door--finale' : ''
      ].filter(Boolean).join(' ');
      const dateLabel = fmtDay.format(st.unlockAt).toUpperCase();
      const aria = st.unlocked
        ? `Open door ${i + 1}: ${day.title}, ${dateLabel}`
        : `Door ${i + 1} is locked until ${dateLabel}`;

      return `
      <button class="${cls}" data-index="${i}" style="--accent:${esc(day.saber || '#ffe81f')}" aria-label="${esc(aria)}">
        <span class="door__inner" aria-hidden="true">
          ${ICONS[day.icon] || ICONS.star}
          <span class="door__enter">${st.unlocked ? 'Open' : 'Locked'}</span>
        </span>
        <span class="door__half door__half--l" aria-hidden="true"><span class="door__num">${esc(day.episode)}</span></span>
        <span class="door__half door__half--r" aria-hidden="true"><span class="door__num">${esc(day.episode)}</span></span>
        <span class="door__seam" aria-hidden="true"></span>
        <span class="door__hud">
          <span class="door__hud-top">
            <span class="chip chip--ep">Episode ${esc(day.episode)}</span>
            ${st.isToday ? '<span class="chip chip--today">Today</span>' : ''}
            <span class="door__led"></span>
          </span>
          <span class="door__hud-bottom">
            <span class="door__date">${esc(dateLabel)}</span>
            <span class="door__title">${st.unlocked ? esc(day.title) : '[ Classified ]'}</span>
            ${st.viewed && st.unlocked ? '<span class="chip chip--viewed">✓ Viewed</span>' : ''}
            ${!st.unlocked && day.teaser ? `<span class="door__teaser">${esc(day.teaser)}</span>` : ''}
          </span>
        </span>
      </button>`;
    }).join('');
  }

  /* ==========================================================================
     BLOCK RENDERERS
     ========================================================================== */
  const RENDER = {
    opening: (b) => `
      <div class="blk blk--opening">${(b.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}</div>`,

    text: (b) => `
      <div class="blk blk--text">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${(b.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}
      </div>`,

    gallery: (b) => `
      <div class="blk blk--gallery">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${b.note ? `<p class="blk__note">${esc(b.note)}</p>` : ''}
        <div class="gallery">${(b.photos || []).map(photoFig).join('')}</div>
      </div>`,

    hologram: (b) => `
      <div class="blk">
        <div class="holo">
          <div class="holo__head"><span class="holo__dot"></span> Incoming transmission ${b.from ? `— from ${esc(b.from)}` : ''}</div>
          ${b.title ? `<div class="holo__title">${esc(b.title)}</div>` : ''}
          ${(b.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}
          ${b.signoff ? `<div class="holo__signoff">${esc(b.signoff)}</div>` : ''}
        </div>
      </div>`,

    quiz: (b) => `
      <div class="blk blk--quiz" data-quiz>
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${b.intro ? `<p class="quiz__intro">${esc(b.intro)}</p>` : ''}
        <div class="quiz__stage"></div>
      </div>`,

    mission: (b) => `
      <div class="blk">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        <ol class="mission">
          ${(b.steps || []).map((s) => `
            <li>
              <span class="mission__time">${esc(s.time || '·')}</span>
              <div><strong>${esc(s.label)}</strong><p>${esc(s.detail || '')}</p></div>
            </li>`).join('')}
        </ol>
      </div>`,

    fleet: (b) => `
      <div class="blk blk--fleet" data-fleet>
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${b.note ? `<p class="blk__note">${esc(b.note)}</p>` : ''}
        <div class="fleet__grid">${(b.ships || []).map(shipCard).join('')}</div>
        <div class="fleet__person" hidden></div>
      </div>`,

    coupons: (b) => `
      <div class="blk">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${b.note ? `<p class="blk__note">${esc(b.note)}</p>` : ''}
        <div class="coupons">
          ${(b.coupons || []).map((c) => `
            <div class="coupon"><strong>${esc(c.title)}</strong><span>${esc(c.detail || '')}</span></div>`).join('')}
        </div>
      </div>`,

    countdown: (b) => `
      <div class="blk">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        <div class="cd" data-cd data-target="${esc(b.target)}" data-done="${esc(b.doneText || "IT'S TIME!")}"></div>
      </div>`,

    links: (b) => `
      <div class="blk">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        <div class="links">
          ${(b.items || []).map((l) => `
            <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}${l.note ? `<small>${esc(l.note)}</small>` : ''}</a>`).join('')}
        </div>
      </div>`,

    video: (b) => `
      <div class="blk">
        ${b.title ? `<h3 class="blk__title">${esc(b.title)}</h3>` : ''}
        ${b.note ? `<p class="blk__note">${esc(b.note)}</p>` : ''}
        ${videoEmbed(b.src, b.poster)}
      </div>`,

    finale: (b) => `
      <div class="blk blk--finale">
        ${CAKE_BIG}
        <h3 class="finale__hbd">${(b.headline || ['HAPPY BIRTHDAY!']).map(esc).join('<br>')}</h3>
        ${b.subline ? `<p class="finale__subline">${esc(b.subline)}</p>` : ''}
        <div class="finale__message">${(b.message || []).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        ${(b.wishes && b.wishes.length) ? `<ul class="finale__wishes">${b.wishes.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` : ''}
      </div>`
  };

  function shipCard(s, si) {
    const color = esc(s.color || '#6cd7ff');
    let figure;
    if (s.image) {
      figure = `<img class="ship__custom" src="${esc(s.image)}" alt="${esc(s.name)}'s ship">`;
    } else {
      const spec = SHIPS[s.ship] || SHIPS.xwing;
      figure = s.photo
        ? `<span class="ship-figure ship-figure--crewed">
             <span class="ship__portrait"><img src="${esc(s.photo)}" alt="${esc(s.name)}"></span>
             ${spec.art}
           </span>`
        : `<span class="ship-figure">${spec.art}</span>`;
    }
    return `
      <button type="button" class="ship" data-ship="${si}"
              style="--accent:${color};animation-delay:${si * 90}ms"
              aria-label="Open transmission from ${esc(s.name)}">
        <span class="ship__stage">${figure}</span>
        <span class="ship__plate">
          <strong>${esc(s.name)}</strong>
          ${s.callsign ? `<em>${esc(s.callsign)}</em>` : ''}
        </span>
      </button>`;
  }

  // Renders a video message: local file → styled <video>; YouTube/Vimeo URL → embed
  function videoEmbed(src, poster) {
    const yt = String(src).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) {
      return `<div class="holo-video holo-video--frame">
        <iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="Video message" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
    }
    const vm = String(src).match(/vimeo\.com\/(\d+)/);
    if (vm) {
      return `<div class="holo-video holo-video--frame">
        <iframe src="https://player.vimeo.com/video/${vm[1]}" title="Video message" loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>`;
    }
    return `<div class="holo-video">
      <video controls playsinline preload="metadata"${poster ? ` poster="${esc(poster)}"` : ''}>
        <source src="${esc(src)}">
        Your browser can't play this video.
      </video>
    </div>`;
  }

  function personView(s) {
    return `
      <button type="button" class="btn btn--ghost fleet__back">◂ Back to the fleet</button>
      <div class="holo" style="--accent:${esc(s.color || '#6cd7ff')}">
        <div class="holo__head"><span class="holo__dot"></span>
          Incoming transmission — ${esc(s.name)}${s.callsign ? ` · ${esc(s.callsign)}` : ''}</div>
        ${s.video ? videoEmbed(s.video, s.videoPoster) : ''}
        ${(s.message || []).map((p) => `<p>${esc(p)}</p>`).join('')}
        ${(s.photos && s.photos.length) ? `<div class="gallery gallery--holo">${s.photos.map(photoFig).join('')}</div>` : ''}
        ${s.signoff ? `<div class="holo__signoff">${esc(s.signoff)}</div>` : ''}
      </div>`;
  }

  function initFleet(root, block) {
    const grid = $('.fleet__grid', root);
    const person = $('.fleet__person', root);
    const note = $('.blk__note', root);

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.ship');
      if (!btn) return;
      const s = (block.ships || [])[Number(btn.dataset.ship)];
      if (!s) return;
      person.innerHTML = personView(s);
      attachImgFallbacks(person);
      person.hidden = false;
      grid.hidden = true;
      if (note) note.hidden = true;
      $('.fleet__back', person).addEventListener('click', () => {
        person.hidden = true;
        person.innerHTML = '';
        grid.hidden = false;
        if (note) note.hidden = false;
      });
      const body = root.closest('.modal__body');
      if (body) body.scrollTop = 0;
    });
  }

  function photoFig(p) {
    if (p && p.src) {
      return `
      <figure class="ph${p.tall ? ' ph--tall' : ''}">
        <img src="${esc(p.src)}" alt="${esc(p.caption || 'photo')}" loading="lazy">
        <figcaption>${esc(p.caption || '')}</figcaption>
      </figure>`;
    }
    return `
      <figure class="ph ph--empty">
        <div class="ph__slot">${ICONS.star}<span>Your photo here</span><small>assets/photos/README.md</small></div>
        <figcaption>${esc((p && p.caption) || '')}</figcaption>
      </figure>`;
  }

  /* ---------- quiz wiring ---------- */
  function initQuiz(root, block) {
    const stage = $('.quiz__stage', root);
    const total = block.questions.length;
    let i = 0, score = 0;

    function renderQ() {
      const Q = block.questions[i];
      stage.dataset.answered = '0';
      stage.innerHTML = `
        <div class="quiz__meta">Question ${i + 1} / ${total} · Score ${score}</div>
        <h4 class="quiz__q">${esc(Q.q)}</h4>
        <div class="quiz__choices">
          ${Q.choices.map((c, ci) => `<button type="button" class="quiz__choice" data-ci="${ci}">${esc(c)}</button>`).join('')}
        </div>
        <div class="quiz__after" hidden>
          <p class="quiz__fact"></p>
          <button type="button" class="btn quiz__next">${i + 1 < total ? 'Next question ▸' : 'See your rank ▸'}</button>
        </div>`;

      $$('.quiz__choice', stage).forEach((btn) => btn.addEventListener('click', pick));
      $('.quiz__next', stage).addEventListener('click', () => {
        i += 1;
        if (i < total) renderQ(); else renderEnd();
      });
    }

    function pick(e) {
      if (stage.dataset.answered === '1') return;
      stage.dataset.answered = '1';
      const Q = block.questions[i];
      const ci = Number(e.currentTarget.dataset.ci);
      $$('.quiz__choice', stage).forEach((btn, bi) => {
        btn.disabled = true;
        if (bi === Q.answer) btn.classList.add('is-correct');
      });
      if (ci === Q.answer) score += 1;
      else e.currentTarget.classList.add('is-wrong');
      const after = $('.quiz__after', stage);
      $('.quiz__fact', stage).textContent = Q.fact || '';
      after.hidden = false;
      $('.quiz__meta', stage).textContent = `Question ${i + 1} / ${total} · Score ${score}`;
    }

    function renderEnd() {
      const ranks = (block.results || []).slice().sort((a, b) => a.min - b.min);
      let rank = ranks[0] || { title: 'Jedi', note: '' };
      for (const r of ranks) if (score >= r.min) rank = r;
      stage.innerHTML = `
        <div class="quiz__result">
          <p class="quiz__score">Trial complete · ${score} / ${total} correct</p>
          <p class="quiz__rank">${esc(rank.title)}</p>
          <p class="quiz__ranknote">${esc(rank.note || '')}</p>
          <button type="button" class="btn quiz__retry">↺ Face the trials again</button>
        </div>`;
      $('.quiz__retry', stage).addEventListener('click', () => {
        i = 0; score = 0; renderQ();
      });
    }

    renderQ();
  }

  /* ---------- post-render hooks (galleries, countdowns, quizzes, fleet) ---------- */
  function attachImgFallbacks(root) {
    // broken/missing images → styled placeholder
    $$('.ph img', root).forEach((img) => {
      img.addEventListener('error', () => {
        const fig = img.closest('.ph');
        const caption = fig.querySelector('figcaption');
        fig.classList.add('ph--empty');
        img.remove();
        fig.insertAdjacentHTML(
          'afterbegin',
          `<div class="ph__slot">${ICONS.star}<span>Photo not found</span><small>check the file name in content.js</small></div>`
        );
        if (caption) fig.appendChild(caption);
      });
    });
  }

  function postRender(body, day) {
    attachImgFallbacks(body);

    // countdowns
    $$('[data-cd]', body).forEach((el) => {
      const target = parseLocal(el.dataset.target);
      if (target) registerCountdown(el, target, el.dataset.done, false);
    });

    // quizzes (match nth [data-quiz] element to nth quiz block)
    const quizBlocks = (day.blocks || []).filter((b) => b.type === 'quiz');
    $$('[data-quiz]', body).forEach((el, qi) => {
      if (quizBlocks[qi]) initQuiz(el, quizBlocks[qi]);
    });

    // fleets (match nth [data-fleet] element to nth fleet block)
    const fleetBlocks = (day.blocks || []).filter((b) => b.type === 'fleet');
    $$('[data-fleet]', body).forEach((el, fi) => {
      if (fleetBlocks[fi]) initFleet(el, fleetBlocks[fi]);
    });
  }

  /* ==========================================================================
     MODAL
     ========================================================================== */
  const modal = $('#modal');
  let modalOpen = false;

  function openDay(i) {
    const day = DAYS[i];
    starfield.warp();
    setTimeout(() => showModal(day), reduced ? 0 : 420);
  }

  function showModal(day) {
    const st = dayState(day);
    const isFinale = (day.blocks || []).some((b) => b.type === 'finale');
    modal.classList.toggle('modal--finale', isFinale);
    modal.style.setProperty('--accent', day.saber || '#ffe81f');

    $('#modalChips').innerHTML = `
      <span class="chip chip--ep">Episode ${esc(day.episode)}</span>
      <span class="chip">${esc(fmtDay.format(st.unlockAt).toUpperCase())}</span>
      ${st.isToday ? '<span class="chip chip--today">Today</span>' : ''}`;
    $('#modalTitle').textContent = day.title;
    $('#modalTag').textContent = day.tagline || '';
    $('#modalBody').innerHTML = (day.blocks || [])
      .map((b) => (RENDER[b.type] || RENDER.text)(b, day))
      .join('');
    postRender($('#modalBody'), day);

    modal.hidden = false;
    modalOpen = true;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    $('#modalBody').scrollTop = 0;
    $('#modalClose').focus({ preventScroll: true });

    store.markOpened(day.date);
    renderDoors();

    if (isFinale) fx.burst(9000);
  }

  function closeModal() {
    if (!modalOpen) return;
    modalOpen = false;
    fx.stop();
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      modal.hidden = true;
      $('#modalBody').innerHTML = '';
      countdowns = countdowns.filter((c) => c.persistent);
    }, 280);
  }

  /* ==========================================================================
     TOAST (locked-door messages)
     ========================================================================== */
  const YODA = [
    'Patience you must have, my young Padawan.',
    'Try to open it, you did. Succeed, you did not.',
    'Strong with the Force you are. Strong enough for this door — not yet.',
    'Even a Jedi must wait.',
    'No peeking. Told you, Yoda has.'
  ];
  let toastTimer = null;

  function toast(title, sub) {
    const t = $('#toast');
    t.innerHTML = `<strong>${esc(title)}</strong>${sub ? `<span>${esc(sub)}</span>` : ''}`;
    t.hidden = false;
    requestAnimationFrame(() => t.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove('is-on');
      setTimeout(() => { t.hidden = true; }, 300);
    }, 3400);
  }

  /* ==========================================================================
     STATUS LINE + PHASES
     ========================================================================== */
  function phase() {
    const start = parseLocal(SITE.startDate);
    const endNext = parseLocal(SITE.endDate);
    endNext.setDate(endNext.getDate() + 1);
    const n = now();
    if (n < start) return 'before';
    if (n >= endNext) return 'after';
    return 'during';
  }

  function renderStatus() {
    const el = $('#statusLine');
    const hero = $('#heroCountdown');
    const ph = phase();

    if (ph === 'before') {
      el.textContent = 'The birthday week begins in';
      hero.hidden = false;
      return;
    }
    hero.hidden = true;

    if (ph === 'after') {
      el.textContent = 'Birthday week complete — all doors remain open. May the Force be with you, always.';
      return;
    }

    const idx = DAYS.findIndex((d) => sameDay(now(), parseLocal(d.date)));
    if (idx === DAYS.length - 1) {
      el.textContent = `It's ${SITE.honoree}'s birthday — the whole galaxy celebrates today!`;
    } else if (idx >= 0) {
      el.textContent = `Day ${idx + 1} of ${DAYS.length} — today's door is now open`;
    } else {
      el.textContent = 'Birthday week is underway';
    }
  }

  /* ---------- shared 1s ticker ---------- */
  let stateKey = '';

  function tick() {
    const n = now();

    countdowns = countdowns.filter((c) => c.persistent || c.el.isConnected);
    for (const c of countdowns) {
      const ms = c.target - n;
      if (ms <= 0) {
        if (!c.done) { c.done = true; c.el.innerHTML = `<div class="cd__done">${esc(c.doneText || "IT'S TIME!")}</div>`; }
      } else {
        c.done = false;
        c.el.innerHTML = cdMarkup(ms);
      }
    }

    // re-render doors/status when a door unlocks while the page is open
    const key = DAYS.map((d) => (dayState(d).unlocked ? 1 : 0)).join('') + phase();
    if (key !== stateKey) {
      stateKey = key;
      renderDoors();
      renderStatus();
    }
  }

  /* ==========================================================================
     INTRO CRAWL
     ========================================================================== */
  const intro = $('#intro');
  let introTimers = [];

  function clearIntroTimers() {
    introTimers.forEach(clearTimeout);
    introTimers = [];
  }

  function playIntro() {
    const cfg = SITE.intro || {};
    $('#introPre').textContent = cfg.preText || '';
    $('#introLogo').innerHTML = (SITE.titleLines || []).map(esc).join('<br>');
    $('#introCrawl').innerHTML = `
      ${cfg.crawlEyebrow ? `<div class="crawl-eyebrow">${esc(cfg.crawlEyebrow)}</div>` : ''}
      ${cfg.crawlTitle ? `<div class="crawl-title">${esc(cfg.crawlTitle)}</div>` : ''}
      ${(cfg.crawl || []).map((p) => `<p>${esc(p)}</p>`).join('')}`;

    intro.hidden = false;
    intro.classList.remove('is-done');
    document.body.classList.add('no-scroll');

    clearIntroTimers();
    intro.className = 'intro stage-pre';
    introTimers.push(setTimeout(() => { intro.className = 'intro stage-logo'; }, 4000));
    introTimers.push(setTimeout(() => { intro.className = 'intro stage-crawl'; }, 4000 + 5400));
    introTimers.push(setTimeout(endIntro, 4000 + 5400 + 36500));
  }

  function endIntro() {
    clearIntroTimers();
    intro.classList.add('is-done');
    if (!modalOpen) document.body.classList.remove('no-scroll');
    setTimeout(() => { intro.hidden = true; }, 950);
    maybeBirthdayFireworks();
  }

  /* ---------- fireworks on the birthday itself ---------- */
  let birthdayFxDone = false;

  function maybeBirthdayFireworks() {
    if (birthdayFxDone) return;
    const idx = DAYS.findIndex((d) => sameDay(now(), parseLocal(d.date)));
    if (phase() === 'during' && idx === DAYS.length - 1) {
      birthdayFxDone = true;
      setTimeout(() => fx.burst(7000), 900);
    }
  }

  /* ==========================================================================
     INIT
     ========================================================================== */
  function init() {
    // header & footer text
    $('#eyebrow').textContent = SITE.eyebrow || '';
    $('#logo').innerHTML = (SITE.titleLines || []).map(esc).join('<br>');
    $('#datesLabel').textContent = SITE.datesLabel || '';
    $('#footerText').textContent = SITE.footer || '';
    document.title = `${SITE.honoree}'s Birthday Week — A Star Wars Story`;

    // the birthday boy himself, next to the title
    if (SITE.hero && SITE.hero.image) {
      const img = $('#heroFigureImg');
      img.src = SITE.hero.image;
      img.alt = SITE.honoree || 'The birthday boy';
      const label = $('#heroFigureLabel');
      label.textContent = SITE.hero.label || '';
      label.hidden = !SITE.hero.label;
      $('#heroFigure').hidden = false;
    }

    // hero countdown to the start of the week
    registerCountdown($('#heroCountdown'), parseLocal(SITE.startDate), 'IT BEGINS — OPEN DOOR ONE!', true);

    renderDoors();
    renderStatus();
    stateKey = DAYS.map((d) => (dayState(d).unlocked ? 1 : 0)).join('') + phase();
    setInterval(tick, 1000);

    // preview banner
    if (previewAll || simStart) {
      const b = $('#previewBanner');
      b.hidden = false;
      b.textContent = previewAll
        ? '⚠ Preview mode — all doors unlocked. Remove ?preview=1 from the address before showing Jake.'
        : `⚠ Time-travel mode — pretending today is ${fmtDay.format(now())}.`;
    }

    // door clicks
    $('#doors').addEventListener('click', (e) => {
      const doorEl = e.target.closest('.door');
      if (!doorEl) return;
      const i = Number(doorEl.dataset.index);
      const st = dayState(DAYS[i]);
      if (st.unlocked) {
        openDay(i);
      } else {
        doorEl.classList.remove('shake');
        void doorEl.offsetWidth; // restart animation
        doorEl.classList.add('shake');
        toast(
          YODA[Math.floor(Math.random() * YODA.length)],
          `This door opens on ${fmtDay.format(st.unlockAt)}.`
        );
      }
    });

    // modal close
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', closeModal);
    addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // intro crawl
    $('#introSkip').addEventListener('click', endIntro);
    $('#replayIntro').addEventListener('click', playIntro);
    let introSeen = false;
    try { introSeen = sessionStorage.getItem('bw_intro_seen') === '1'; } catch (e) { /* ignore */ }
    if (!reduced && !noIntro && !introSeen) {
      playIntro(); // fireworks (if it's the birthday) fire when the crawl ends
      try { sessionStorage.setItem('bw_intro_seen', '1'); } catch (e) { /* ignore */ }
    } else {
      maybeBirthdayFireworks();
    }

    // deep-link straight into a day: ?open=3 (only if that door is unlocked)
    const openParam = parseInt(params.get('open'), 10);
    if (!isNaN(openParam) && DAYS[openParam - 1] && dayState(DAYS[openParam - 1]).unlocked) {
      showModal(DAYS[openParam - 1]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
