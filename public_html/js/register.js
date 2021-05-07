const url = 'https://localhost:8000'; // change url when uploading to server

//add user  --registration
const addUserForm= document.querySelector('#reg-user-form');
const reqSubmitBtn= document.querySelector('#reg-submit-btn');


// submit register form
addUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user add response', json);
  // save token
  sessionStorage.setItem('token', json.token);

});

