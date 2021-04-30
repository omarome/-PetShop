"use strict";
function myFunction(imgs) {
  const expandImg = document.getElementById("expandedImg");
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}



// PopUp

document.querySelector("#show-login").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
});

