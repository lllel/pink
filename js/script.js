'use strict';

var TIMER_DELAY = 6000;

var headerMainBtn = document.querySelector('.header-main__popup-button');
var headerMain = document.querySelector('.header-main__nav');
var logoMain = document.querySelector('.header-main__logo');
var popupError = document.querySelector('.popup-error');
var popupDone = document.querySelector('.popup-done');
var errorBtn = document.querySelector('.popup-error__button');
var doneBtn = document.querySelector('.popup-done__button');
var slides = document.querySelectorAll('.slider-reviews__item');
var labelsBtnReviews = document.querySelectorAll('.reviews__slider .slider-controls__label');
var inputsBtnReviews = document.querySelectorAll('.reviews__slider .slider-controls__input');
var labelsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__label');
var inputsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__input');
var btnLeftAll = document.querySelectorAll('.slider-reviews__btn-left');
var btnRightAll = document.querySelectorAll('.slider-reviews__btn-right');
var sliderDescriptionBtns = document.querySelector('.slider-reviews__description');
var sliderPriceTable = document.querySelector('.slider-price__table');
var mediaQueryList960 = window.matchMedia("(min-width: 960px)");
var mediaQueryList660 = window.matchMedia("(min-width: 660px) and (max-width: 959px)");
var mediaQueryList320 = window.matchMedia("(min-width: 320px) and (max-width: 659px)");
var currentEl = 0;
var targetLabel = 0;

// БРЕЙКПОИНТЫ
function isWidthChange320(mql) {
  if(mql.matches) {
    currentEl = 0;
    targetLabel = 0;

    getInputsRemoveChecked(inputsBtnPrice);
    getSlidesHidden();

    if(sliderPriceTable) {
      sliderPriceTable.style.transform = 'translateX(-42.4%)';
    }

    if(inputsBtnPrice[1]) {
      inputsBtnPrice[1].checked = true;
    }

    if(inputsBtnReviews[0]) {
      inputsBtnReviews[0].checked = true;
    }

    if(slides[0]) {
      slides[0].style.order = '-1';
      slides[0].style.transform = 'translateX(0)';
    }
  }
}
mediaQueryList320.addListener(isWidthChange320);
isWidthChange320(mediaQueryList320);

function isWidthChange660(mql) {
  if(mql.matches) {
    currentEl = 0;
    targetLabel = 0;

    getInputsRemoveChecked(inputsBtnReviews);
    getSlidesHidden();

    if(sliderPriceTable) {
      sliderPriceTable.style.transform = 'translateX(0)';
    }

    if(inputsBtnReviews[0]) {
      inputsBtnReviews[0].checked = true;
    }

    if(slides[0]) {
      slides[0].style.order = '-1';
      slides[0].style.transform = 'translateX(0)';
    }
  }
}
mediaQueryList660.addListener(isWidthChange660);
isWidthChange660(mediaQueryList660);

function isWidthChange960(mql) {
  if(mql.matches) {
    currentEl = 0;
    targetLabel = 0;

    getInputsRemoveChecked(inputsBtnReviews);
    getSlidesHidden();

    if(sliderPriceTable) {
      sliderPriceTable.style.transform = 'translateX(0)';
    }

    if(inputsBtnReviews[0]) {
      inputsBtnReviews[0].checked = true;
    }

    if(slides[0]) {
      slides[0].style.order = '-1';
      slides[0].style.transform = 'translateX(0)';
    }
  }
}
mediaQueryList960.addListener(isWidthChange960);
isWidthChange960(mediaQueryList960);

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
  headerMain.classList.add('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--closed');
  headerMainBtn.classList.add('header-main__popup-button--opened');
  logoMain.classList.add('header-main__logo--change-color');
  headerMainBtn.removeEventListener('keydown', onEscPressClick);
}

function onPopupCloseClick() {
  headerMain.classList.remove('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--opened');
  headerMainBtn.classList.add('header-main__popup-button--closed');
  logoMain.classList.remove('header-main__logo--change-color');
}

headerMainBtn.addEventListener('click', function () {
  headerMain.classList.contains('main-nav--opened') ? onPopupCloseClick() : onPopupOpenClick();
});

