// jsgarantia.js - versão reforçada e com debug leve
(function () {
  'use strict';

  // Pequena função utilitária de log (liga/desliga facilmente)
  const debug = (...args) => {
    if (window && window.location && window.location.search.includes('dbg')) {
      console.log('[carousel]', ...args);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Pegando elementos
    const carouselEl = document.querySelector('.vellosci-carousel');
    const slides = Array.from(document.querySelectorAll('.vellosci-carousel .slide'));
    const dots = Array.from(document.querySelectorAll('.vellosci-carousel .dot'));
    const prevBtn = document.querySelector('.vellosci-carousel .prev-btn');
    const nextBtn = document.querySelector('.vellosci-carousel .next-btn');

    // Validacões básicas
    if (!carouselEl) {
      console.warn('Carousel: elemento .vellosci-carousel não encontrado.');
      return;
    }
    if (!slides.length) {
      console.warn('Carousel: nenhum .slide encontrado.');
      return;
    }

    debug('slides encontrados:', slides.length, 'dots:', dots.length, 'prev/next:', !!prevBtn, !!nextBtn);

    // Estado
    let current = 0;
    const intervalMs = 5000;
    let timerId = null;
    let isPointerDown = false;
    let startX = 0;

    // Normaliza dots: se tiver menos o suficiente, ignora sem quebrar
    const hasDots = dots.length > 0;

    // Função que aplica o estado visual
    function applyState(index) {
      // normaliza índice
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

      debug('mostrando slide', current);
    }

    // Mostra slide por índice (API pública interna)
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
      debug('autoplay iniciado');
    }

    function stopAutoplay() {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        debug('autoplay parado');
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Eventos: setas
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

    // Eventos: dots
    if (hasDots) {
      dots.forEach((dot, idx) => {
        // click e tecla
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

    // Pausa ao hover (desktop) / toque (mobile)
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);

    // Visibilidade da aba
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    // Teclado: esquerda/direita no foco do carrossel
    carouselEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
      if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    });

    // Touch swipe simples
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

    // Acessibilidade: se houver links dentro do slide, não deixe pointer-events bloqueados pelo CSS
    // (verifique seu CSS: prefira opacity/visibility em vez de display:none)
    slides.forEach(s => {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
    });

    // Inicialização segura: garante que apenas 1 active exista
    const initialActive = slides.findIndex(s => s.classList.contains('active'));
    current = initialActive >= 0 ? initialActive : 0;
    applyState(current);

    // inicia autoplay
    startAutoplay();

    // cleanup se for necessário
    window.addEventListener('beforeunload', stopAutoplay);

    debug('carousel inicializado com sucesso');
  });
})();
z