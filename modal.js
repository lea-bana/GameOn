function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalOk = document.querySelector(".modalConfirmation");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const submitBtn = document.querySelector(".btn-submit");

//DOM Elements for each inputs
const inputName = document.getElementById("first");
const inputLastName = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputCheckbox1 = document.getElementById("checkbox1");
const signInForm = document.getElementById("signinform");
const inputCheckLocation = document.getElementsByName("location");

//UTILS / REGEXP / VAR

const regexBirth = new RegExp("([0-9]{4})-([0-9]{2})-([0-9]{2})");
var re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//LISTENERS

inputName.addEventListener("focusout", (event) => {
  testInputText(event.target);
});

inputLastName.addEventListener("focusout", (event) => {
  testInputText(event.target);
});

inputEmail.addEventListener("focusout", (event) => {
  testInputEmail(event.target);
});

inputBirthdate.addEventListener("focusout", (event) => {
  testInputBirthdate(event.target);
});

inputQuantity.addEventListener("focusout", (event) => {
  testInputQuantity(event.target);
});

signInForm.addEventListener("submit", checkform);

//FUNCTIONS

// close modal form
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form & modal Confirmation
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
submitBtn.addEventListener("click", launchModal);

// launch modal
function launchModal() {
  modalbg.style.display = "block";
}

//closeModal form & Confirmation
function closeModal(event) {
  let modal = event.target.closest(".bground");
  modal.style.display = "none";
}

//function to show the error message on the event's target

function showErrorMessage(target, errorMessage) {
  let divError = target.querySelector(".errorMessage");

  if (!divError) {
    divError = document.createElement("div");
    divError.classList.add("errorMessage", "errorVisible");
    divError.innerHTML = errorMessage;
    target.appendChild(divError);
  }
}

//function to hide the error message

function hideErrorMessage(target) {
  let divError = target.querySelector(".errorMessage");
  if (divError) {
    divError.remove();
  }
}

//function to show the red border's input when an error occured

function showInputError(target) {
  target.classList.add("borderError");
}

//function to hide the red border's input when it's ok

function hideInputError(target) {
  target.classList.remove("borderError");
}

//IMPLEMENT FORM DATAS

// function to test if the name and the lastname are less than 2 characters

function testInputText(input) {
  let value = input.value;
  let parent = input.parentNode;
  if (value.length < 2) {
    showErrorMessage(
      parent,
      "Veuillez entrer 2 caractères ou plus pour ce champ."
    );
    showInputError(input);
    return false;
  } else {
    hideErrorMessage(parent);
    hideInputError(input);
    return true;
  }
}

//function to test, if email doesn't correspond to regexp -> error

function testInputEmail(input) {
  let value = input.value;
  let parent = input.parentNode;

  if (re.test(value) == false) {
    showErrorMessage(parent, "Veuillez entrer un email valide");
    showInputError(input);
    return false;
  } else {
    hideErrorMessage(parent);
    hideInputError(input);
    return true;
  }
}

// function to test, if birhtdate  doesn't correspond to regexp => error

function testInputBirthdate(input) {
  let parent = input.parentNode;
  if (regexBirth.test(input.value) == false) {
    showErrorMessage(parent, "Veuillez entrer votre date de naissance");
    showInputError(input);
    return false;
  } else {
    hideErrorMessage(parent);
    hideInputError(input);
    return true;
  }
}

// function to test, if this input.value is empty or its value is not a number => error

function testInputQuantity(input) {
  let value = input.value;
  let parent = input.parentNode;
  if (value === "" || isNaN(quantity.value)) {
    showErrorMessage(parent, "Veuillez entrer un nombre");
    showInputError(input);
    return false;
  } else {
    hideErrorMessage(parent);
    hideInputError(input);
    return true;
  }
}

/*function to test if quantity.value > 0 and one of the radio btn option is not checked => error
Or if quantity.value = 0 no option needs to be checked*/

function testInputRadio(input, expectedValue) {
  let parent = input[0].parentNode;
  let isChecked = false;
  for (let index = 0; index < input.length; index++) {
    const currentInput = input[index];
    if (currentInput.checked) {
      isChecked = true;
      break;
    }
  }
  if (isChecked == expectedValue) {
    hideErrorMessage(parent);
    return true;
  } else {
    showErrorMessage(parent, "Veuillez choisir une option");
    return false;
  }
}

//if the checkbox conditions is not checked => error

function testInputConditions(input) {
  let parent = input.parentNode;

  if (!input.checked) {
    showErrorMessage(parent, "Veuillez accepter les conditions d'utilisation");
    showInputError(input);
    return false;
  } else {
    hideErrorMessage(parent);
    hideInputError(input);
    return true;
  }
}
// function called at form submit event

function checkform(event) {
  event.preventDefault(); // default behavior of submit event is avoided
  let isError = false;

  if (!testInputText(inputName)) {
    isError = true;
  }
  if (!testInputText(inputLastName)) {
    isError = true;
  }
  if (!testInputEmail(inputEmail)) {
    isError = true;
  }
  if (!testInputBirthdate(inputBirthdate)) {
    isError = true;
  }
  if (!testInputQuantity(inputQuantity)) {
    isError = true;
  }

  /**if quantity.value > 0 and one of the option is not checked => error
Or if quantity.value = 0 no option needs to be checked  */
  let expectedValue = false;
  if (inputQuantity.value > 0) {
    expectedValue = true;
  }
  if (!testInputRadio(inputCheckLocation, expectedValue)) {
    isError = true;
  }

  if (!testInputConditions(inputCheckbox1)) {
    isError = true;
  }

  if (isError == true) {
    console.log("erreur(s) dans le formulaire");
  } else {
    console.log("OK"); //all inputs must be true (isError=false) so the form can be submitted correctly
    modalbg.style.display = "none";
    modalOk.style.display = "block";
  }
}
