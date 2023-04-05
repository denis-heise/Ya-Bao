if(window.outerWidth <= 1024){
    const desktopMenu = document.querySelector('.header-content__menu');
    const desktopMenuUl = desktopMenu.querySelector('ul');
    const wrapperMenu = document.querySelector('.burger-menu__wrapper');
    const bodyMenu = document.querySelector('.burger-menu__body');
    const burger = document.querySelector('.burger-menu__strip');
    const menu = document.querySelector('.burger-menu__header');
    const arrows = document.querySelector('.slider-arrows');
    bodyMenu.style.display = 'block';
    desktopMenuUl.style.display = 'none';

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        document.querySelector('body').classList.toggle('lock');
        wrapperMenu.style.display = 'block';

        if (menu.classList.contains('active')){
            arrows.style.zIndex = '-1';
        } else {
            arrows.style.zIndex = '10';
        };
    });
};