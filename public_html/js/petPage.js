"use strict";
const url = 'http://localhost:3000'; // change url when uploading to server

const createPetDetails = (pet) => {

    const title = document.querySelector('#title');
    const expandedImg = document.querySelector('#expandedImg');
    const price = document.querySelector('#price');
    const breed = document.querySelector('#breed');
    const description = document.querySelector('#description');
    const location = document.querySelector('#location');
    expandedImg.src = pet.picture;
    title.innerText = pet.title;
    price.innerText= pet.price;
    breed.innerText = pet.breed;
    location.innerText = pet.user_id;
    description.innerText = pet.description;

};
// to print the pet owner name and address
const createOwner = (user) =>{
  const ownerName = document.querySelector('#owner');
  const location = document.querySelector('#location');

  ownerName.innerText = `${user.firstname} ${user.lastname}` ;
  location.innerText =` ${user.address}`;

}

// to print all comments belong to this pet
const allPetComments= (comments) => {
  const allComments = document.querySelector('#all-comments');
comments.forEach((petComment) =>{

  const fullName = document.createElement('h1');
  const email=document.createElement('p');
  const comment=document.createElement('p');

  fullName.innerText = `${petComment.comment_owner_firstname}  ${petComment.comment_owner_lastname} commented on this post` ;
  email.innerText =`Email: ${petComment.comment_owner_email}`;
  comment.innerText = `Comment: ${petComment.comment}`;

  allComments.appendChild(fullName);
  allComments.appendChild(email);
  allComments.appendChild(comment);
})};
// to print how many times this ade has been viewed
const createViewedCount = (views) =>{
  const viewedTimes = document.querySelector('#viewed');
  views.forEach((petViews) => {
    viewedTimes.innerText= `${petViews.viewed}`;
  });
};

//routing images views by click in the pet details page
 const routingImagesFun=(imgs)=> {
  const expandImg = document.getElementById("expandedImg");
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}

const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const id= getParameterByName('id');
//alert(id)
const increaseViews = async (views,id)=>{
  try{
     // fetch insert route and pass id and views as paramiter

    fetch(url+`/views/?${(views+1)&id}`);

  }
  catch (e){

  }
}
// AJAX call
const getPetById = async  (id) => {

  try{

    const petResponse = await fetch(url+`/pet/${id}`);
    const pet = await petResponse.json();
    createPetDetails(pet);

    const userResponse = await fetch(url +`/user/${pet.user_id}`)
    const user = await userResponse.json();
    createOwner(user);

    const commentsResponse= await fetch(url +`/comment/${pet.pet_id}`)
    const comments = await commentsResponse.json();
    allPetComments(comments);


    const viewedResponse = await  fetch(url+`/view/${pet.pet_id}`);
    const viewed = await viewedResponse.json();
    createViewedCount(viewed);

  }
  catch (e) {
    console.log(e.message);
  }
};
getPetById(id);

// PopUp
document.querySelector("#show-login").addEventListener("click",()=>{
  document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",()=>{
  document.querySelector(".popup").classList.remove("active");
});


