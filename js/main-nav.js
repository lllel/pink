var headerMainBtn = document.querySelector('.header-main__popup-button'),
  mainNav = document.querySelector('.main-nav'),
  logoMain = document.querySelector('.header-main__logo'),
  headerMainIntro = document.querySelector('.header-main__intro');

mainNav.classList.remove('main-nav--nojs');
headerMainBtn.classList.remove('header-main__popup-button--nojs');
logoMain.classList.remove('header-main__logo--position');
headerMainIntro.classList.remove('header-main__intro--padding');

headerMainBtn.addEventListener('click', function () {
  if (headerMainBtn.classList.contains('header-main__popup-button--closed')) {
    headerMainBtn.classList.remove('header-main__popup-button--closed');
    headerMainBtn.classList.add('header-main__popup-button--opened');
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
    logoMain.classList.add('header-main__logo--position');
    headerMainIntro.classList.add('header-main__intro--padding');
  } else {
    headerMainBtn.classList.add('header-main__popup-button--closed');
    headerMainBtn.classList.remove('header-main__popup-button--opened');
    mainNav.classList.add('main-nav--closed');
    mainNav.classList.remove('main-nav--opened');
    logoMain.classList.remove('header-main__logo--position');
    headerMainIntro.classList.remove('header-main__intro--padding');
  }
});
