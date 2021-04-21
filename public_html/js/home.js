'use strict';
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
