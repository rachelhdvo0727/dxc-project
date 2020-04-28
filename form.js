import {
  endpoint,
  apiKey,
  form,
  company,
  consent,
  yellowChecked,
} from "./settings";
require("@babel/polyfill");
let step = 1;
window.form = form;
// const personal = document.querySelector("#personal input");

const elements = form.elements;
window.elements = elements;
console.log(elements.consent.value);

window.addEventListener("load", start);

function start() {
  getJson(setUp);
}
function checkFieldsets() {
  console.log(step);
  if (step == 1) {
    if (
      form.elements.firstname.checkValidity() &&
      form.elements.lastname.checkValidity() &&
      form.elements.jobtitle.checkValidity()
    ) {
      console.log("valid");
      console.log(personal.checkValidity());
      goToNext();
    } else {
      showError();
    }
  } else if (step == 2) {
    getEmail(form.elements.email.value, doesEmailExist);
    // if (getEmail(form.elements.email.value, doesEmailExist)) {
    //   showError();
    //   console.log("error");
    // } // } else if (form.elements.company.checkValidity() && form.elements.country.checkValidity() && form.elements.email.checkValidity()) {
    //   console.log("valid");
    //   console.log(company.checkValidity());
    //   goToNext();
    // } else {
    //   showError();
    // }
  } else if (step == 3) {
    if (consent.checkValidity()) {
      console.log("valid");
      console.log(company.checkValidity());
      document.querySelector("#submit").addEventListener("click", submit);
    } else {
      showError();
    }
  }
}
//TODO: process bar
function setUp(data) {
  data.forEach(showCountry);
  document.querySelector("#done_signup").classList.add("hide");
  document.querySelector(".takemethere").classList.add("hide");
  document.querySelector("form").setAttribute("novalidate", true);
  document.querySelector(".next").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("steps" + step);
    console.log("submitted");
    const formElements = form.querySelectorAll("input");

    formElements.forEach((el) => {
      if (el.checkValidity()) {
        console.log("delete");
        el.classList.remove("invalid");
      }
    });
    checkFieldsets();
  });
  document.querySelector(".back").addEventListener("click", () => {
    startAgain();
    goBack();
    console.log(step);
  });
}

function showCountry(data) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("option").value = data.Name;

  document.querySelector("#countries").appendChild(clone);
}

async function getJson(callback) {
  let jsonData = await fetch("countries.json");
  let data = await jsonData.json();

  callback(data);
}

function doesEmailExist(data) {
  console.log(data);
  if (data.length > 0) {
    console.log("error");
    document.querySelector("#email").classList.add("invalid");
    document.querySelector("#emailError").textContent =
      "This e-mail address has already been used";
  } else {
    checkStep2();
  }
}
//TODO: checking country input
function checkStep2() {
  if (
    form.elements.company.checkValidity() &&
    form.elements.country.checkValidity() &&
    form.elements.email.checkValidity()
  ) {
    console.log("valid");
    console.log(company.checkValidity());
    goToNext();
  } else {
    document.querySelector("#emailError").textContent =
      "Please provide a real e-mail address";
    showError();
  }
}

