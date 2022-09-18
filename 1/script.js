const icon1 = document.querySelector('.btn_icon1');
const icon2 = document.querySelector('.btn_icon2');
const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  icon1.classList.toggle('cut-down');
  icon2.classList.toggle('cut-down');
});
