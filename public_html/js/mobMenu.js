//Menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('#navigation');

menuBtn.addEventListener('click',()=> {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
});