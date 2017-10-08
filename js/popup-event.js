var popupError = document.querySelector('.popup-error'),
    popupDone = document.querySelector('.popup-done'),
    errorBtn = document.querySelector('.popup-error__button'),
    doneBtn = document.querySelector('.popup-done__button');

errorBtn.addEventListener('click', function () {
  if (errorBtn.classList.contains('popup-error__button')) {
    popupError.classList.remove('popup-error--opened');
    popupError.classList.add('popup-error--closed')
  }
});

doneBtn.addEventListener('click', function () {
  if (doneBtn.classList.contains('popup-done__button')) {
    popupDone.classList.remove('popup-done--opened');
    popupDone.classList.add('popup-done--closed')
  }
});
