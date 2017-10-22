// var headerMainBtn = document.querySelector('.header-main__popup-button'),
//   mainNav = document.querySelector('.main-nav'),
//   logoMain = document.querySelector('.header-main__logo'),
//   popupError = document.querySelector('.popup-error'),
//   popupDone = document.querySelector('.popup-done'),
//   errorBtn = document.querySelector('.popup-error__button'),
//   doneBtn = document.querySelector('.popup-done__button'),
//   titlePadding = document.querySelector('.header-main__title--padding'),
//   bgHeadPadding = document.querySelector('.header-main__bg-hand--padding'),
//   introBgPosition = document.querySelector('.header-main__intro--bg-position');
//
// mainNav.classList.remove('main-nav--opened');
// logoMain.classList.remove('header-main__logo--position');
// titlePadding.classList.remove('header-main__title--padding');
// headerMainBtn.classList.remove('header-main__popup-button--none');
// bgHeadPadding.classList.remove('header-main__bg-hand--padding');
// introBgPosition.classList.remove('header-main__intro--bg-position');
//
// // if (bgHeadPadding && introBgPosition) {
// //   bgHeadPadding.classList.remove('header-main__bg-hand--padding');
// //   introBgPosition.classList.remove('header-main__intro--bg-position');
// // }
//
// // if (titlePadding) {
// //   titlePadding.classList.remove('header-main__title--padding');
// // }
//
// // if (headerMainBtn) {
// //   headerMainBtn.addEventListener('click', modalMenu);
// // }
//
// // MODAL MENU
// function modalMenu() {
//   headerMainBtn.addEventListener('click', function () {
//     if (headerMainBtn.classList.contains('header-main__popup-button--closed')) {
//       headerMainBtn.classList.remove('header-main__popup-button--closed');
//       headerMainBtn.classList.add('header-main__popup-button--opened');
//       mainNav.classList.add('main-nav--opened');
//       logoMain.classList.add('header-main__logo--position');
//       titlePadding.classList.add('header-main__title--padding');
//       bgHeadPadding.classList.add('header-main__bg-hand--padding');
//       introBgPosition.classList.add('header-main__intro--bg-position');
//
//     } else {
//       headerMainBtn.classList.remove('header-main__popup-button--opened');
//       headerMainBtn.classList.add('header-main__popup-button--closed');
//       mainNav.classList.remove('main-nav--opened');
//       logoMain.classList.remove('header-main__logo--position');
//       titlePadding.classList.remove('header-main__title--padding');
//       bgHeadPadding.classList.remove('header-main__bg-hand--padding');
//       introBgPosition.classList.remove('header-main__intro--bg-position');
//     }
//   });
// }
// modalMenu();
//
// // MODAL MESSAGE
// function modalMessage(btn, cls, modal) {
//   btn.addEventListener('click', function () {
//     if (btn.classList.contains(cls + '__button')) {
//       modal.classList.remove(cls + '--closed')
//     }
//   });
// }
// modalMessage(doneBtn, 'popup-done', popupDone);
// modalMessage(errorBtn, 'popup-error', popupError);

var headerMainBtn = document.querySelector('.header-main__popup-button');
var mainNav = document.querySelector('.main-nav');
var logoMain = document.querySelector('.header-main__logo');
var popupError = document.querySelector('.popup-error');
var popupDone = document.querySelector('.popup-done');
var errorBtn = document.querySelector('.popup-error__button');
var doneBtn = document.querySelector('.popup-done__button');
var titlePadding = document.querySelector('.header-main__title--padding');
var introBgPosition = document.querySelector('.header-main__intro--bg-position');
var bgHeadPadding = document.querySelector('.header-main__bg-hand--padding');
var introPadding = document.querySelector(".header-main__intro--padding");


mainNav.classList.remove('main-nav--opened');
logoMain.classList.remove('header-main__logo--position');
titlePadding.classList.remove('header-main__title--padding');
headerMainBtn.classList.remove('header-main__popup-button--none');
introBgPosition.classList.remove('header-main__intro--bg-position');
bgHeadPadding.classList.remove('header-main__bg-hand--padding');
introPadding.classList.remove('header-main__intro--padding');

if (headerMainBtn) {
// MODAL MENU
  function modalMenu() {
    if (headerMainBtn.classList.contains('header-main__popup-button--closed')) {
      headerMainBtn.classList.remove('header-main__popup-button--closed');
      headerMainBtn.classList.add('header-main__popup-button--opened');
      mainNav.classList.add('main-nav--opened');
      logoMain.classList.add('header-main__logo--position');
      titlePadding.classList.add('header-main__title--padding');
      introBgPosition.classList.add('header-main__intro--bg-position');
      bgHeadPadding.classList.add('header-main__bg-hand--padding');
      introPadding.classList.add('header-main__intro--padding');

    } else {
      headerMainBtn.classList.remove('header-main__popup-button--opened');
      headerMainBtn.classList.add('header-main__popup-button--closed');
      mainNav.classList.remove('main-nav--opened');
      logoMain.classList.remove('header-main__logo--position');
      titlePadding.classList.remove('header-main__title--padding');
      introBgPosition.classList.remove('header-main__intro--bg-position');
      bgHeadPadding.classList.remove('header-main__bg-hand--padding');
      introPadding.classList.remove('header-main__intro--padding');
    }
  }
  headerMainBtn.addEventListener('click', modalMenu);
}

// MODAL MESSAGE
function modalMessage(btn, cls, modal) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains(cls + '__button')) {
      modal.classList.remove(cls + '--closed')
    }
  });
}
if (doneBtn) {
  modalMessage(doneBtn, 'popup-done', popupDone);
}
if (errorBtn) {
  modalMessage(errorBtn, 'popup-error', popupError);
}
