const url = 'https://localhost:8000'; // change url when uploading to server

const addPetForm = document.querySelector('#add-pet-form');
const addPetSubBtn= document.querySelector('#add-pet-btn');

// submit add pet form
addPetForm.addEventListener('submit', async (evt) => {

  evt.preventDefault();
  let fd = new FormData(addPetForm);

  const Options = {
    method: 'POST',

    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),

    },

    body: fd,
  };
  const response = await fetch(url + `/pet`, Options);
  const json = await response.json();
  console.log('add response', json);
  alert('Adding pet succeeded');
  window.location.href = "https://localhost:8000/index.html";

});
