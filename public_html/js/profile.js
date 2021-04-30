'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const grid = document.querySelector('.grid-col1');

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

    // view button
    const viewButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    //delete pet
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      var result = confirm("Are you sure you want delete this item permanently?");
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


    viewButton.innerText = 'view pet';
    viewButton.style.textTransform = 'uppercase';
    viewButton.style.padding = '8px 24px';
    viewButton.style.marginLeft = '10px';
    viewButton.style.marginBottom = '15px';

    deleteButton.style.textTransform = 'uppercase';
    deleteButton.style.padding = '8px 24px';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.marginBottom = '15px';

    figure.appendChild(h2);
    figure.appendChild(img);
    figure.appendChild(h3);
    figure.appendChild(price);
    // figure.appendChild(p);
    figure.appendChild(viewButton);
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
  img.innerHTML += `<img src="${personInfo.PICTURE}" alt="Profile_picture">`
}

const addForm = document.querySelector('#password_two');

// AJAX calls

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
getPet(1);

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
getUser(1)