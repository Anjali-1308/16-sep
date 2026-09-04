/* ==========================================================================
   Happy Birthday Bhai — Script
   ========================================================================== */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ---------------------------------------------------------------------
     Preloader
     --------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      document.body.style.overflow = '';
      startHeroSequence();
    }, 900);
  });
  // Safety net in case 'load' is slow / already fired
  setTimeout(() => {
    if (!preloader.classList.contains('is-hidden')) {
      preloader.classList.add('is-hidden');
      startHeroSequence();
    }
  }, 3200);
 
  /* ---------------------------------------------------------------------
     AOS init
     --------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
 
  /* ---------------------------------------------------------------------
     Nav: scroll state + mobile toggle
     --------------------------------------------------------------------- */
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
 
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
    });
  });
 
  /* ---------------------------------------------------------------------
     Scroll progress bar + active nav link
     --------------------------------------------------------------------- */
  const scrollProgressFill = document.getElementById('scrollProgress');
  const navLinkEls = Array.from(navLinks.querySelectorAll('a'));
  const navSections = navLinkEls
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
 
  function updateScrollChrome() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressFill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
 
    let activeIndex = -1;
    navSections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) activeIndex = i;
    });
    navLinkEls.forEach((a, i) => a.classList.toggle('is-active', i === activeIndex));
  }
  window.addEventListener('scroll', updateScrollChrome, { passive: true });
  updateScrollChrome();
 
  /* ---------------------------------------------------------------------
     Cursor glow (desktop, pointer:fine only)
     --------------------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches) {
    let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
    let renderedX = glowX, renderedY = glowY;
    window.addEventListener('mousemove', (e) => {
      glowX = e.clientX; glowY = e.clientY;
      cursorGlow.classList.add('is-active');
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'));
    function renderGlow() {
      renderedX += (glowX - renderedX) * 0.12;
      renderedY += (glowY - renderedY) * 0.12;
      cursorGlow.style.transform = `translate(${renderedX}px, ${renderedY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderGlow);
    }
    renderGlow();
  }
 
  /* ---------------------------------------------------------------------
     Timeline: gold line fills as you scroll past chapters
     --------------------------------------------------------------------- */
  const timelineFill = document.getElementById('timelineFill');
  const timelineLine = document.querySelector('.timeline__line');
  if (timelineFill && timelineLine) {
    function updateTimelineFill() {
      const rect = timelineLine.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.55;
      const visible = viewportCenter - rect.top;
      const pct = Math.min(1, Math.max(0, visible / rect.height));
      timelineFill.style.height = `${pct * 100}%`;
    }
    window.addEventListener('scroll', updateTimelineFill, { passive: true });
    updateTimelineFill();
  }
 
  /* ---------------------------------------------------------------------
     Hero sparkle motes
     --------------------------------------------------------------------- */
  const sparkleField = document.getElementById('sparkleField');
  if (sparkleField) {
    const count = window.innerWidth < 600 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const m = document.createElement('span');
      m.className = 'sparkle-mote';
      const size = 2 + Math.random() * 3;
      m.style.width = `${size}px`;
      m.style.height = `${size}px`;
      m.style.left = `${Math.random() * 100}%`;
      m.style.top = `${20 + Math.random() * 70}%`;
      m.style.animationDuration = `${4 + Math.random() * 5}s`;
      m.style.animationDelay = `${Math.random() * 4}s`;
      sparkleField.appendChild(m);
    }
  }
 
  /* ---------------------------------------------------------------------
     Hero parallax (subtle, on pointer + scroll)
     --------------------------------------------------------------------- */
  const heroBg = document.querySelector('.hero__bg');
  const hero = document.getElementById('hero');
 
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      heroBg.style.transform = `translateY(${y * 0.18}px) scale(1.02)`;
    }
  }, { passive: true });
 
  hero.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 14;
    const y = (e.clientY / innerHeight - 0.5) * 10;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  });
 
  /* ---------------------------------------------------------------------
     Typing animation
     --------------------------------------------------------------------- */
  const typingEl = document.getElementById('typingText');
  const typingText = 'My First Friend, My Biggest Support, My Forever Hero';
  let typeIndex = 0;
 
  function typeLoop() {
    if (typeIndex <= typingText.length) {
      typingEl.textContent = typingText.slice(0, typeIndex);
      typeIndex++;
      setTimeout(typeLoop, 42);
    }
  }
 
  function startHeroSequence() {
    setTimeout(typeLoop, 1100);
    spawnBalloons();
    fireConfettiBurst(60);
  }
 
  /* ---------------------------------------------------------------------
     Balloons
     --------------------------------------------------------------------- */
  const balloonColors = ['#C9A227', '#2A3E8C', '#F0D68A', '#16224A', '#E4C264'];
  const balloonsWrap = document.getElementById('balloons');
 
  function spawnBalloons() {
    const count = window.innerWidth < 600 ? 6 : 10;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      const color = balloonColors[i % balloonColors.length];
      b.style.background = `radial-gradient(circle at 32% 28%, ${lighten(color)}, ${color})`;
      b.style.left = `${Math.random() * 96}%`;
      const duration = 14 + Math.random() * 10;
      b.style.animationDuration = `${duration}s`;
      b.style.animationDelay = `${Math.random() * duration}s`;
      const scale = 0.7 + Math.random() * 0.6;
      b.style.transform = `scale(${scale})`;
      balloonsWrap.appendChild(b);
    }
  }
 
  function lighten(hex) {
    // quick lighten for balloon highlight
    const map = { '#C9A227': '#F0D68A', '#2A3E8C': '#5470D6', '#F0D68A': '#FFF3CE', '#16224A': '#33468F', '#E4C264': '#FBE7AE' };
    return map[hex] || '#ffffff';
  }
 
  /* ---------------------------------------------------------------------
     Confetti (canvas)
     --------------------------------------------------------------------- */
  const confettiCanvas = document.getElementById('confetti-canvas');
  const cctx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  const confettiColors = ['#C9A227', '#F0D68A', '#2A3E8C', '#F7F4EC', '#E4C264'];
 
  function resizeCanvases() {
    [confettiCanvas, document.getElementById('fireworks-canvas')].forEach(c => {
      c.width = window.innerWidth * devicePixelRatio;
      c.height = window.innerHeight * devicePixelRatio;
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      c.getContext('2d').setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    });
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);
 
  function fireConfettiBurst(count = 80) {
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        r: 4 + Math.random() * 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        vy: 1.5 + Math.random() * 2.5,
        vx: -1.5 + Math.random() * 3,
        rot: Math.random() * 360,
        vrot: -6 + Math.random() * 12,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        life: 0,
        maxLife: 260 + Math.random() * 140,
      });
    }
    if (!confettiRunning) runConfetti();
  }
 
  let confettiRunning = false;
  function runConfetti() {
    confettiRunning = true;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.012;
      p.rot += p.vrot;
      p.life++;
      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate((p.rot * Math.PI) / 180);
      cctx.fillStyle = p.color;
      cctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
      if (p.shape === 'rect') {
        cctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      } else {
        cctx.beginPath();
        cctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
        cctx.fill();
      }
      cctx.restore();
    });
    confettiParticles = confettiParticles.filter(p => p.life < p.maxLife && p.y < window.innerHeight + 40);
    if (confettiParticles.length > 0) {
      requestAnimationFrame(runConfetti);
    } else {
      confettiRunning = false;
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }
 
  /* ---------------------------------------------------------------------
     Music toggle
     --------------------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let musicPlaying = false;
 
  musicToggle.addEventListener('click', () => {
    if (!musicPlaying) {
      bgMusic.volume = 0.35;
      bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.classList.add('is-playing');
        musicToggle.setAttribute('aria-pressed', 'true');
      }).catch(() => {
        // No audio source provided / autoplay blocked — fail silently but flip UI
        musicPlaying = true;
        musicToggle.classList.add('is-playing');
        musicToggle.setAttribute('aria-pressed', 'true');
      });
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicToggle.classList.remove('is-playing');
      musicToggle.setAttribute('aria-pressed', 'false');
    }
  });
 
  /* ---------------------------------------------------------------------
     Gallery lightbox
     --------------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
 
  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
 
  /* ---------------------------------------------------------------------
     Gift boxes: tap or swipe to unwrap and reveal the photo
     --------------------------------------------------------------------- */
  const sparkleChars = ['✦', '✧', '❤️', '✨'];
 
  function spawnGiftSparkles(giftEl) {
    const rect = giftEl.getBoundingClientRect();
    const count = 10;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'gift__sparkle';
      s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      const originX = rect.width / 2;
      const originY = rect.height / 2;
      s.style.left = `${originX}px`;
      s.style.top = `${originY}px`;
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 60;
      s.style.setProperty('--sx', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--sy', `${Math.sin(angle) * dist}px`);
      s.style.animationDelay = `${Math.random() * 0.15}s`;
      giftEl.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  }
 
  function toggleGift(giftEl) {
    const opening = !giftEl.classList.contains('is-open');
    giftEl.classList.toggle('is-open');
    giftEl.setAttribute('aria-pressed', opening ? 'true' : 'false');
    if (opening) spawnGiftSparkles(giftEl);
  }
 
  document.querySelectorAll('.gift').forEach(gift => {
    let touchStartX = 0, touchStartY = 0, touchHandled = false, lastActionTime = 0;
 
    gift.addEventListener('click', (e) => {
      if (Date.now() - lastActionTime < 350) return; // avoid double-fire after touch
      toggleGift(gift);
      lastActionTime = Date.now();
    });
 
    gift.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleGift(gift);
      }
    });
 
    gift.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchHandled = false;
    }, { passive: true });
 
    gift.addEventListener('touchend', (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) {
        // deliberate horizontal swipe on the card
        toggleGift(gift);
        touchHandled = true;
        lastActionTime = Date.now();
      }
    }, { passive: true });
 
    // Expand button on the photo face -> open full lightbox, without re-wrapping the gift
    const expandBtn = gift.querySelector('.gift__expand');
    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(gift.querySelector('.gift__face--photo img'));
      });
    }
  });
 
  /* ---------------------------------------------------------------------
     Surprise section: fireworks + hearts + reveal
     --------------------------------------------------------------------- */
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseReveal = document.getElementById('surpriseReveal');
  const heartsLayer = document.getElementById('heartsLayer');
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const fctx = fireworksCanvas.getContext('2d');
  let fireworkParticles = [];
  let fireworksRunning = false;
  let surpriseUsed = false;
 
  const fwColors = ['#C9A227', '#F0D68A', '#2A3E8C', '#F7F4EC', '#5470D6'];
 
  function launchFirework(cx, cy) {
    const count = 46;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2.4 + Math.random() * 2.6;
      fireworkParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: fwColors[Math.floor(Math.random() * fwColors.length)],
        life: 0,
        maxLife: 55 + Math.random() * 30,
        r: 2 + Math.random() * 2,
      });
    }
    if (!fireworksRunning) runFireworks();
  }
 
  function runFireworks() {
    fireworksRunning = true;
    fctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworkParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045;
      p.vx *= 0.985;
      p.life++;
      fctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
      fctx.fillStyle = p.color;
      fctx.beginPath();
      fctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      fctx.fill();
    });
    fctx.globalAlpha = 1;
    fireworkParticles = fireworkParticles.filter(p => p.life < p.maxLife);
    if (fireworkParticles.length > 0) {
      requestAnimationFrame(runFireworks);
    } else {
      fireworksRunning = false;
      fctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
  }
 
  function spawnHearts(count = 22) {
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      h.className = 'heart-particle';
      h.textContent = Math.random() > 0.5 ? '❤️' : '💛';
      h.style.left = `${Math.random() * 100}%`;
      h.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
      h.style.fontSize = `${1 + Math.random() * 1.3}rem`;
      const duration = 3.2 + Math.random() * 2.4;
      h.style.animationDuration = `${duration}s`;
      h.style.animationDelay = `${Math.random() * 0.6}s`;
      heartsLayer.appendChild(h);
      setTimeout(() => h.remove(), (duration + 1) * 1000);
    }
  }
 
  surpriseBtn.addEventListener('click', () => {
    const rect = fireworksCanvas.getBoundingClientRect();
    // Launch a few fireworks across the section width
    const launches = [0.25, 0.5, 0.75];
    launches.forEach((pos, i) => {
      setTimeout(() => {
        launchFirework(rect.width * pos, rect.height * 0.32 + (Math.random() * 60 - 30));
      }, i * 260);
    });
 
    spawnHearts(24);
    fireConfettiBurst(50);
 
    surpriseReveal.classList.add('is-visible');
 
    if (!surpriseUsed) {
      surpriseUsed = true;
      surpriseBtn.querySelector('.surprise__btn-label').textContent = 'Once More For Luck';
    }
  });
 
  /* ---------------------------------------------------------------------
     Wishes counters — animate on scroll into view
     --------------------------------------------------------------------- */
  const wishNumbers = document.querySelectorAll('.wish__number');
  const wishFills = document.querySelectorAll('.wish__fill');
  const CIRCUMFERENCE = 2 * Math.PI * 52; // r=52
 
  wishFills.forEach(fill => {
    fill.style.strokeDasharray = `${CIRCUMFERENCE}`;
    fill.style.strokeDashoffset = `${CIRCUMFERENCE}`;
  });
 
  function animateCount(el, target, duration = 1800, onDone) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else if (onDone) onDone();
    }
    requestAnimationFrame(step);
  }
 
  const wishObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const wish = entry.target;
        const ringEl = wish.querySelector('.wish__ring');
        const numberEl = wish.querySelector('.wish__number');
        const fillEl = wish.querySelector('.wish__fill');
        const target = parseInt(numberEl.dataset.count, 10);
        animateCount(numberEl, target, 1800, () => ringEl.classList.add('is-complete'));
        const offset = CIRCUMFERENCE - (target / 100) * CIRCUMFERENCE;
        requestAnimationFrame(() => { fillEl.style.strokeDashoffset = offset; });
        wishObserver.unobserve(wish);
      }
    });
  }, { threshold: 0.4 });
 
  document.querySelectorAll('.wish').forEach(w => wishObserver.observe(w));
 
});
