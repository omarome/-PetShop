'use strict';
//this section is copied from omar
const picArray = [
  {
    'title': 'Cat',
    'price': '1000€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic1.png',
  },
  {

    'title': 'Dog',
    'price': '800€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic2.png',
  },
  {
    'title': 'Puppy',
    'price': '990€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic3.png',
  },
  {
    'title': 'Cat',
    'price': '1000€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic1.png',
  },
  {

    'title': 'Dog',
    'price': '800€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic2.png',
  },
  {
    'title': 'Puppy',
    'price': '990€',
    'breed': 'Breed',
    'location': 'Address',
    'viewbtn': 'View',
    'filename': 'img/pic3.png',
  },
];

const grid = document.querySelector('.grid-col1');

picArray.forEach((file) => {

  const h2 = document.createElement('h2');
  const figure = document.createElement('figure');
  const price = document.createElement('div');
  price.className = 'price';
  const h3 = document.createElement('h3');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');

  button.style.textTransform = 'uppercase';
  button.style.padding = '8px 24px';
  button.style.marginLeft = '10px';
  button.style.marginBottom = '15px';

  h2.innerText = file.title;
  price.innerText= file.price;
  p.innerText = file.location;
  button.innerText = file.viewbtn;
  h3.innerText = file.breed;

  img.src = file.filename;
  img.alt = file.title;

  figure.appendChild(h2);
  figure.appendChild(img);
  figure.appendChild(h3);
  figure.appendChild(price);
  figure.appendChild(p);
  figure.appendChild(button);

  //main.appendChild(article);
  grid.appendChild(figure);
});
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