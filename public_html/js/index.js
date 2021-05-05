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
    const a= document.createElement('a');
    a.href="pet-page.html"
    viewButton.appendChild(a);
    //styling the viewButton
    viewButton.innerText = 'More Info';
    viewButton.style.textTransform = 'uppercase';
    viewButton.style.padding = '8px 24px';
    viewButton.style.fontWeight = 'bold';
    viewButton.style.marginLeft = '10px';
    viewButton.style.marginBottom = '15px';
    viewButton.className="viewButton";
    //routing to the details page through the viewButton

    viewButton.addEventListener("click", evt=>{

      document.location.href = 'pet-page.html?id='+ pet.pet_id;

    });

    figure.appendChild(h2);
    figure.appendChild(img);
    figure.appendChild(h3);
    figure.appendChild(price);
    figure.appendChild(viewButton);
    grid.append(figure);
  });
};

//the start for category dropdown menu(dogs,cats, all)
 window.categoryFun = async (option)=> {

   //pet/${id}

  if (option.value === 'dog') {

       const response = await fetch(url + `/pet?sort=${option.value}`);
       const pets = await response.json();
       grid.innerHTML= "";
       createPetCards(pets);
   }  else if (option.value === 'cat') {

     const response = await fetch(url +`/pet?sort=${option.value}`);
     console.log(`by category  cat `)
     const pets = await response.json();
     grid.innerHTML= "";
     createPetCards(pets);

   }
   else if (option.value === '') {

     const response = await fetch(url +`/pet?sort=${option.value}`);
     console.log(`by category dog `)
     const pets = await response.json();
     grid.innerHTML= "";
     createPetCards(pets);

   }
 }
// the code ends  for category dropdown menu(dogs,cats, all) here

// AJAX call
const getPet = async  () => {

  try{

    const response = await fetch(url +`/pet?sort=`);
    console.log(`by category  `)
    const pets = await response.json();
    createPetCards(pets);
  }
  catch (e) {
    console.log(e.message);
  }
};
getPet();


// Price slider start
const slideValue = document.querySelector(".first_stp");
const inputSlider = document.querySelector(".range_val");
inputSlider.oninput = (() => {
  let value = inputSlider.value;
  slideValue.textContent = value;

  window.filterByPrice = async (price)=> {
    price.value = value;

    if (price.value <= 'price') {

      const response = await fetch(url + `/pet?sort=${price.value}`);
      const pets = await response.json();
      grid.innerHTML = "";
      createPetCards(pets);
    } else {
      console.log("not found");
    }
  }

  // exports.items = function(){
  //   return list.sort(function(a, b) {
  //     return a.price - b.price;
  //   })
  // };
});

// PopUp login

document.querySelector("#show-login").addEventListener("click",()=>{
  document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",()=>{
  document.querySelector(".popup").classList.remove("active");
});

