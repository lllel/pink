'use strict';

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
var headerMainBtn = document.querySelector('.header-main__popup-button');
var headerMain = document.querySelector('.header-main__nav');
var logoMain = document.querySelector('.header-main__logo');

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
var popupError = document.querySelector('.popup-error');
var popupDone = document.querySelector('.popup-done');
var errorBtn = document.querySelector('.popup-error__button');
var doneBtn = document.querySelector('.popup-done__button');

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
var slidesReview = document.querySelectorAll('.slider-reviews__item');
var inputsBtnReviews = document.querySelectorAll('.reviews__slider .slider-controls__input');
var btnLeftAll = document.querySelector('.slider-reviews__btn-left');
var btnRightAll = document.querySelector('.slider-reviews__btn-right');

function Slider(slides, arrowLeftAll, arrowRightAll, dots) {
  this.timerDelay = 6000;
  this.current = 0;
  this.last = 0;
  this.allSlides = Array.from(slides);
  this.lengthSlides = Array.from(slides).length - 1;
  this.prevBtn = arrowLeftAll;
  this.nextBtn = arrowRightAll;
  this.dots = dots;
  this.timerId = null;

  Object.defineProperties(this, {
    next: {
      get: function () {
        var next = this.current + 1;

        if (next > this.lengthSlides) {
          next = 0
        }

        return next;
      }
    },

    prev: {
      get: function () {
        var prev = this.current - 1;

        if (prev < 0) {
          prev = this.lengthSlides;
        }

        return prev;
      }
    }
  })
}

Slider.prototype.init = function () {
  var self = this;

  if (this.prevBtn && this.nextBtn) {
    this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
    this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
  }

  this.allSlides.forEach(function (it) {
    it.style.order = '1';
    it.style.transform = 'translateX(10000px)';
  });

  if (this.dots) {
    [].forEach.call(this.dots, function (it, i) {
      it.addEventListener('click', function () {
        self.changeSlide(i);
      })
    });
  }

  this.changeSlide(0);
  this.timer();
};

Slider.prototype.nextSlide = function () {
  this.changeSlide(this.next);
  this.timer();
};

Slider.prototype.prevSlide = function () {
  this.changeSlide(this.prev);
  this.timer();
};

Slider.prototype.setSlide = function (num) {
  if (this.current === num) {
    return;
  }

  this.last = this.current;
  this.current = num;
};

Slider.prototype.changeSlide = function (num) {
  this.setSlide(num);
  this.hideSlide(this.last);
  this.changeDots(num);
  this.showSlide(num);
};

Slider.prototype.hideSlide = function (num) {
  if (this.current > this.last) {
    for (var j = 0; j < this.current; j++) {
      num = j;
      this.allSlides[num].style.order = '1';
      this.allSlides[num].style.transform = 'translateX(-10000px)';
    }

  } else {
    for (var i = this.current; i <= this.lengthSlides; i++) {
      num = i;
      this.allSlides[num].style.order = '1';
      this.allSlides[num].style.transform = 'translateX(10000px)';
    }
  }
};

Slider.prototype.showSlide = function (num) {
  if (this.allSlides[num]) {
    this.allSlides[num].style.transform = 'translateX(0)';
    this.allSlides[num].style.order = '-1';
  }
};

Slider.prototype.changeDots = function (num) {
  if (this.dots[this.last]) {
    this.dots[this.last].checked = false;
    this.dots[num].checked = true;
  }

  this.timer();
};

Slider.prototype.timer = function () {
  var self = this;

  if (this.timerId) {
    clearTimeout(this.timerId);
  }

  this.timerId = setTimeout(function () {
    self.nextSlide();
  }, this.timerDelay);
};

var reviewSlider = new Slider(slidesReview, btnLeftAll, btnRightAll, inputsBtnReviews);
reviewSlider.init();

// CЛАЙДЕР - ТАРИФНЫЙ ПЛАН
var inputsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__input');
var sliderPriceTable = document.querySelector('.slider-price__table');

