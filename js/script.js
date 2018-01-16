'use strict';

var headerMainBtn = document.querySelector('.header-main__popup-button');
var mainNav = document.querySelector('.main-nav');
var logoMain = document.querySelector('.header-main__logo');
var popupError = document.querySelector('.popup-error');
var popupDone = document.querySelector('.popup-done');
var errorBtn = document.querySelector('.popup-error__button');
var doneBtn = document.querySelector('.popup-done__button');
var slides = document.querySelectorAll('.slider-reviews__item');
var labelsBtnRewievs = document.querySelectorAll('.reviews__slider .slider-controls__label');
var inputsBtnRewievs = document.querySelectorAll('.reviews__slider .slider-controls__input');
var labelsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__label');
var inputsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__input');
var btnLeft = document.querySelector('.slider-reviews__btn-left');
var btnRight = document.querySelector('.slider-reviews__btn-right');
var sliderDescriptionBtns = document.querySelector('.slider-reviews__description');
var sliderPriceTable = document.querySelector('.slider-price__table');
var mediaQueryList660 = window.matchMedia("(min-width: 660px)");
var mediaQueryList320 = window.matchMedia("(max-width: 659px)");
var currentEl = 0;

// КАРТА
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

function isEscPressEvent(e, action) {
  if(e.keyCode === 27) {
    action();
  }
}

function onEscPressClick(e) {
  isEscPressEvent(e, onPopupCloseClick)
}

document.addEventListener('keydown', onEscPressClick);


// ПОПАП МЕНЮ
function onPopupOpenClick() {
  mainNav.classList.add('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--closed');
  headerMainBtn.classList.add('header-main__popup-button--opened');
  logoMain.classList.add('header-main__logo--change-color');

  headerMainBtn.removeEventListener('keydown', onEscPressClick);
}

function onPopupCloseClick() {
  mainNav.classList.remove('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--opened');
  headerMainBtn.classList.add('header-main__popup-button--closed');
  logoMain.classList.remove('header-main__logo--change-color');
}

headerMainBtn.addEventListener('click', function () {
  mainNav.classList.contains('main-nav--opened') ? onPopupCloseClick() : onPopupOpenClick();
});

mainNav.classList.remove('main-nav--opened');
headerMainBtn.classList.remove('header-main__popup-button--none');
headerMainBtn.classList.remove('header-main__popup-button--opened'); // Не удалять класс header-main__popup-button--opened у кнопки
logoMain.classList.remove('header-main__logo--change-color');

// ПОПАП В ФОРМЕ
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

// CЛАЙДЕР - ОТЗЫВЫ
function getSlidesHidden() {
  [].forEach.call(slides, function (it, i) {
    it.data = i;
    it.style.display = 'none';
  });
}
getSlidesHidden();


function getInputsRemoveChecked(el) {
  [].forEach.call(el, function (it, i) {
    it.data = i;
    it.checked = false;
  });
}

function getLabelsData() {
  [].forEach.call(labelsBtnRewievs, function (it, i) {
    it.data = i;

    it.addEventListener('click', function (e) {
      getSlidesHidden();
      getInputsRemoveChecked(inputsBtnRewievs);

      slides[e.target.data].style.display = 'block';
    })
  });
}
getLabelsData();

function onBtnArrowClick(e) {
  getSlidesHidden();
  getLabelsData();

  if (e.target === btnRight) {
    currentEl++;
    slides[currentEl].style.display = 'block';

  } else if (e.target === btnLeft) {
    currentEl--;
    slides[currentEl].style.display = 'block';
  }

  sliderDescriptionBtns.removeEventListener('click', onBtnArrowClick);
}

if(sliderDescriptionBtns) {
  sliderDescriptionBtns.addEventListener('click', onBtnArrowClick);  // Починить (событие срабатывает только 1 раз).
                                                                      // Плавное переключение слайдов

  slides[0].style.display = 'block';
  inputsBtnRewievs[0].checked = true;
}

// CЛАЙДЕР - ТАРИФНЫЙ ПЛАН
var obj = {
  '0': 'translateX(-14.4%)',
  '1': 'translateX(-42.4%)',
  '2': 'translateX(-70.4%)'
};

function getLabelsDataPrice() {
  [].forEach.call(labelsBtnPrice, function (it, i) {
    it.data = i;

    it.addEventListener('click', function (e) {
      getInputsRemoveChecked(inputsBtnPrice);

      sliderPriceTable.style.transform = obj[e.target.data];
    })
  });
}
getLabelsDataPrice();

function isWidthChange320(mql) {
  if(mql.matches) {
    getInputsRemoveChecked(inputsBtnPrice);

    if(sliderPriceTable) {
      sliderPriceTable.style.transform = 'translateX(-42.4%)';
    }

    if(inputsBtnPrice[1]) {
      inputsBtnPrice[1].checked = true;
    }
  }
}
mediaQueryList320.addListener(isWidthChange320);
isWidthChange320(mediaQueryList320);

function isWidthChange660(mql) {
  if(mql.matches) {

    if(sliderPriceTable) {
      sliderPriceTable.style.transform = 'translateX(0)';
    }
  }
}
mediaQueryList660.addListener(isWidthChange660);
isWidthChange660(mediaQueryList660);

// UPLOAD CIRCLE
var uploadCircle = document.querySelectorAll('.upload__circle');

[].forEach.call(uploadCircle, function (it) {
  it.style.left = '0px';

  it.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX
    };

    function onMouseMove(moveE) {
      moveE.preventDefault();

      var shift = {
        x: startCoords.x - moveE.clientX
      };

      startCoords = {
        x: moveE.clientX
      };

      it.offsetLeft < 0 ? it.style.left = '0px' : it.offsetLeft;
      it.offsetLeft > it.style.width ? it.style.left = it.style.width + 'px' : it.offsetLeft; // Починить (Нет ограничения перемещения круга)
      it.style.left = (it.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upE) {
      upE.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

