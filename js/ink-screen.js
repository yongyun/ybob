// --------------------------------------------- //
// Ink Screen - interactive ink fluid background
// Usage: <canvas data-ink-screen></canvas> inside a positioned container;
// the canvas fills its parent. The pointer is tracked on the closest
// [data-ink-host] ancestor (or the parent), so the canvas can sit behind
// content with pointer-events: none. Clicking inside the host shifts the
// ink to a new random color. With no pointer over the host, an invisible
// brush drifts along a slow looping path and cycles through hues.
// Optional data attributes: data-ink-color="#6D9B3F", data-ink-brush="200"
// --------------------------------------------- //
(function () {
  "use strict";

  const N = 64;
  const ITER = 16;
  const SIZE = (N + 2) * (N + 2);
  const MAX_DIM = window.innerWidth <= 768 ? 960 : 4096;

  const DEFAULTS = {
    color: "#6D9B3F",
    brushSize: 200,
    inkDensity: 10,
    sharpness: 0,
    dragStrength: 0.01,
    dissipation: 0.987,
    viscosity: 0.0006,
    diffusion: 0,
    vorticity: 0.21,
    // idle autopilot
    autoSpeed: 0.002,     // path speed per frame (lower = slower drift)
    autoHueSpeed: 0.12,   // hue degrees per frame (~50s per full cycle)
    autoDensity: 0.35,    // ink strength relative to the pointer
    autoDrag: 3           // push strength relative to the pointer
  };

  const IX = (i, j) => i + (N + 2) * j;
  const REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  }

  function hslToRgb(h, s, l) {
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [f(0) * 255, f(8) * 255, f(4) * 255];
  }

  function hexToRgb(hex) {
    const h = String(hex || "").replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function setBoundary(b, x) {
    for (let i = 1; i <= N; i++) {
      x[IX(0, i)] = b === 1 ? -x[IX(1, i)] : x[IX(1, i)];
      x[IX(N + 1, i)] = b === 1 ? -x[IX(N, i)] : x[IX(N, i)];
      x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
      x[IX(i, N + 1)] = b === 2 ? -x[IX(i, N)] : x[IX(i, N)];
    }
    x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
    x[IX(0, N + 1)] = 0.5 * (x[IX(1, N + 1)] + x[IX(0, N)]);
    x[IX(N + 1, 0)] = 0.5 * (x[IX(N, 0)] + x[IX(N + 1, 1)]);
    x[IX(N + 1, N + 1)] = 0.5 * (x[IX(N, N + 1)] + x[IX(1, N)]);
  }

  function addSource(x, s, dt) {
    for (let i = 0; i < SIZE; i++) x[i] += dt * s[i];
  }

  function diffuse(b, x, x0, diff, dt) {
    const a = dt * diff * N * N;
    for (let k = 0; k < ITER; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          x[IX(i, j)] = (x0[IX(i, j)] + a * (x[IX(i - 1, j)] + x[IX(i + 1, j)] + x[IX(i, j - 1)] + x[IX(i, j + 1)])) / (1 + 4 * a);
        }
      }
      setBoundary(b, x);
    }
  }

  function advect(b, d, d0, u, v, dt) {
    const dt0 = dt * N;
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        let x = i - dt0 * u[IX(i, j)];
        let y = j - dt0 * v[IX(i, j)];
        if (x < 0.5) x = 0.5;
        if (x > N + 0.5) x = N + 0.5;
        if (y < 0.5) y = 0.5;
        if (y > N + 0.5) y = N + 0.5;
        const i0 = Math.floor(x), i1 = i0 + 1;
        const j0 = Math.floor(y), j1 = j0 + 1;
        const s1 = x - i0, s0 = 1 - s1;
        const t1 = y - j0, t0 = 1 - t1;
        d[IX(i, j)] = s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) +
                      s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]);
      }
    }
    setBoundary(b, d);
  }

  function project(u, v, p, div) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        div[IX(i, j)] = -0.5 * (u[IX(i + 1, j)] - u[IX(i - 1, j)] + v[IX(i, j + 1)] - v[IX(i, j - 1)]) / N;
        p[IX(i, j)] = 0;
      }
    }
    setBoundary(0, div);
    setBoundary(0, p);
    for (let k = 0; k < ITER; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          p[IX(i, j)] = (div[IX(i, j)] + p[IX(i - 1, j)] + p[IX(i + 1, j)] + p[IX(i, j - 1)] + p[IX(i, j + 1)]) / 4;
        }
      }
      setBoundary(0, p);
    }
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        u[IX(i, j)] -= 0.5 * N * (p[IX(i + 1, j)] - p[IX(i - 1, j)]);
        v[IX(i, j)] -= 0.5 * N * (p[IX(i, j + 1)] - p[IX(i, j - 1)]);
      }
    }
    setBoundary(1, u);
    setBoundary(2, v);
  }

  function InkScreen(canvas) {
    const cfg = Object.assign({}, DEFAULTS);
    cfg.brushSize = parseFloat(canvas.dataset.inkBrush) || cfg.brushSize;
    let rgb = hexToRgb(canvas.dataset.inkColor) || hexToRgb(cfg.color);

    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    const eventHost = canvas.closest("[data-ink-host]") || host;
    const offscreen = document.createElement("canvas");
    offscreen.width = offscreen.height = N + 2;
    const offCtx = offscreen.getContext("2d");
    const imgData = offCtx.createImageData(N + 2, N + 2);

    // smoothing: upscale the coarse grid in two passes, then soften with a
    // blur about one grid cell wide so cell edges never show
    const mid = document.createElement("canvas");
    mid.width = mid.height = (N + 2) * 4;
    const midCtx = mid.getContext("2d");
    midCtx.imageSmoothingEnabled = true;
    midCtx.imageSmoothingQuality = "high";
    ctx.filter = "blur(1px)";
    const canvasBlur = ctx.filter === "blur(1px)";
    ctx.filter = "none";

    let u = new Float32Array(SIZE), v = new Float32Array(SIZE);
    let uPrev = new Float32Array(SIZE), vPrev = new Float32Array(SIZE);
    let densR = new Float32Array(SIZE), densG = new Float32Array(SIZE), densB = new Float32Array(SIZE);
    let densRPrev = new Float32Array(SIZE), densGPrev = new Float32Array(SIZE), densBPrev = new Float32Array(SIZE);
    const curl = new Float32Array(SIZE);
    const vort = new Float32Array(SIZE);

    const mouse = { x: 0, y: 0, px: 0, py: 0, active: false };
    const baseHsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const auto = { t: Math.random() * 100, hue: baseHsl[0], x: 0, y: 0, px: 0, py: 0, started: false };
    let visible = false;
    let rafId = null;

    let blurPx = 0;
    function resize() {
      canvas.width = Math.max(1, Math.min(MAX_DIM, host.clientWidth));
      canvas.height = Math.max(1, Math.min(MAX_DIM, host.clientHeight));
      blurPx = Math.round(Math.max(canvas.width, canvas.height) / (N + 2) * 0.6);
      // browsers without canvas filters (older Safari) blur the element instead
      if (!canvasBlur) canvas.style.filter = "blur(" + blurPx + "px)";
    }

    function pointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    eventHost.addEventListener("pointermove", (e) => {
      const pos = pointerPos(e);
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.active = true;
    });
    eventHost.addEventListener("pointerleave", () => { mouse.active = false; });

    // click: keep one channel, randomize the other two
    eventHost.addEventListener("pointerdown", () => {
      const idx = [0, 1, 2].sort(() => Math.random() - 0.5);
      rgb = rgb.slice();
      rgb[idx[0]] = Math.floor(Math.random() * 256);
      rgb[idx[1]] = Math.floor(Math.random() * 256);
    });

    function confinement(dt) {
      const vc = cfg.vorticity;
      if (vc === 0) return;
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          curl[IX(i, j)] = 0.5 * (v[IX(i + 1, j)] - v[IX(i - 1, j)] - (u[IX(i, j + 1)] - u[IX(i, j - 1)]));
          vort[IX(i, j)] = Math.abs(curl[IX(i, j)]);
        }
      }
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          let dx = 0.5 * (vort[IX(i + 1, j)] - vort[IX(i - 1, j)]);
          let dy = 0.5 * (vort[IX(i, j + 1)] - vort[IX(i, j - 1)]);
          const len = Math.sqrt(dx * dx + dy * dy) + 1e-5;
          dx /= len;
          dy /= len;
          u[IX(i, j)] += dt * vc * dy * curl[IX(i, j)];
          v[IX(i, j)] -= dt * vc * dx * curl[IX(i, j)];
        }
      }
    }

    // inject ink and velocity in a soft round brush at (x, y)
    function splat(x, y, dx, dy, color, densityScale, dragScale) {
      const mx = Math.floor((x / canvas.width) * N) + 1;
      const my = Math.floor((y / canvas.height) * N) + 1;
      const radius = Math.max(1, Math.floor((cfg.brushSize / canvas.width) * N));
      const ink = cfg.inkDensity * densityScale;
      const drag = cfg.dragStrength * dragScale;
      for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
          const cx = mx + i, cy = my + j;
          if (cx < 1 || cx > N || cy < 1 || cy > N) continue;
          const dist = Math.sqrt(i * i + j * j);
          if (dist >= radius) continue;
          const s = 1 - dist / radius;
          densRPrev[IX(cx, cy)] = (color[0] / 255) * ink * s;
          densGPrev[IX(cx, cy)] = (color[1] / 255) * ink * s;
          densBPrev[IX(cx, cy)] = (color[2] / 255) * ink * s;
          uPrev[IX(cx, cy)] = dx * drag * s;
          vPrev[IX(cx, cy)] = dy * drag * s;
        }
      }
    }

    function step() {
      const dt = 0.1;
      densRPrev.fill(0); densGPrev.fill(0); densBPrev.fill(0);
      uPrev.fill(0); vPrev.fill(0);

      if (mouse.active) {
        splat(mouse.x, mouse.y, mouse.x - mouse.px, mouse.y - mouse.py, rgb, 1, 1);
      } else if (!REDUCED_MOTION) {
        // idle: drift along a slow Lissajous loop and cycle the hue
        auto.t += cfg.autoSpeed;
        auto.hue = (auto.hue + cfg.autoHueSpeed) % 360;
        auto.px = auto.x;
        auto.py = auto.y;
        auto.x = canvas.width * (0.5 + 0.38 * Math.sin(auto.t * 1.3));
        auto.y = canvas.height * (0.5 + 0.32 * Math.sin(auto.t * 1.9 + 1.2));
        if (!auto.started) { auto.px = auto.x; auto.py = auto.y; auto.started = true; }
        const col = hslToRgb(auto.hue, Math.max(baseHsl[1], 0.45), Math.min(Math.max(baseHsl[2], 0.35), 0.6));
        splat(auto.x, auto.y, auto.x - auto.px, auto.y - auto.py, col, cfg.autoDensity, cfg.autoDrag);
      }

      // velocity
      addSource(u, uPrev, dt);
      addSource(v, vPrev, dt);
      confinement(dt);
      [u, uPrev] = [uPrev, u]; diffuse(1, u, uPrev, cfg.viscosity, dt);
      [v, vPrev] = [vPrev, v]; diffuse(2, v, vPrev, cfg.viscosity, dt);
      project(u, v, uPrev, vPrev);
      [u, uPrev] = [uPrev, u]; [v, vPrev] = [vPrev, v];
      advect(1, u, uPrev, uPrev, vPrev, dt);
      advect(2, v, vPrev, uPrev, vPrev, dt);
      project(u, v, uPrev, vPrev);

      // density, per channel
      addSource(densR, densRPrev, dt);
      [densR, densRPrev] = [densRPrev, densR]; diffuse(0, densR, densRPrev, cfg.diffusion, dt);
      [densR, densRPrev] = [densRPrev, densR]; advect(0, densR, densRPrev, u, v, dt);
      addSource(densG, densGPrev, dt);
      [densG, densGPrev] = [densGPrev, densG]; diffuse(0, densG, densGPrev, cfg.diffusion, dt);
      [densG, densGPrev] = [densGPrev, densG]; advect(0, densG, densGPrev, u, v, dt);
      addSource(densB, densBPrev, dt);
      [densB, densBPrev] = [densBPrev, densB]; diffuse(0, densB, densBPrev, cfg.diffusion, dt);
      [densB, densBPrev] = [densBPrev, densB]; advect(0, densB, densBPrev, u, v, dt);

      for (let i = 0; i < SIZE; i++) {
        densR[i] *= cfg.dissipation;
        densG[i] *= cfg.dissipation;
        densB[i] *= cfg.dissipation;
      }

      const data = imgData.data;
      for (let i = 0; i <= N + 1; i++) {
        for (let j = 0; j <= N + 1; j++) {
          const idx = IX(i, j);
          const maxVal = Math.max(densR[idx], densG[idx], densB[idx]);
          const p = (i + j * (N + 2)) * 4;
          if (maxVal > 0.01) {
            const norm = 1 / maxVal;
            data[p] = densR[idx] * norm * 255;
            data[p + 1] = densG[idx] * norm * 255;
            data[p + 2] = densB[idx] * norm * 255;
            let alpha = maxVal * 2;
            if (cfg.sharpness > 0) {
              alpha = Math.pow(alpha, 1 - cfg.sharpness * 0.98);
              if (cfg.sharpness > 0.95) alpha = alpha > 0.05 ? 1 : 0;
            }
            data[p + 3] = Math.min(255, alpha * 255);
          } else {
            data[p + 3] = 0;
          }
        }
      }
      offCtx.putImageData(imgData, 0, 0);

      midCtx.clearRect(0, 0, mid.width, mid.height);
      midCtx.drawImage(offscreen, 0, 0, mid.width, mid.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (canvasBlur) ctx.filter = "blur(" + blurPx + "px)";
      ctx.drawImage(mid, 0, 0, canvas.width, canvas.height);
      if (canvasBlur) ctx.filter = "none";
    }

    function loop() {
      step();
      rafId = visible ? requestAnimationFrame(loop) : null;
    }

    resize();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(host);
    else window.addEventListener("resize", resize);

    // only simulate while the block is on screen
    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !rafId) rafId = requestAnimationFrame(loop);
      }).observe(host);
    } else {
      visible = true;
      rafId = requestAnimationFrame(loop);
    }
  }

  document.querySelectorAll("canvas[data-ink-screen]").forEach((c) => InkScreen(c));
})();
