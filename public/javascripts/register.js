let btnSignUp = document.getElementById('signup');

function submitForm (formData) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {alert (formData)};
  xhr.open('post', '/register', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  console.log(formData.get('username'));
  xhr.send(formData);
  return false;
}

/* btnSignUp.onclick = function (e) {
  let formData = new FormData(document.getElementById('reg-form'));
  // let sendData = JSON.parse(formData);
  // //console.log(formData.get('username'));
  // submitForm(sendData);
   if (formData.get('password') !== formData.get('confirmPassword')){
     e.preventDefault();
    alert("Passwords must be similiar!");
  }

}; */
