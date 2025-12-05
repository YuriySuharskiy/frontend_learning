document.addEventListener('DOMContentLoaded', () => {
    console.log('header-nav.js loaded');
    // Використовуємо делегування подій на document
    document.addEventListener('click', (e) => {
        // Перевіряємо чи клік був на бургері або його дочірніх елементах
        const hamburger = e.target.closest('.header__nav-hamburger');
        
        if (hamburger) {
            console.log('hamburger clicked');
            hamburger.classList.toggle('header__nav-hamburger_is-active');
            
            // Знаходимо елемент hero-bg і перемикаємо його клас
            const heroBg = document.querySelector('.hero-section');
            if (heroBg) {
                heroBg.classList.toggle('hero-section_is-active');
            }

             const body = document.querySelector('body');
            if (body) {
                body.classList.toggle('no-scroll');
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