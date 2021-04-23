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
];

const main = document.querySelector('main');

picArray.forEach((file) => {

  const gridCol1 = document.createElement('div');
  gridCol1.className = 'grid-col1';
  const gridCol2 = document.createElement('div');
  gridCol2.className = 'grid-col2';
  const article = document.createElement('article');
  const header = document.createElement('header');
  const h2 = document.createElement('h2');
  const figure = document.createElement('figure');
  const price = document.createElement('div');
  price.className = 'price';
  const h3 = document.createElement('h3');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');

  h2.innerText = file.title;
  price.innerText= file.price;
  p.innerText = file.location;
  button.innerText = file.viewbtn;
  h3.innerText = file.breed;

  img.src = file.filename;
  img.alt = file.title;

  gridCol1.appendChild(article);
  header.appendChild(h2);
  figure.appendChild(img);
  figure.appendChild(header);
  figure.appendChild(h3);
  figure.appendChild(price);
  figure.appendChild(p);
  figure.appendChild(button);
  article.appendChild(header);
  article.appendChild(figure);

  //main.appendChild(article);
  main.appendChild(gridCol1);
  main.appendChild(gridCol2);
});

