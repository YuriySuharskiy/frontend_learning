document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, waiting for carousel...');
  
  // Функція ініціалізації каруселі
  const initCarousel = () => {
    console.log('Attempting to initialize carousel...');
    
    const track = document.querySelector(".pets-carousel_track");
    const prevBtn = document.querySelector(".pets-carousel__btn--prev");
    const nextBtn = document.querySelector(".pets-carousel__btn--next");

    console.log('Track:', track);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);

    if (!track || !prevBtn || !nextBtn) {
      console.error('Carousel elements not found');
      return;
    }

    let cards = Array.from(track.children);
    console.log('Cards found:', cards.length);
    
    if (cards.length === 0) {
      console.error('No cards found in carousel');
      return;
    }

    let cardWidth = cards[0].getBoundingClientRect().width;
    console.log('Card width:', cardWidth);

    // функція оновлення (при зміні екрана)
    function updateWidth() {
      cards = Array.from(track.children);
      if (cards.length > 0) {
        cardWidth = cards[0].getBoundingClientRect().width;
        console.log('Updated card width:', cardWidth);
      }
    }
    window.addEventListener("resize", updateWidth);

    // рух вперед
    nextBtn.addEventListener("click", () => {
      console.log('Next button clicked, moving forward');
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${cardWidth}px)`;

      track.addEventListener(
        "transitionend",
        () => {
          console.log('Transition ended, repositioning');
          track.appendChild(track.firstElementChild);
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
        },
        { once: true }
      );
    });

    // рух назад
    prevBtn.addEventListener("click", () => {
      console.log('Prev button clicked, moving backward');
      track.style.transition = "none";
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      track.style.transform = `translateX(-${cardWidth}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = "transform 0.4s ease";
          track.style.transform = "translateX(0)";
        });
      });
    });
    
    console.log('Carousel initialized successfully');
  };

  // Невелика затримка для HTMX
  setTimeout(() => {
    initCarousel();
  }, 500);

  // Ініціалізуємо після HTMX swap
  document.body.addEventListener('htmx:afterSwap', (event) => {
    console.log('HTMX swap detected');
    // Перевіряємо чи це наш carousel
    if (event.detail.target.querySelector('.pets-carousel_track')) {
      console.log('Carousel found in swapped content');
      setTimeout(initCarousel, 100);
    }
  });
});
