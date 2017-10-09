var headerMainBtn = document.querySelector('.header-main__popup-button'),
  mainNav = document.querySelector('.main-nav'),
  logoMain = document.querySelector('.header-main__logo'),
  headerMainIntro = document.querySelector('.header-main__intro'),
  popupError = document.querySelector('.popup-error'),
  popupDone = document.querySelector('.popup-done'),
  errorBtn = document.querySelector('.popup-error__button'),
  doneBtn = document.querySelector('.popup-done__button');

mainNav.classList.remove('main-nav--opened');
logoMain.classList.remove('header-main__logo--position');
headerMainIntro.classList.remove('header-main__intro--padding');
headerMainBtn.classList.remove('header-main__popup-button--none');

// MODAL MENU
function modalMenu() {
  headerMainBtn.addEventListener('click', function () {
    if (headerMainBtn.classList.contains('header-main__popup-button--closed')) {
      headerMainBtn.classList.remove('header-main__popup-button--closed');
      headerMainBtn.classList.add('header-main__popup-button--opened');
      mainNav.classList.add('main-nav--opened');
      logoMain.classList.add('header-main__logo--position');
      headerMainIntro.classList.add('header-main__intro--padding');
    } else {
      headerMainBtn.classList.remove('header-main__popup-button--opened');
      headerMainBtn.classList.add('header-main__popup-button--closed');
      mainNav.classList.remove('main-nav--opened');
      logoMain.classList.remove('header-main__logo--position');
      headerMainIntro.classList.remove('header-main__intro--padding');
    }
  });
}
modalMenu();

// MODAL MESSAGE
function modalMessage(btn, cls, modal) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains(cls + '__button')) {
      modal.classList.remove(cls + '--closed')
    }
  });
}
modalMessage(doneBtn, 'popup-done', popupDone);
modalMessage(errorBtn, 'popup-error', popupError);
