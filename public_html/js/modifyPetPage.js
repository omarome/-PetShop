// const change_pet_info = document.querySelector('#change_pet_info');
const url = 'http://localhost:3000';
const change_pet_info_form = document.querySelector('#change_pet_info_form');


// NEW CODE 06.05.2021


// END



const changePetInfo = (pet) =>{
change_pet_info_form.innerHTML =  `
                <input name="pet" type="file" value = "${pet.image}">
                <label class="title" for="title">Tittle</label>
                <input type="text" name="title" value="${pet.title}">
                <label for="birthdate">Birthdate</label>
                <input type="date" name="birthdate">
                <label for="breed">Breed</label>
                <input type="text" name="breed" value="${pet.breed}">
                <label for="price">Price</label>
                <input type="text" name="price" value="${pet.price}">
                <label for="description">description</label>
                <textarea id="subject" name="description" style="height:200px">${pet.description}</textarea>
                <input type="submit" value="Submit">
`
}
const getPetById = async  (id) => {

  try{

    const petResponse = await fetch(url+`/pet/${id}`);
    const pet = await petResponse.json();
    changePetInfo(pet);

    // const userResponse = await fetch(url +`/user/${pet.user_id}`)
    // const user = await userResponse.json();
    // // createOwner(user);
    //
    // const commentsResponse= await fetch(url +`/comment/${pet.pet_id}`)
    // const comments = await commentsResponse.json();
    // // allPetComments(comments);
    //
    //
    // const viewedResponse = await  fetch(url+`/view/${pet.pet_id}`);
    // const viewed = await viewedResponse.json();
    // // createViewedCount(viewed);



  }
  catch (e) {
    console.log(e.message);
  }
};
getPetById(1);

change_pet_info_form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const fd = new FormData(change_pet_info_form)

  console.log("change_pet_info_form", change_pet_info_form);

  fd.append("petId", change_pet_info_form.getAttribute("id"))

  console.log("FD type", typeof fd);

  console.log("all of fd", fd);

  const fetchOptions = {
    method: 'PUT',
    body: fd // body data type must match "Content-Type" header
  };
  const response = await fetch(url + '/pet/1', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  location.reload();
  alert('pet info changed');

});