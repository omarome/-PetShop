"use strict";
const url = 'https://localhost:8000';  // change url when uploading to server

const addCommentForm = document.querySelector('#comment-form');
const addCommSubBtn= document.querySelector('#comm-submit-btn');
const petIdCommForm= document.querySelector('#pet-id-form');

const createPetDetails = (pet) => {

    const title = document.querySelector('#title');
    const expandedImg = document.querySelector('#expandedImg');
    const price = document.querySelector('#price');
    const breed = document.querySelector('#breed');
    const description = document.querySelector('#description');

    expandedImg.src = pet.picture;
    title.innerText = pet.title;
    price.innerText= pet.price;
    breed.innerText = pet.breed;
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


// AJAX call
const getPetById = async  (id) => {

  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const petResponse = await fetch(url+`/pet/${id}`);
    const pet = await petResponse.json();
    createPetDetails(pet);

    const userResponse = await fetch(url +`/user/${pet.user_id}`, options);
    const user = await userResponse.json();
    createOwner(user);

    const commentsResponse= await fetch(url +`/comment/${pet.pet_id}`)
    const comments = await commentsResponse.json();
    allPetComments(comments);

    const viewedResponse = await  fetch(url+`/view/${pet.pet_id}`);
    const viewed = await viewedResponse.json();
    createViewedCount(viewed);


// submit add comment form/////// a bug/// it doesnt post a comment
    petIdCommForm.Value= pet.pet_id;
    addCommSubBtn.addEventListener('submit', async (evt) => {

      evt.preventDefault();
      let fd = new FormData(addCommentForm);

      const Options = {
        method: 'POST',

        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),

        },
        body: fd
      };
      const response = await fetch(url + `/comment`, Options);
      const json = await response.json();
      console.log('add response', json);
      alert('Adding comment succeeded');

    });

  }
  catch (e) {
    console.log(e.message);
  }
};
//submit add comment code ends here
getPetById(id);

// PopUp login
const loginForm = document.querySelector('#login-form');
const loginWrapper = document.querySelector('#login-wrapper');

document.querySelector("#show-login").addEventListener("click",()=>{
  document.querySelector(".popup").classList.add("active");
});
const loginBtn= document.querySelector('#show-login');
//login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    // show/hide forms + cats
    loginBtn.style.display='none';
    logOut.style.display = 'block';

    userInfo.innerHTML = `Hello ${json.user.firstname}`;
  }
});
document.querySelector(".popup .close-btn").addEventListener("click",()=>{
  document.querySelector(".popup").classList.remove("active");
});
document.querySelector(".popup #login-submit-btn").addEventListener("click",()=>{
  document.querySelector(".popup").classList.remove("active");
});

// logout
const logOut = document.querySelector('#log-out');
const userInfo = document.querySelector('#user-info');

logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    alert('You have logged out');
    // show/hide forms
    loginWrapper.style.display = 'flex';
    logOut.style.display = 'none';
    loginBtn.style.display='block';


  }
  catch (e) {
    console.log(e.message);
  }

});

if(sessionStorage.getItem('token')){
  logOut.style.display = 'block';
  loginBtn.style.display='none';

}else{

  loginBtn.style.display='block';
  logOut.style.display='none';

}