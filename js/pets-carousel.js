const slides = [
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/dog.png" alt="Dog" class="pets-image" />
        <p class="pets-title">For Dogs <span class="pets_highlight">→</span></p>
        <p class="pets-description">
            Dry & Canned Food • Jerky • Chewy Treats • Bowls • Toys • Collars and Leashes • Clothes •</p>
    </div>`,
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/cat.png" alt="Cat" class="pets-image" />
        <p class="pets-title">For Cats <span class="pets_highlight">→</span></p>
        <p class="pets-description">Dry Food • Wet Food • Treats • Catnip & Grass • Litter Boxes  • Bowls & Feeders • Toys • Beds  • </p>
    </div>`,
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/parrot.png" alt="Parrot" class="pets-image" />
        <p class="pets-title">For Parrots <span class="pets_highlight">→</span></p>
        <p class="pets-description">Food • Treats • Cages & Stands • Vitamins • Bowls & Feeders • Litter & Nesting • Odor Control •</p>
    </div>`,
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/rabbit.png" alt="Rabbit" class="pets-image" />
        <p class="pets-title">For Rabbits <span class="pets_highlight">→</span></p>
        <p class="pets-description">Food • Treats • Hay • Cages • Litter & Bedding • Harnesses • Toys • Odor Removers • </p>
    </div>`,
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/hamster.png" alt="Hamster" class="pets-image" />
        <p class="pets-title">For Hamsters <span class="pets_highlight">→</span></p>
        <p class="pets-description">Food • Soft & Chewy Treats • Litter • Furniture • Collars and Leashes • Bowls • Toys • Beds • </p>
    </div>`,
    `<div class="pets-carousel-item">
        <img src="img/carousels/pets/fish.png" alt="Fish" class="pets-image" />
        <p class="pets-title">For Fish <span class="pets_highlight">→</span></p>
        <p class="pets-description">Food • Feeders • Aquariums • Filters & Pumps • Cleaning  • Water Care • Decor •</p>
    </div>`
];

let currentSlideIndex = 0;
let isAnimating = false;

function getVisibleCount() {
    if (window.matchMedia("(min-width: 991px)").matches) return 4;
    if (window.matchMedia("(min-width: 767px)").matches) return 2;
    return 1;
}

function renderCarousel() {
    const trackContainer = document.querySelector('.pets-carousel-track');
    if (!trackContainer) return;
    const visible = getVisibleCount();

    // Сформувати набір слайдів, що починається з currentSlideIndex
    trackContainer.innerHTML = '';
    for (let i = 0; i < visible; i++) {
        const idx = (currentSlideIndex + i) % slides.length;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = slides[idx];
        // вставляємо внутрішній елемент (сам слайд) — щоб уникнути додаткових обгорток
        trackContainer.appendChild(wrapper.firstElementChild);
    }

    // Скидаємо трансформ/transition після рендера
    trackContainer.style.transition = 'none';
    trackContainer.style.transform = 'translateX(0)';
}

function animateNext() {
    if (isAnimating) return;
    const track = document.querySelector('.pets-carousel-track');
    if (!track || !track.firstElementChild) return;

    isAnimating = true;
    const first = track.firstElementChild;
    const cardWidth = first.getBoundingClientRect().width;

    // анімація вліво
    requestAnimationFrame(() => {
        track.style.transition = 'transform 0.45s ease';
        track.style.transform = `translateX(-${cardWidth}px)`;
    });

    track.addEventListener('transitionend', function onEnd() {
        track.removeEventListener('transitionend', onEnd);
        // після анімації перемістити перший елемент в кінець і оновити індекс/рендер
        track.appendChild(first);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        // невелика пауза, щоб браузер застосував зміни
        requestAnimationFrame(() => {
            renderCarousel();
            isAnimating = false;
        });
    }, { once: true });
}

function animatePrev() {
    if (isAnimating) return;
    const track = document.querySelector('.pets-carousel-track');
    if (!track || !track.firstElementChild) return;

    isAnimating = true;
    // перемістити останній елемент в початок
    const last = track.lastElementChild;
    track.insertBefore(last, track.firstElementChild);

    // виміряти ширину нового першого елемента
    const first = track.firstElementChild;
    const cardWidth = first.getBoundingClientRect().width;

    // зрушити трак вліво без анімації, потім анімувати повернення
    track.style.transition = 'none';
    track.style.transform = `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.transition = 'transform 0.45s ease';
            track.style.transform = 'translateX(0)';
        });
    });

    track.addEventListener('transitionend', function onEnd() {
        track.removeEventListener('transitionend', onEnd);
        // після анімації оновити індекс і перерендерити
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        requestAnimationFrame(() => {
            renderCarousel();
            isAnimating = false;
        });
    }, { once: true });
}

// initial render
renderCarousel();

// підключаємо кнопки без ламання існуючої логіки — перевіряємо наявність
const nextButton = document.querySelector('.button--next');
const prevButton = document.querySelector('.button--prev');

if (nextButton) {
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        animateNext();
    });
}
if (prevButton) {
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        animatePrev();
    });
}

// оновлюємо при зміні розміру
window.addEventListener('resize', () => {
    // невелика затримка щоб елементи перерахувались
    setTimeout(renderCarousel, 80);
});

// Якщо HTMX підвантажує контент — перекличка ініціалізації (не ламає існуючий код)
document.body.addEventListener('htmx:afterSwap', (event) => {
    if (event.detail && event.detail.target && event.detail.target.querySelector && event.detail.target.querySelector('.pets-carousel-track')) {
        setTimeout(() => {
            renderCarousel();
        }, 100);
    }
});