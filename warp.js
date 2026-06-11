// Quebrei a cabeça com isso por um bom tempo mas no final aceitei a derrota e pedi pro claudio consertar a minha bagunça
//como isso só é um efeito visual torço que não tenha nenhum problema

/**
 * warp.js — Star warp / hyperspace effect
 * Classic 3D starfield using perspective projection.
 * Stars start far away (high Z) and fly toward the viewer (Z → 0),
 * projected outward from the canvas center. Trail = previous vs current position.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('warp');
  const ctx    = canvas.getContext('2d');

  const NUM_STARS = 220;
  const SPEED     = 7;       // px per frame the Z shrinks (tune for faster/slower warp)
  const SPREAD    = 1600;    // half-width of the 3D star field

  let W, H, CX, CY;
  let stars = [];
  let animId;
  
  /* ── Star factory ───────────────────────────────── */
  function makeStar(scatter) {
    // scatter=true → random Z so the field isn't empty on first frame
    const z = scatter
      ? Math.random() * (W || window.innerWidth)
      : W;
    return {
      x:  (Math.random() - 0.5) * SPREAD * 2,
      y:  (Math.random() - 0.5) * SPREAD * 2,
      z:  z,
      pz: z,   // previous Z (for trail start)
      r:  Math.random() * 1.2 + 0.3,
      b:  Math.random() * 0.45 + 0.55,   // brightness factor
    };
  }
/* ── Project 3-D → screen ───────────────────────── */
  function project(x, y, z) {
    return {
      sx: (x / z) * W + CX,
      sy: (y / z) * W + CY,
    };
  }

  /* ── Resize ─────────────────────────────────────── */
  function resize() {
    W  = canvas.width  = window.innerWidth;
    H  = canvas.height = window.innerHeight;
    CX = W / 2;
    CY = H / 2;
  }

  /* ── Init ───────────────────────────────────────── */
  function init() {
    resize();
    stars = Array.from({ length: NUM_STARS }, () => makeStar(true));
  }

  /* ── Draw loop ──────────────────────────────────── */
  function draw() {
    // partial clear → motion blur / trail fade
    ctx.fillStyle = 'rgba(7, 9, 15, 0.3)';
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Advance toward viewer
      s.pz = s.z;
      s.z -= SPEED;

      // Reset if it passes the camera or wanders off-screen
      if (s.z <= 1) {
        stars[i] = makeStar(false);
        continue;
      }

      // Project current and previous positions
      const cur  = project(s.x, s.y, s.z);
      const prev = project(s.x, s.y, s.pz);

      // Skip if outside viewport
      if (cur.sx < -20 || cur.sx > W + 20 || cur.sy < -20 || cur.sy > H + 20) {
        stars[i] = makeStar(false);
        continue;
      }

      // Opacity and size grow as star gets closer (z → 0)
      const progress = 1 - s.z / W;         // 0 = far, 1 = near
      const alpha    = Math.pow(progress, 1.6) * s.b;
      const lw       = Math.max(0.4, progress * s.r * 1.8);

      ctx.beginPath();
      ctx.moveTo(prev.sx, prev.sy);
      ctx.lineTo(cur.sx,  cur.sy);
      // Slightly warm/cold tint — blue-white stars
      ctx.strokeStyle = `rgba(190, 210, 255, ${alpha})`;
      ctx.lineWidth   = lw;
      ctx.stroke();
    }

    animId = requestAnimationFrame(draw);
  }

  /* ── Resize debounce ────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      cancelAnimationFrame(animId);
      init();
      draw();
    }, 120);
  });

  /* ── Boot ───────────────────────────────────────── */
  init();
  draw();
})();

