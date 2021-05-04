const change_pet_info = document.querySelector('#change_pet_info');
const url = 'http://localhost:3000'
const change_pet_info_form = document.querySelector('#change_pet_info');

const changePetInfo = (pet) =>{
change_pet_info.innerHTML =  `
            <form id = change_user_info enctype="multipart/form-data">
                <label for="title">Title</label>
                <input type="text" id="#" name="title" value="${pet.title}">

                <label for="breed">Breed</label>
                <input type="text" id="#" name="lastname" value="${pet.breed}">
                <label for="price">Price</label>
                <input type="text" id="#" name="email" value="${pet.price}">

                <label for="description">description</label>
                <textarea id="subject" name="subject" style="height:200px">${pet.description}</textarea>

                <input type="submit" value="Submit">
            </form>`
}
const getPetById = async  (id) => {

  try{

    const petResponse = await fetch(url+`/pet/${id}`);
    const pet = await petResponse.json();
    changePetInfo(pet);

    const userResponse = await fetch(url +`/user/${pet.user_id}`)
    const user = await userResponse.json();
    // createOwner(user);

    const commentsResponse= await fetch(url +`/comment/${pet.pet_id}`)
    const comments = await commentsResponse.json();
    // allPetComments(comments);


    const viewedResponse = await  fetch(url+`/view/${pet.pet_id}`);
    const viewed = await viewedResponse.json();
    // createViewedCount(viewed);

  }
  catch (e) {
    console.log(e.message);
  }
};
getPetById(1);

change_pet_info_form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(change_pet_info_form);
  const fetchOptions = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },      //'Content-Type': 'application/x-www-form-urlencoded',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  const response = await fetch(url + '/pet/1', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  location.reload();
  alert('pet info changed');

});