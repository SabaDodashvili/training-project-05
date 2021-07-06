const manuIcon = document.querySelector('.manu__icon');
const manuBody = document.querySelector('.manu__body');

if (manuIcon) {
  manuIcon.addEventListener('click', (e) => {
    manuIcon.classList.toggle('active');
    manuBody.classList.toggle('active');
    body.classList.toggle('lock');
  });
}
