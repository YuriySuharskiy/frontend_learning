// ─────────────────────── НОВИЙ JS (повністю заміни старий) ──────────────────────

const track = document.querySelector('.trending_products_carousel_track');
const slides = track ? Array.from(track.children).map(card => card.outerHTML) : [];
let currentIndex = 0;
let isAnimating = false;
let animationTimeout = null;

function getCardWidth() {
  const card = track.firstElementChild;
  if (!card) return 0;
  const style = getComputedStyle(card);
  const gap = parseFloat(style.marginRight || '0') + parseFloat(style.marginLeft || '0');
  return card.offsetWidth + gap;
}

function createInfiniteLoop() {
  track.innerHTML = '';

  // структура: [last] [all slides] [first]
  track.insertAdjacentHTML('afterbegin', slides[slides.length - 1]);
  slides.forEach(slide => track.insertAdjacentHTML('beforeend', slide));
  track.insertAdjacentHTML('beforeend', slides[0]);

  // почати з першого справжнього слайду (позиція -100%)
  track.style.transition = 'none';
  track.style.transform = 'translateX(-100%)';
  
  requestAnimationFrame(() => {
    track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });
}

function slideNext() {
  if (isAnimating) return;
  isAnimating = true;

  if (animationTimeout) clearTimeout(animationTimeout);

  const cardWidth = getCardWidth();
  
  // ДОДАНО: одразу додаємо наступний слайд в кінець ДО анімації
  currentIndex = (currentIndex + 1) % slides.length;
  const nextSlide = slides[(currentIndex + slides.length) % slides.length];
  track.insertAdjacentHTML('beforeend', nextSlide);

  // анімуємо до наступного слайду
  requestAnimationFrame(() => {
    track.style.transform = `translateX(calc(-100% - ${cardWidth}px - 30px))`;
  });

  const handler = () => {
    track.removeEventListener('transitionend', handler);
    
    track.style.transition = 'none';
    
    // видаляємо перший (старий) слайд
    const first = track.firstElementChild;
    if (first) {
      track.removeChild(first);
    }

    // скидаємо позицію на -100% (перший справжній слайд)
    track.style.transform = 'translateX(-100%)';

    animationTimeout = setTimeout(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      isAnimating = false;
    }, 50);
  };

  track.addEventListener('transitionend', handler, { once: true });
}

function slidePrev() {
  if (isAnimating) return;
  isAnimating = true;

  if (animationTimeout) clearTimeout(animationTimeout);

  const cardWidth = getCardWidth();
  
  // анімуємо до попереднього (на 1 карту назад)
  track.style.transform = `translateX(calc(-100% + ${cardWidth}px + 30px))`;

  const handler = () => {
    track.removeEventListener('transitionend', handler);
    
    track.style.transition = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;

    // видаляємо останній, додаємо попередній на початок
    const last = track.lastElementChild;
    if (last) {
      track.removeChild(last);
      const prevSlide = slides[(currentIndex - 1 + slides.length) % slides.length];
      track.insertAdjacentHTML('afterbegin', prevSlide);
    }

    // скидаємо позицію на -100% (перший справжній слайд)
    track.style.transform = 'translateX(-100%)';

    animationTimeout = setTimeout(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      isAnimating = false;
    }, 50);
  };

  track.addEventListener('transitionend', handler, { once: true });
}

// === Ініціалізація ===
createInfiniteLoop();

// === Кнопки ===
document.querySelector('.button--next')?.addEventListener('click', slideNext);
document.querySelector('.button--prev')?.addEventListener('click', slidePrev);

// === На resize ===
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (!isAnimating) {
      createInfiniteLoop();
    }
  }, 150);
});