headerMain.classList.remove('main-nav--opened');
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
// Скрывает слайды
function getSlidesHidden() {
  [].forEach.call(slides, function (it, i) {
    it.data = i;

    if(targetLabel === 0) {
      it.style.transform = 'translateX(10000px)';

    } else {
      it.style.transform = 'translateX(-10000px)';
    }
  });
}

// На все инпутах удаляет checked
function getInputsRemoveChecked(el) {
  [].forEach.call(el, function (it, i) {
    it.data = i;
    it.checked = false;
  });
}

// Добавляет обработчики по клику на лэйбл
function getLabelsData() {
  [].forEach.call(labelsBtnReviews, function (it, i) {
    it.data = i;

    it.addEventListener('click', function (e) {
      if(targetLabel > e.target.data) {
        targetLabel = e.target.data;
        slides[targetLabel].style.transform = 'translateX(-10000px)';

        for (var i = e.target.data; i < slides.length; i++) {
          slides[i].style.order = '1';
          slides[i].style.transform = 'translateX(10000px)';
        }

      } else {
        targetLabel = e.target.data;
        slides[targetLabel].style.transform = 'translateX(10000px)';

        for (var j = 0; j < e.target.data; j++) {
          slides[j].style.order = '1';
          slides[j].style.transform = 'translateX(-10000px)';
        }
      }
      slides[e.target.data].style.order = '-1';
      slides[e.target.data].style.transform = 'translateX(0)';
    })
  });
}
getLabelsData();

// Нажатие на правую стрелку
function onBtnArrowRightClick() {
  if(btnRightAll[slides.length - 1]) {
    btnRightAll[slides.length - 1].style.display = 'none';
  }

  [].forEach.call(btnRightAll, function (it) {
    it.addEventListener('click', function () {

      slides[currentEl].style.order = '1';
      slides[currentEl].style.transform = 'translateX(-10000px)';
      currentEl = currentEl + 1;
      slides[currentEl].style.transform = 'translateX(0)';
      slides[currentEl].style.order = '-1';
    })
  })
}
onBtnArrowRightClick();

// Нажатие на левую стрелку
function onBtnArrowLeftClick() {
  if(btnLeftAll[0]) {
    btnLeftAll[0].style.display = 'none';
  }

  [].forEach.call(btnLeftAll, function (it) {
    it.addEventListener('click', function () {
      slides[currentEl].style.order = '1';
      slides[currentEl].style.transform = 'translateX(10000px)';
      currentEl = currentEl - 1;
      slides[currentEl].style.transform = 'translateX(0)';
      slides[currentEl].style.order = '-1';
    })
  });
}
onBtnArrowLeftClick();

// Автопереключение слайдов
setTimeout(function f() {

  // ДОРАБОТАТЬ!!!

  // [].forEach.call(inputsBtnReviews, function (it, i) {
  //   if (it.checked) {
  //     currentEl = i;
  //   }
  // });

  if (currentEl === slides.length - 1) {
    currentEl = 0;
    labelsBtnReviews[currentEl].click();
  }

  setTimeout(function () {
    if (btnRightAll[currentEl] || labelsBtnReviews[currentEl]) {
      btnRightAll[currentEl].click();
      labelsBtnReviews[currentEl].click();
    }
  }, TIMER_DELAY / 2);

  setTimeout(function () {
    f();
  }, TIMER_DELAY)
}, TIMER_DELAY);

// Значения по умолчанию
if(sliderDescriptionBtns) {
  slides[0].style.transform = 'translateX(0)';
  inputsBtnReviews[0].checked = true;
}

// CЛАЙДЕР - ТАРИФНЫЙ ПЛАН
var obj = {
  '0': 'translateX(-14.4%)',
  '1': 'translateX(-42.4%)',
  '2': 'translateX(-70.4%)'
};

// Применяет трансформацию
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

// UPLOAD CIRCLE
var uploadCircle = document.querySelectorAll('.upload__circle');
var uploadLine = document.querySelector('.upload__line');

// Реализовывает перемещение пина слайдера редактирования фото
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
      it.offsetLeft > parseInt(getComputedStyle(uploadLine).width, 10) ? it.style.left = (parseInt(getComputedStyle(uploadLine).width, 10) - (parseInt(getComputedStyle(it).width, 10) / 2)) + 'px' : it.offsetLeft;
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
