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

function renderCarousel() {
    const trackContainer = document.querySelector('.pets-carousel-track');
    trackContainer.innerHTML = slides[currentSlideIndex];
    if (window.matchMedia("(min-width: 767px)").matches) {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        trackContainer.innerHTML += slides[nextIndex];
    }
    if (window.matchMedia("(min-width: 991px)").matches) {
        const nextNextIndex = (currentSlideIndex + 2) % slides.length;
        trackContainer.innerHTML += slides[nextNextIndex];
        const nextNextNextIndex = (currentSlideIndex + 3) % slides.length;
        trackContainer.innerHTML += slides[nextNextNextIndex];
    }
}



function showNextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    renderCarousel();
}

function showPrevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    renderCarousel();
}

renderCarousel();

const nextButton = document.querySelector('.button--next');
const prevButton = document.querySelector('.button--prev');

nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

window.addEventListener('resize', renderCarousel);