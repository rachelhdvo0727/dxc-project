import { endpoint1, apiKey1, form2, formElms, elms, signinSec, welcomeSec, form } from "./settings";
import { gsap } from "gsap";
require("@babel/polyfill");

export function signinForm() {
  form2.setAttribute("novalidate", true);
  setupForm();
  document.querySelector("#submit2").addEventListener("click", (evt) => {
    evt.preventDefault();
    checkInputsValue();
  });

  function checkInputsValue() {
    let validForm = true;
    console.log(form2.elements.email.checkValidity());
    if (form2.elements.email.checkValidity()) {
      getEmailFromDB(form2.elements.email.value, doesEmailExist);
    } else {
      console.log("error");
      document.querySelector("#form2 #email").classList.add("invalid");
      document.querySelector("#emailErrorForm2").textContent = "Please check your email again";
    }
  }

  function getEmailFromDB(email, callback) {
    console.log(email);
    //fetch data using id
    fetch(`${endpoint1}?q={"workemail":"${email}"}`, {
      method: "get",
      headers: {
        accept: "application/json",
        "x-apiKey": apiKey1,
        "cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => callback(data));

    //populate form
    //handle submits
    //remove eventhandler and adding eventhandler
  }

  function doesEmailExist(data) {
    console.log(data);

    if (data.length > 0) {
      localStorage.setItem("email", form2.elements.email.value);
      window.location.href = "intro.html";
    } else {
      document.querySelector("#form2 #email").classList.add("invalid");
      document.querySelector("#emailErrorForm2").textContent = "Sorry, but we couldn't find you in our database. Try another e-mail or go back to sign up.";
    }
  }

  function postInfo(data) {
    const postData = JSON.stringify(data);
    fetch(endpoint2, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": apiKey2,
        "cache-control": "no-cache",
      },
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWelcome(data.first_name, data.last_name, data.email);
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
  function showWelcome(first, last, mail) {
    console.log("welcome");
    welcomeSec.classList.remove("hidden");
    signinSec.classList.add("hidden");
    document.querySelector(".back2").classList.add("hidden");
    document.querySelector("#submit2").classList.add("hidden");
    setTimeout(redirectToAssetPage(first, last, mail), 2000);
  }
  function redirectToAssetPage(first, last, mail) {
    console.log("redirect");
    let userStr = JSON.stringify([first, last, mail]);
    //TODO: link to the correct asset.html file 👇🏽
    location.href = "intro.html";
    localStorage.setItem("user", userStr);
  }
}
