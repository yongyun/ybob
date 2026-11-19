// --------------------------------------------- //
// Y.BOB shared layout parts (header-free, Sparvle-style includes)
// --------------------------------------------- //
// Put a placeholder where a part belongs and this file swaps in the full
// markup, so every page shares one copy:
//   <div data-include="header"></div>   menu + header (top of <body>)
//   <div data-include="cta"></div>      "Let's talk" block (inside <main>)
//   <div data-include="footer"></div>   site footer
// Load this file BEFORE js/libs.min.js and js/app.js, so the template's
// animations and forms find the real elements when they initialise.
// The cta part has an ink background and the 3D ticker
// (project/9_3d-ticker/ticker.html); pages using it also need
// <script src="js/ink-screen.js"></script> after app.js.
// Edit the markup below once and every page picks it up.
// --------------------------------------------- //
(function () {
  "use strict";

  var header = `
<nav class="mxd-nav__wrap" data-lenis-prevent="">

  <!-- Hamburger Start -->
  <div class="mxd-nav__contain loading__fade">
    <a href="#0" class="mxd-nav__hamburger" aria-label="Menu">
      <!-- flip element -->
      <div class="hamburger__base"></div>
      <div class="hamburger__line"></div>
      <div class="hamburger__line"></div>
    </a>
  </div>
  <!-- Hamburger End -->

  <!-- Main Navigation Start -->
  <div class="mxd-menu__wrapper">
    <!-- background active layer -->
    <div class="mxd-menu__base"></div>
    <!-- menu container -->
    <div class="mxd-menu__contain">
      <div class="mxd-menu__inner">
        <!-- left side -->
        <div class="mxd-menu__left">
          <p class="mxd-menu__caption menu-fade-in">Integrated design, workflows<br>and cohesive digital experiences</p>
          <div class="main-menu">
            <nav class="main-menu__content">
              <ul id="main-menu" class="main-menu__accordion">
                <li class="main-menu__item">
                  <a class="main-menu__link btn btn-anim" href="index.html">
                    <span class="btn-caption">Home</span>
                  </a>
                </li>
                <li class="main-menu__item">
                  <a class="main-menu__link btn btn-anim" href="works.html">
                    <span class="btn-caption">Works</span>
                  </a>
                </li>
                <li class="main-menu__item">
                  <a class="main-menu__link btn btn-anim" href="index.html#mxd-footer" data-menu-anchor>
                    <span class="btn-caption">Contact</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- right side -->
        <div class="mxd-menu__right">
          <div class="menu-promo">
            <div class="menu-promo__content">
              <p class="menu-promo__caption menu-fade-in">👋 Nice to see you!<br>I'm Yun, a designer working across
                visuals, motion, digital products and AI workflows.</p>
              <div class="menu-promo__video">
                <video class="menu-video" id="inner-video" preload="auto" autoplay="autoplay" loop="loop" muted="muted" playsinline poster="project/1_2026omo/omo-feature-04-blending-poster.jpg">
                  <source type="video/mp4" src="project/1_2026omo/omo-feature-04-blending.mp4">
                </video>
              </div>
            </div>
          </div>
        </div>
        <!-- data bottom line -->
        <div class="mxd-menu__data menu-fade-in">
          <p class="t-xsmall">
            <a class="no-effect" href="https://www.instagram.com/y.bob.design/" target="_blank">Instagram</a>
            &nbsp;/&nbsp;
            <a class="no-effect" href="https://www.behance.net/yunyunyun" target="_blank">Behance</a>
          </p>
          <p class="t-xsmall">
            <i class="ph ph-copyright"></i>
            2026 Y.BOB Design
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Main Navigation End -->

</nav>
<!-- Menu & Menu Hamburger End -->

<!-- Header Start -->
<header id="header" class="mxd-header">
  <!-- header logo -->
  <div class="mxd-header__logo loading__fade">
    <a href="index.html" class="mxd-logo">
      <!-- logo icon -->
      <svg class="mxd-logo__image" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 202 50">
        <style type="text/css">
          .mxd-logo__mark{fill:var(--t-bright);}
        </style>
        <path class="mxd-logo__mark" d="M88.46,23.99c3.04-2.36,4.76-5.95,4.76-9.96,0-7.34-5.97-13.3-13.3-13.3h-19.58v48.55h21.1c7.59,0,13.76-6.17,13.76-13.76,0-4.79-2.57-9.14-6.75-11.52ZM79.92,21.74h-13.8V6.31h13.8c4.15,0,7.52,3.46,7.52,7.72s-3.37,7.72-7.52,7.72ZM89.42,35.51c0,4.51-3.58,8.18-7.98,8.18h-15.32v-16.36h15.32c4.4,0,7.98,3.67,7.98,8.18Z"/>
        <path class="mxd-logo__mark" d="M128.85,0c-14.02,0-25,10.98-25,25s10.98,25,25,25,25-10.98,25-25S142.87,0,128.85,0ZM148.07,25c0,10.85-8.44,19.35-19.22,19.35s-19.22-8.5-19.22-19.35,8.44-19.35,19.22-19.35,19.22,8.5,19.22,19.35Z"/>
        <path class="mxd-logo__mark" d="M177.78.73c-7.33,0-13.3,5.97-13.3,13.3,0,4.01,1.73,7.6,4.76,9.96-4.18,2.39-6.75,6.73-6.75,11.52,0,7.59,6.17,13.76,13.76,13.76h21.1V.73h-19.58ZM170.26,14.03c0-4.25,3.37-7.72,7.52-7.72h13.8v15.43h-13.8c-4.14,0-7.52-3.46-7.52-7.72ZM176.26,27.33h15.32v16.36h-15.32c-4.4,0-7.98-3.67-7.98-8.18s3.58-8.18,7.98-8.18Z"/>
        <path class="mxd-logo__mark" d="M34.05.69l-10.8,27.62L10.71.69h-6.07l15.73,34.8-.54,1.32c-.83,1.96-3.36,6.59-8.74,7.04l-6.18-.02v5.34l6.04.09c.11,0,.22.01.33.01.1,0,.2,0,.3,0h.28c5.63,0,10.61-4.09,13.32-10.94L40.07.69h-6.02Z"/>
        <circle class="mxd-logo__mark" cx="41.37" cy="46.07" r="3.2"/>
      </svg>
      <!-- logo text -->
      <span class="mxd-logo__text">Y.BOB<br>DESIGN</span>
    </a>
  </div>
  <!-- header controls -->
  <div class="mxd-header__controls loading__fade">
    <button id="color-switcher" class="mxd-color-switcher" type="button" role="switch" aria-label="light/dark mode" aria-checked="true"></button>
  </div>
</header>
`;

  var cta = `
<div class="mxd-section overflow-hidden">
  <div class="mxd-container">

    <!-- Block - CTA Start -->
    <div class="mxd-block">
      <div class="mxd-promo">
        <div class="mxd-promo__inner anim-zoom-out-container" data-ink-host>
          <!-- background: interactive ink (js/ink-screen.js) -->
          <div class="mxd-promo__bg ink-screen-bg">
            <canvas data-ink-screen data-ink-color="#6D9B3F"></canvas>
          </div>
          <!-- caption -->
          <div class="mxd-promo__content">
            <p class="mxd-promo__title anim-uni-in-up">
              <span class="mxd-promo__caption reveal-type">Let's talk about your project!</span>
            </p>
            <div class="mxd-promo__controls anim-uni-in-up">
              <a class="btn btn-anim btn-default btn-large btn-additional slide-right-up" href="mailto:yun@ybobdesign.com?subject=Hello%20from%20your%20portfolio">
                <span class="btn-caption">Say Hello</span>
                <i class="ph-bold ph-arrow-up-right"></i>
              </a>
            </div>
          </div>
          <!-- parallax images -->
          <!-- 3D ticker, full height on the right (desktop) -->
          <div class="mxd-promo__images promo-ticker">
            <iframe src="project/9_3d-ticker/ticker.html?theme=mono" title="Y.BOB DESIGN 3D ticker" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
          </div>
        </div>
      </div>
    </div>
    <!-- Block - CTA End -->

  </div>
</div>
`;

  var footer = `
<footer id="mxd-footer" class="mxd-footer">

  <!-- Footer Block - Fullwidth Text Start -->
  <div class="mxd-footer__text-wrap">
    <div class="fullwidth-text__tl-trigger"></div>
    <div class="mxd-footer__fullwidth-text anim-top-to-bottom">
      <svg class="mxd-footer__svg-v2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 573.55 72" style="enable-background:new 0 0 573.55 72;" xml:space="preserve" role="img" aria-label="Y.BOB DESIGN">
    <path d="M21.59 56V35.14L0.83 0H12.76L26.92 24.5H27.19L41.45 0H52.87L32.11 35V56ZM53.18 56.83Q50.47 56.83 48.58 54.93Q46.68 53.04 46.68 50.33Q46.68 47.62 48.58 45.73Q50.47 43.83 53.18 43.83Q55.89 43.83 57.78 45.73Q59.68 47.62 59.68 50.33Q59.68 53.04 57.78 54.93Q55.89 56.83 53.18 56.83ZM70.4 56V0H98.67Q103.68 0 107.41 1.77Q111.14 3.54 113.25 6.76Q115.36 9.97 115.36 14.27Q115.36 18.6 112.95 21.59Q110.54 24.59 106.75 25.85V26.13Q109.86 26.83 112.44 28.68Q115.02 30.53 116.57 33.39Q118.12 36.25 118.12 40.09Q118.12 44.87 115.81 48.43Q113.5 52 109.41 54Q105.32 56 99.91 56ZM80.93 46.87H97.97Q102.57 46.87 105.08 44.82Q107.6 42.77 107.6 38.95Q107.6 35.1 105.1 33.13Q102.59 31.16 98.04 31.16H80.93ZM80.93 22.76H97.23Q100.88 22.76 102.85 21Q104.83 19.23 104.83 15.95Q104.83 12.59 102.85 10.86Q100.88 9.13 97.23 9.13H80.93ZM151.48 56.83Q142.91 56.83 136.51 53.27Q130.12 49.71 126.58 43.23Q123.04 36.75 123.04 28Q123.04 19.18 126.58 12.71Q130.12 6.25 136.51 2.71Q142.91 -0.83 151.48 -0.83Q160.12 -0.83 166.51 2.69Q172.9 6.21 176.41 12.67Q179.91 19.14 179.91 27.98Q179.91 36.75 176.37 43.25Q172.83 49.75 166.45 53.29Q160.06 56.83 151.48 56.83ZM151.5 47.64Q159.94 47.64 164.64 42.33Q169.34 37.03 169.34 27.99Q169.34 18.9 164.65 13.63Q159.97 8.36 151.48 8.36Q143.05 8.36 138.33 13.63Q133.62 18.9 133.62 27.98Q133.62 37.05 138.33 42.35Q143.05 47.64 151.5 47.64ZM189.46 56V0H217.72Q222.73 0 226.46 1.77Q230.19 3.54 232.3 6.76Q234.41 9.97 234.41 14.27Q234.41 18.6 232 21.59Q229.59 24.59 225.81 25.85V26.13Q228.91 26.83 231.49 28.68Q234.07 30.53 235.62 33.39Q237.17 36.25 237.17 40.09Q237.17 44.87 234.86 48.43Q232.55 52 228.47 54Q224.38 56 218.96 56ZM199.98 46.87H217.02Q221.62 46.87 224.13 44.82Q226.65 42.77 226.65 38.95Q226.65 35.1 224.15 33.13Q221.65 31.16 217.09 31.16H199.98ZM199.98 22.76H216.28Q219.93 22.76 221.91 21Q223.88 19.23 223.88 15.95Q223.88 12.59 221.91 10.86Q219.93 9.13 216.28 9.13H199.98ZM266.2 56V0H287.69Q296.82 0 303.44 3.37Q310.06 6.75 313.64 13.04Q317.23 19.33 317.23 28Q317.23 36.6 313.61 42.89Q309.99 49.18 303.37 52.59Q296.75 56 287.69 56ZM276.72 47.04H287.69Q296.86 47.04 301.74 41.89Q306.62 36.75 306.62 28Q306.62 19.19 301.75 14.07Q296.88 8.96 287.69 8.96H276.72ZM367.06 56H326.76V0H367.06V9.13H337.28V22.51H364.97V31.42H337.28V46.87H367.06ZM398.23 56.83Q387.1 56.83 380.49 51.97Q373.88 47.1 373.26 38.44H384.14Q384.66 43.25 388.35 45.74Q392.05 48.23 398.6 48.23Q404.44 48.23 407.45 46.29Q410.46 44.34 410.46 40.51Q410.46 37.52 408.47 35.72Q406.49 33.91 402.27 33.07L390.99 30.77Q383.35 29.18 379.5 25.36Q375.66 21.54 375.66 15.54Q375.66 7.92 381.42 3.54Q387.19 -0.83 397.12 -0.83Q407.14 -0.83 413.35 3.75Q419.55 8.33 420.35 16.52H409.46Q407.45 7.51 396.52 7.51Q391.58 7.51 388.77 9.35Q385.96 11.18 385.96 14.6Q385.96 19.93 393.57 21.47L405.35 23.86Q413.24 25.46 417 29.34Q420.76 33.23 420.76 39.68Q420.76 47.81 414.86 52.32Q408.96 56.83 398.23 56.83ZM430.38 56V0H440.91V56ZM478.18 56.83Q470.08 56.83 463.9 53.21Q457.71 49.6 454.26 43.1Q450.81 36.6 450.81 28.04Q450.81 19.36 454.39 12.86Q457.97 6.36 464.44 2.77Q470.91 -0.83 479.47 -0.83Q486.32 -0.83 491.57 1.46Q496.81 3.76 500.15 8.05Q503.49 12.34 504.44 18.41H493.47Q492.62 13.63 488.96 11.03Q485.31 8.44 479.47 8.44Q473.98 8.44 469.9 10.84Q465.83 13.24 463.61 17.66Q461.39 22.09 461.39 28.13Q461.39 34.18 463.65 38.67Q465.91 43.17 469.99 45.64Q474.07 48.11 479.48 48.11Q483.65 48.11 486.97 46.72Q490.28 45.32 492.21 42.92Q494.14 40.52 494.14 37.49V34.92H478.52V26.69H496.28Q500.28 26.69 502.36 28.65Q504.44 30.61 504.44 34.43V56H494.67V48.98H494.32Q492.43 52.72 488.2 54.77Q483.97 56.83 478.18 56.83ZM567.38 56H555.99L525.32 15.03H525.04V56H515.02V0H526.12L557.08 41.6H557.36V0H567.38Z"/>
    </svg>
    </div>
  </div>
  <!-- Footer Block - Fullwidth Text End -->

  <!-- Footer Block - Info Columns Start -->
  <div class="mxd-footer__footer-blocks">
    <!-- single column -->
    <div class="footer-blocks__column animate-card-3">
      <!-- inner card -->
      <div class="footer-blocks__card fullheight-card">
        <!-- footer navigation -->
        <div class="footer-blocks__nav">
          <ul class="footer-nav">
            <li class="footer-nav__item anim-uni-in-up">
              <a href="index.html" class="footer-nav__link btn-anim">
                <span class="btn-caption">Home</span>
              </a>
            </li>
            <li class="footer-nav__item anim-uni-in-up">
              <a href="works.html" class="footer-nav__link btn-anim">
                <span class="btn-caption">Works</span>
              </a>
              <p class="footer-nav__counter">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                  <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
                    c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
                    c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
                    c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
                    c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
                    c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
                    c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
                </svg>
                <span>5</span>
              </p>
            </li>
            <li class="footer-nav__item anim-uni-in-up">
              <a href="mailto:yun@ybobdesign.com?subject=Hello%20from%20your%20portfolio" class="footer-nav__link btn-anim">
                <span class="btn-caption">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- single column -->
    <div class="footer-blocks__column footer-blocks__column--contacts animate-card-3">
      <!-- inner card -->
      <div class="footer-blocks__card">
        <p class="mxd-point-subtitle anim-uni-in-up">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
            <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
              c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
              c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
              c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
              c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
              c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
              c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
          </svg>
          <a href="mailto:yun@ybobdesign.com?subject=Message%20from%20your%20site">yun@ybobdesign.com</a>
        </p>
      </div>
      <!-- inner card -->
      <div class="footer-blocks__card">
        <p class="mxd-point-subtitle anim-uni-in-up">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
            <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
              c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
              c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
              c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
              c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
              c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
              c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
          </svg>
          <a href="https://www.behance.net/yunyunyun" target="_blank">Behance</a>
        </p>
      </div>
      <!-- inner card -->
      <div class="footer-blocks__card">
        <p class="mxd-point-subtitle anim-uni-in-up">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
            <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
              c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
              c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
              c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
              c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
              c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
              c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
          </svg>
          <a href="https://www.instagram.com/y.bob.design/" target="_blank">Instagram</a>
        </p>
      </div>
    </div>
  </div>
  <!-- Footer Block - Info Columns End -->

  <!-- Footer Block - Copyright Start -->
  <div class="mxd-footer__copyright">
    <p>&copy; 2026 Y.BOB Design. All rights reserved.</p>
  </div>
  <!-- Footer Block - Copyright End -->

</footer>
`;

  var parts = { header: header, cta: cta, footer: footer };
  document.querySelectorAll("[data-include]").forEach(function (el) {
    var html = parts[el.getAttribute("data-include")];
    if (html) el.outerHTML = html.trim();
  });

  // menu "Contact": on a page that has the footer, close the menu and
  // scroll to it; on other pages the link opens index.html#mxd-footer
  document.querySelectorAll("[data-menu-anchor]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.getElementById("mxd-footer");
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var burger = document.querySelector(".mxd-nav__hamburger.nav-open");
      if (burger) burger.click();
      setTimeout(function () {
        if (typeof lenis !== "undefined") lenis.scrollTo(target, { duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      }, burger ? 450 : 0);
    });
  });

  // highlight the current page in the menu
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".submenu__item > a").forEach(function (a) {
    if (a.getAttribute("href") === current) a.parentElement.classList.add("active");
  });
})();
