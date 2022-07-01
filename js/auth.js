const URL = "https://n36-todolist.herokuapp.com";
const signUpLink = document.querySelector(".sign-up__link");
const signInLink = document.querySelector(".sign-in__link");
//Sign UP
const elSignUpModal = document.querySelector(".sign-up");
const elSignUpName = document.querySelector(".sign-up__user-name");
const elSignUpPassword = document.querySelector(".sign-up__user-password");
//Sign IN

const elLoginModal = document.querySelector(".sign-in");
const elLoginName = document.querySelector(".sign-in__user-name");
const elLoginPassword = document.querySelector(".sign-in__user-password");

//visibiltyON
const elToggle = document.querySelector("#toggle-password");
const elClosed = document.querySelector(".first");
const elOpen = document.querySelector(".second");
const elInput = document.querySelector("#password");

let isPasswordOn = true;

elToggle.addEventListener("click", function () {
  if (!isPasswordOn) {
    elInput.type = "text";
    elClosed.classList.add("hide");
    elOpen.classList.remove("hide");
  } else {
    elInput.type = "password";
    elClosed.classList.remove("hide");
    elOpen.classList.add("hide");
  }
  isPasswordOn = !isPasswordOn;
});
//VisibilityIN
const elToggleIn = document.querySelector("#toggle-password2");
const elClosedIn = document.querySelector(".eye-off");
const elOpenIn = document.querySelector(".eye-on");
const elInputIn = document.querySelector("#password1");

let isPasswordOnIn = true;

elToggleIn.addEventListener("click", function () {
  if (!isPasswordOnIn) {
    elInputIn.type = "text";
    elClosedIn.classList.add("hidden");
    elOpenIn.classList.remove("hidden");
  } else {
    elInputIn.type = "password";
    elClosedIn.classList.remove("hidden");
    elOpenIn.classList.add("hidden");
  }
  isPasswordOnIn = !isPasswordOnIn;
});


signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("auth-body--sign-up");
  document.body.classList.add("auth-body--sign-in");
});
signInLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("auth-body--sign-up");
  document.body.classList.remove("auth-body--sign-in");
});
(function () {
  fetch("https://n36-todolist.herokuapp.com");
});

//SIGN UP
async function Register(user) {
  const response = await fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", JSON.stringify(data.token));
    location.pathname = "index.html";
  } else {
    location.pathname = "auth.html";
  }
}

elSignUpModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    userName: elSignUpName.value.trim(),
    userPassword: elSignUpPassword.value.trim(),
  };
  Register(data);
});

//LOGIN
async function Login(user) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", JSON.stringify(data.token));
    location.pathname = "index.html";
  } else if ((data.token = undefined)) {
    location.pathname = "auth.html";
  }
}
elLoginModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    login: elLoginName.value.trim(),
    password: elLoginPassword.value.trim(),
  };
  Login(data);
});
