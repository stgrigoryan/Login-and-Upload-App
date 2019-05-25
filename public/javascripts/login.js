let btnSignUp = document.getElementById("signup");
let bntSignIn = document.getElementById("login-form");

let formData = new FormData(document.getElementById("login-form"));

function submitForm(username, password) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    alert("Succes");
  };
  const obj = { username, password };
  xhr.open("POST", "/login", true);
  //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(obj));
  return false;
}

btnSignUp.onclick = function() {
  window.location.href = "/register";
};

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username, password);
//   //submitForm(username, password);

//   // const config = {
//   //   headers: { "content-type": "application/x-www-form-urlencoded" }
//   // };

//   /* axios
//     .post("/login", {
//       username: username,
//       lastName: password
//     })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(error) {
//       console.log(error);
//     }); */

//     axios.post('/login', { username, password })  ;
// };