function getEmail(email, callback) {
  //fetch data using id
  fetch(`${endpoint}?q={"workemail":"${email}"}`, {
    method: "get",
    headers: {
      accept: "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => callback(data));

  //populate form
  //handle submits
  //remove eventhandler and adding eventhandler
}

// function get() {
//   //fetch data using id
//   fetch(`${endpoint}`, {
//     method: "get",
//     headers: {
//       accept: "application/json",
//       "x-apikey": apiKey,
//       "cache-control": "no-cache",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => callback(email, data));
// }

function submit(e) {
  console.log("submit");
  e.preventDefault();
  if (form.checkValidity()) {
    console.log("ready");
    postUser({
      firstname: form.elements.firstname.value,
      lastname: form.elements.lastname.value,
      jobtitle: form.elements.jobtitle.value,
      company: form.elements.company.value,
      country: form.elements.country.value,
      workemail: form.elements.email.value,
    });
    loadSvg();
    showDoneProcess();
  } else {
    showError();
  }
}

function showError() {
  const formElements = form.querySelectorAll("input");
  formElements.forEach((el) => {
    if (!el.checkValidity()) {
      el.classList.add("invalid");
    }
  });
}
function postUser(data) {
  //   form.reset();
  const postData = JSON.stringify(data);
  console.log(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
//TODO: authentication
function showDoneProcess() {
  console.log("done sign up");
  //hide back button at step 1
  document.querySelector(".back").classList.add("hide");
  document.querySelector("#consent-label").classList.add("hide");
  document.querySelector("#submit").classList.add("hide");
  document.querySelector("#done_signup").classList.remove("hide");
  document.querySelector(".takemethere").classList.remove("hide");
  loadSvg();
  useSvg();
}
async function loadSvg() {
  const response = await fetch(yellowChecked);
  const mySVG = await response.text();
  document.querySelector(".svg").innerHTML = mySVG;
}
function useSvg() {
  let checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "use");
  checkSvg.setAttribute("href", "#yellowCheckedDone");
  checkSvg.setAttribute("height", "150px");
  checkSvg.setAttribute("width", "150px");
  checkSvg.setAttribute("x", "80px");
  checkSvg.setAttribute("y", "130px");
  document.querySelector("#checked-svg").appendChild(checkSvg);
}
function goToNext() {
  step++;
  const formElements = form.querySelectorAll("input");
  document.querySelector(".next").removeEventListener("click", goToNext);
  console.log("next");
  console.log(step);
  if (step == 2) {
    document.querySelector("#personal").classList.add("hide");
    document.querySelector("#done_signup").classList.add("hide");
    document.querySelector("#aboutCompany").classList.remove("hide");
    formElements.forEach((el) => {
      if (!el.checkValidity()) {
        console.log("delete");
        el.classList.remove("invalid");
      }
    });
  } else if (step == 3) {
    document.querySelector("#personal").classList.add("hide");
    document.querySelector("#aboutCompany").classList.add("hide");
    document.querySelector("#consent-label").classList.remove("hide");
    document.querySelector(".next").classList.add("hide");
    document.querySelector("#submit").classList.remove("hide");
    document.querySelector("#submit").addEventListener("click", submit);
  }
}
function goBack() {
  document.querySelector(".back").removeEventListener("click", goBack);
  step--;
  if (step === 3) {
    console.log(step);
    //show step 2
    document.querySelector("#aboutCompany").classList.remove("hide");
    document.querySelector(".next").classList.remove("hide");
    //click back and hide step 3 and 1
    document.querySelector("#consent-label").classList.add("hide");
    document.querySelector("#submit").classList.add("hide");
    document.querySelector("#personal").classList.add("hide");
  }
  if (step === 2) {
    console.log(step);
    //show step 2
    document.querySelector("#aboutCompany").classList.remove("hide");
    document.querySelector(".next").classList.remove("hide");
    //hide step 3 and step 1
    document.querySelector("#consent-label").classList.add("hide");
    document.querySelector("#submit").classList.add("hide");
    document.querySelector("#personal").classList.add("hide");
    //while at step 2, click back
    document.querySelector(".back").addEventListener("click", () => {
      step = 1;
      if (step === 1) {
        console.log(step);
        startAgain();
      }
    });
  }
}
function startAgain() {
  console.log("startAgain");
  //show step 1
  document.querySelector("#personal").classList.remove("hide");
  document.querySelector(".next").classList.remove("hide");
  //hide step 2, 3 and 4
  document.querySelector("#aboutCompany").classList.add("hide");
  document.querySelector("#consent-label").classList.add("hide");
  document.querySelector("#submit").classList.add("hide");
  document.querySelector("#done_signup").classList.add("hide");
}
