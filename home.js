(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    const carouselEl = document.querySelector('.vellosci-carousel');
    const slides = Array.from(document.querySelectorAll('.vellosci-carousel .slide'));
    const dots = Array.from(document.querySelectorAll('.vellosci-carousel .dot'));
    const prevBtn = document.querySelector('.vellosci-carousel .prev-btn');
    const nextBtn = document.querySelector('.vellosci-carousel .next-btn');

    if (!carouselEl) {
      console.warn('Carousel: elemento .vellosci-carousel não encontrado.');
      return;
    }
    if (!slides.length) {
      console.warn('Carousel: nenhum .slide encontrado.');
      return;
    }

    let current = 0;
    const intervalMs = 5000;
    let timerId = null;
    let isPointerDown = false;
    let startX = 0;

    const hasDots = dots.length > 0;

    function applyState(index) {
     
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      current = index;

      slides.forEach((s, i) => {
        if (i === current) {
          s.classList.add('active');
          s.setAttribute('aria-hidden', 'false');
        } else {
          s.classList.remove('active');
          s.setAttribute('aria-hidden', 'true');
        }
      });

      if (hasDots) {
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === current);
          d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
      }
    }
    function show(index) {
      applyState(index);
    }

    // Avança 1
    function next() {
      show(current + 1);
    }

    // Volta 1
    function prev() {
      show(current - 1);
    }

    // Timer
    function startAutoplay() {
      stopAutoplay();
      timerId = setInterval(() => next(), intervalMs);
    }

    function stopAutoplay() {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    
    if (hasDots) {
      dots.forEach((dot, idx) => {
       
        dot.addEventListener('click', () => { show(idx); resetAutoplay(); });
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            show(idx);
            resetAutoplay();
          }
        });
      });
    }

    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);

  
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });


    carouselEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
      if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    });

    carouselEl.addEventListener('touchstart', (e) => {
      stopAutoplay();
      if (e.touches && e.touches.length) {
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    carouselEl.addEventListener('touchmove', (e) => {
      if (!e.touches || !e.touches.length) return;
      const dx = e.touches[0].clientX - startX;
      // opcional: podemos usar dx para efeito visual; não necessário aqui
    }, { passive: true });

    carouselEl.addEventListener('touchend', (e) => {
      if (!e.changedTouches || !e.changedTouches.length) { startAutoplay(); return; }
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      const threshold = 40; // px
      if (dx > threshold) { prev(); }
      else if (dx < -threshold) { next(); }
      resetAutoplay();
    });
    slides.forEach(s => {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
    });

    const initialActive = slides.findIndex(s => s.classList.contains('active'));
    current = initialActive >= 0 ? initialActive : 0;
    applyState(current);

    startAutoplay();

    window.addEventListener('beforeunload', stopAutoplay);
  });
})();
