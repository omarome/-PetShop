'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements

const ul = document.querySelector('ul');


// create cat cards
const createCatCards = (pets) => {
  // clear ul
  ul.innerHTML = '';
  pets.forEach((pet) => {

    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/' + pet.filename;
    img.alt = pet.breed;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = `Title:${pet.title}`;

    const p1 = document.createElement('p');
    p1.innerHTML = `Price: ${pet.price}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Breed: ${pet.breed}`;




    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    ul.appendChild(li);
  });
};

// AJAX call
const getPet = async () => {
  try {
    const response = await fetch(url + '/pet/');
    const pets = await  response.json();

    createCatCards(pets);

  }
  catch (e) {
    console.log(e.message);
  }
};
getPet();


