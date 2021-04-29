'use strict';
//this section is copied from omar
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

    //location!?
    // const p = document.createElement('p');
    // p.innerText = file.location;

    // view button
    const viewButton = document.createElement('button');
    viewButton.innerText = 'view pet';

    viewButton.style.textTransform = 'uppercase';
    viewButton.style.padding = '8px 24px';
    viewButton.style.marginLeft = '10px';
    viewButton.style.marginBottom = '15px';

    figure.appendChild(h2);
    figure.appendChild(img);
    figure.appendChild(h3);
    figure.appendChild(price);
    // figure.appendChild(p);
    figure.appendChild(viewButton);

    //main.appendChild(article);
    grid.appendChild(figure);
  });
};

// AJAX call
const getPet = async () => {
  try {
    const response = await fetch(url + '/pet');
    const pets = await response.json();
    createPetCards(pets);
  }
  catch (e) {
    console.log(e.message);
  }
};
getPet();

//omar code ends

const personInfo =
    {
      'USER_ID' : '1',
      'USER_TYPE_ID' : '1',
      'FNAME' : 'Sepi',
      'LNAME' : 'Temmes',
      'EMAIL_ADDRESS' : 'placeholder@email.com',
      'PASSWORD' : 'TEXT NOT NULL',
      'BIRTHDAY' : 'DATE   NULL',
      'SEX' : 'CHAR(1) NULL',
      'PHONE_NUMBER' : 'INT NULL',
      'PICTURE' : 'img/pic1.png',
      'ADDRESS' : 'Kopinkuja 5 2000 Espoo',
      'USER_VST' :  'DATE  GENERATED',
      'USER_VET' : 'DATE',
      'PRIMARY KEY':'(USER_ID, USER_VST'
    }

const profile_info = document.querySelector('.profile_info ');
profile_info.innerHTML+=
    `<h3>First name: ${personInfo.FNAME}</h3>
<h3>Last name: ${personInfo.LNAME}</h3>
<h3>Email: ${personInfo.EMAIL_ADDRESS}</h3>
<h3>Phone number: ${personInfo.PHONE_NUMBER}</h3>
<h3>Address: ${personInfo.ADDRESS}</h3>`;

const img = document.querySelector('.profile_img');
img.innerHTML+= `<img src="${personInfo.PICTURE}" alt="Profile_picture">`
