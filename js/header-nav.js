document.addEventListener('DOMContentLoaded', () => {
    // Використовуємо делегування подій на document
    document.addEventListener('click', (e) => {
        // Перевіряємо чи клік був на бургері або його дочірніх елементах
        const hamburger = e.target.closest('.header__nav-hamburger');
        
        if (hamburger) {
            hamburger.classList.toggle('header__nav-hamburger_is-active');
            
            // Знаходимо елемент hero-bg і перемикаємо його клас
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.classList.toggle('hero-bg_is-active');
            }
            
            // Знаходимо елемент header__nav і перемикаємо його клас
            const headerNav = document.querySelector('.header__nav');
            if (headerNav) {
                headerNav.classList.toggle('header__nav_is-active');
            }
            
            // Знаходимо елемент header__top-line і перемикаємо його клас
            const headerTopLine = document.querySelector('.header__top-line');
            if (headerTopLine) {
                headerTopLine.classList.toggle('header__top-line_is-active');
            }
        }
    });
});