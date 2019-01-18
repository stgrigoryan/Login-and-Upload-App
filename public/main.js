let btnSignUp = document.getElementById('signup');

let formData = new FormData(document.getElementById('reg-form'));

function submitForm (formData) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {alert (formData)};
  xhr.open(post, action, true);
  xhr.send(formData);
  return false;
}

btnSignUp.onclick = function () {
  window.location.href='signup.html';
  submitForm(formData);
};
