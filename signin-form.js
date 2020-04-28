import {
  endpoint,
  apiKey,
  form,
  formElms,
  elms,
  signinSec,
  welcomeSec,
} from "./settings";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

function start() {
  form.setAttribute("novalidate", true);
  setupForm();
  document.querySelector("#submit").addEventListener("click", (evt) => {
    evt.preventDefault();
    checkInputsValue();
  });
}
function checkInputsValue() {
  let validForm = true;
  if (form.checkValidity() && validForm) {
    postInfo({
      first_name: elms.firstname.value,
      last_name: elms.lastname.value,
      email: elms.email.value,
    });
    form.reset();
    showWelcome();
  } else {
    console.log("error messages");
    formElms.forEach((elm) => {
      elm.classList.remove("invalid");
      if (!elm.checkValidity()) {
        elm.classList.add("invalid");
      }
    });
    correctInputs();
  }
}
function postInfo(data) {
  const postData = JSON.stringify(data);
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
    .then((data) => {
      console.log(data);
      showWelcome();
    });
}
function setupForm() {
  console.log("no error messages");
  formElms.forEach((elm) => {
    elm.classList.remove("invalid");
    if (elm.checkValidity()) {
      elm.classList.add("invalid");
    }
  });
}
function correctInputs() {
  console.log("correct inputs");
  formElms.forEach((elm) => {
    elm.addEventListener("keyup", () => {
      elm.classList.remove("invalid");
    });
  });
}
function showWelcome() {
  console.log("welcome");
  welcomeSec.classList.remove("hide");
  signinSec.classList.add("hide");
  document.querySelector(".back").classList.add("hide");
  document.querySelector("#submit").classList.add("hide");
  //goToAssetPage();
}
