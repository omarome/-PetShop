'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const modForm = document.querySelector('#mod-pet-form');
const grid = document.querySelector('.your-pets');

const createPetCards = (pets) => {

  pets.forEach((pet) => {

    const img = document.createElement('img');
    img.src = url + '/' + pet.picture;
    img.alt = pet.name;
    img.classList.add('resp');

    const h2 = document.createElement('h2');
    h2.innerText = pet.title;

    const figure = document.createElement('figure');
    const price = document.createElement('div');
    price.className = 'price';
    price.innerText= pet.price;

    const h3 = document.createElement('h3');
    h3.innerText = pet.breed;


    const deleteButton = document.createElement('button');
    //delete pet
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      let result = confirm("Are you sure you want delete this item permanently?");
      if (result) {
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        };
        try {
          const response = await fetch(url + '/pet/' + pet.pet_id, fetchOptions);
          const json = await response.json();
          console.log('delete response', json);
          getPet();
        }
        catch (e) {
          console.log(e.message());
        }
        location.reload();
        return false;
      }
    });

    // redirect to pet page
    img.addEventListener("click", evt=>{
      document.location.href = 'pet-page.html?id='+ pet.pet_id;
    });

    modifButton.innerText = 'modify';
    modifButton.style.textTransform = 'uppercase';
    modifButton.style.padding = '8px 24px';
    modifButton.style.marginLeft = '10px';
    modifButton.style.marginBottom = '15px';

    deleteButton.style.textTransform = 'uppercase';
    deleteButton.style.padding = '8px 24px';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.marginBottom = '15px';

    figure.appendChild(h2);
    figure.appendChild(img);
    figure.appendChild(h3);
    figure.appendChild(price);
    // figure.appendChild(p);
    figure.appendChild(modifButton);
    figure.appendChild(deleteButton);

    //main.appendChild(article);
    grid.appendChild(figure);
  });
};
//add profile information
const profile = (personInfo) => {

  const profile_info = document.querySelector('.profile_info ');
  profile_info.innerHTML +=
      `<h3>First name: ${personInfo.firstname}</h3>
    <h3>Last name: ${personInfo.lastname}</h3>
    <h3>Email: ${personInfo.email_address}</h3>
    <h3>Phone number: ${personInfo.phone_number}</h3>
    <h3>Address: ${personInfo.address}</h3>`;

  const img = document.querySelector('.profile_img');
  img.innerHTML += `<img src="${personInfo.picture}" alt="Profile_picture">`
}

const addForm = document.querySelector('#password_two');

const getPet = async (user_id) => {
  try {
    const response = await fetch(url + `/pet/user/${user_id}`);
    const pets = await response.json();
    createPetCards(pets);
  }
  catch (e) {
    console.log(e.message);
  }
};
getPet(2);

const getUser = async (id) => {
  try {
    const response = await fetch(url + '/user/' + id);
    const user = await response.json();
    profile(user)
  }
  catch (e) {
    console.log(e.message);
  }
};
getUser(2)


change_password.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(change_password);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },      //'Content-Type': 'application/x-www-form-urlencoded',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  const response = await fetch(url + '/user/1', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  location.reload();
  alert('Password changed');

});

// Pop Up
// document.querySelector("#show-modify ").addEventListener("click",()=>{
//   document.querySelector(".popup").classList.add("active");
// });


// modify button
const modifButton = document.createElement('button');

// redirect to pet page
modifButton.addEventListener("click",()=>{
  document.querySelector(".popup-modify").classList.add("active");
});

document.querySelector(".popup-modify .close-btn").addEventListener("click",()=>{
  document.querySelector(".popup-modify").classList.remove("active");
});


// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/pet', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  getPet();
});

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
if (sessionStorage.getItem('token')) {
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getPet();
  getUser();
}
