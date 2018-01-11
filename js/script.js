function initMap() {
  var uluru = {lat: 59.936143, lng: 30.321058};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'img/marker-map.png'
  });
}

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
headerMainBtn.classList.remove('header-main__popup-button--none');
headerMainBtn.classList.remove('header-main__popup-button--opened'); // Не удалять класс header-main__popup-button--opened у кнопки
logoMain.style.backgroundColor = 'rgba(29, 38, 49, 0.7)';

function isEscPressEvent(e, action) {
  if(e.keyCode === 27) {
    action();
  }
}

function onEscPressClick(e) {
  isEscPressEvent(e, onPopupCloseClick)
}

document.addEventListener('keydown', onEscPressClick);

// MODAL MENU
function onPopupOpenClick() {
  mainNav.classList.add('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--closed');
  headerMainBtn.classList.add('header-main__popup-button--opened');
  logoMain.style.backgroundColor = '#283645';

  headerMainBtn.removeEventListener('keydown', onEscPressClick);
}

function onPopupCloseClick() {
  mainNav.classList.remove('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--opened');
  headerMainBtn.classList.add('header-main__popup-button--closed');
  logoMain.style.backgroundColor = 'rgba(29, 38, 49, 0.7)';
}

headerMainBtn.addEventListener('click', function () {
  mainNav.classList.contains('main-nav--opened') ? onPopupCloseClick() : onPopupOpenClick();
});

// logoMain.classList.remove('header-main__logo--position');
// // titlePadding.classList.remove('header-main__title--padding');

// introBgPosition.classList.remove('header-main__intro--bg-position');
// bgHeadPadding.classList.remove('header-main__bg-hand--padding');
// introPadding.classList.remove('header-main__intro--padding');
//
// if (headerMainBtn) {
// // MODAL MENU
//   function modalMenu() {
//     if (headerMainBtn.classList.contains('header-main__popup-button--closed')) {
//       headerMainBtn.classList.remove('header-main__popup-button--closed');
//       headerMainBtn.classList.add('header-main__popup-button--opened');
//       mainNav.classList.add('main-nav--opened');
//       logoMain.classList.add('header-main__logo--position');
//       titlePadding.classList.add('header-main__title--padding');
//       introBgPosition.classList.add('header-main__intro--bg-position');
//       bgHeadPadding.classList.add('header-main__bg-hand--padding');
//       introPadding.classList.add('header-main__intro--padding');
//
//     } else {
//       headerMainBtn.classList.remove('header-main__popup-button--opened');
//       headerMainBtn.classList.add('header-main__popup-button--closed');
//       mainNav.classList.remove('main-nav--opened');
//       logoMain.classList.remove('header-main__logo--position');
//       titlePadding.classList.remove('header-main__title--padding');
//       introBgPosition.classList.remove('header-main__intro--bg-position');
//       bgHeadPadding.classList.remove('header-main__bg-hand--padding');
//       introPadding.classList.remove('header-main__intro--padding');
//     }
//   }
//   headerMainBtn.addEventListener('click', modalMenu);
// }

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