function SliderPrice(slider, dots) {
  this.slider = slider;
  this.dots = dots;
  this.stepLength = Array.from(dots).length - 1;
  this.start = -14.4;
  this.step = -28;
}

SliderPrice.prototype.init = function () {
  var self = this;

  [].forEach.call(this.dots, function (it, i) {
    it.addEventListener('click', function () {
      self.changeTransform(self.addTransform()[i]);
    });
  });
};

SliderPrice.prototype.addTransform = function () {
  var sum = this.start;
  var obj = {};

  obj['0'] = 'translateX(' + sum + '%)';

  for (var i = 0; i <= this.stepLength - 1; i++) {
    obj[i + 1] = 'translateX(' + (sum += this.step) + '%)';
  }

  return obj;
};

SliderPrice.prototype.changeTransform = function (num) {
  this.slider.style.transform = num;
};

var sliderPrice = new SliderPrice(sliderPriceTable, inputsBtnPrice);
sliderPrice.init();

// UPLOAD CIRCLE
var uploadSliders = document.querySelectorAll('.upload__tool-line');
var uploadCircle = document.querySelectorAll('.upload__circle');
var uploadIcons = document.querySelectorAll('.upload-tools__input');

function SliderUpload(options) {
  var self = this;

  this.elem = options.elem;
  this.i = options.i;
  this._thumb = this.elem.querySelector('.upload__circle');
  this._line = this.elem.querySelector('.upload__line');
  this.uploadIcons = uploadIcons;

  this.onMouseDown = function (evt) {
    evt.preventDefault();

    self.dragStart(evt);

    document.addEventListener('mousemove', self.onMouseMove);
    document.addEventListener('mouseup', self.onMouseUp);
  };

  this.onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    self.moveTo(evtMove);
  };

  this.onMouseUp = function () {
    document.removeEventListener('mousemove', self.onMouseMove);
    document.removeEventListener('mouseup', self.onMouseUp);
  };

  this.init = function () {
    this._thumb.addEventListener('mousedown', function (evt) {
      self.onMouseDown(evt);
    });
  }
}

SliderUpload.prototype.dragStart = function (evt) {
  this.startCoords = {
    x: evt.clientX - this._thumb.getBoundingClientRect().left
  };
};

SliderUpload.prototype.moveTo = function (evtMove) {
  var maxWidthLine = this._line.offsetWidth - (this._thumb.offsetWidth);

  var shift = {
    x: evtMove.clientX - this.startCoords.x - this._line.getBoundingClientRect().left
  };

  shift.x = Math.max(shift.x, 0);
  shift.x = Math.min(shift.x, maxWidthLine);

  this._thumb.style.left = shift.x + 'px';

  if (parseInt(this._thumb.style.left, 10) > 0) {
    this.uploadIcons[this.i].checked = true;

  } else {
    this.uploadIcons[this.i].checked = false;
  }
};

for (var i = 0; i < Array.from(uploadSliders).length; i++) {
  new SliderUpload({elem: uploadSliders[i], i: i}).init();
}

// БРЕЙКПОИНТЫ
var mediaQueryList960 = window.matchMedia("(min-width: 960px)");
var mediaQueryList660 = window.matchMedia("(min-width: 660px) and (max-width: 959px)");
var mediaQueryList320 = window.matchMedia("(min-width: 320px) and (max-width: 659px)");

function isWidthChange(mql) {
  if(mql.matches) {
    [].forEach.call(uploadCircle, function (it, i) {
      it.style.left = 0 + 'px';
      uploadIcons[i].checked = false;
    });
  }
}

isWidthChange(mediaQueryList320);
mediaQueryList320.addListener(isWidthChange);

isWidthChange(mediaQueryList660);
mediaQueryList660.addListener(isWidthChange);

isWidthChange(mediaQueryList960);
mediaQueryList960.addListener(isWidthChange);
