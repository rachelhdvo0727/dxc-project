import { gsap } from "gsap";
// import { intro } from "./js_modules/intro";
import { landing } from "./js_modules/landing";
// import { sections } from "./js_modules/sections";
import { signupForm } from "./js_modules/form";
import { signinForm } from "./js_modules/signin-form";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  landing();
  clickSignUp();
  clickSignIn();
}
function clickSignUp() {
  document.querySelector("#signup").addEventListener("click", (evt) => {
    //document.querySelector("#form-container").style.display = "block";
    document.querySelector("#form-container").classList.remove("hidden");
    document.querySelector("#form-container").classList.add("slide_in");
    document.querySelector("#sign_up").classList.add("slide_out");
    document.querySelector(".next").classList.remove("hide");
    document.querySelector(".back").classList.remove("hidden");
    if (window.innerWidth <= "400") {
      document.querySelector("#scroll_box").style.zIndex = "999";
    }
    //hide sign-up article after sliding out
    let slideOutMobile = document
      .querySelector("#sign_up")
      .classList.contains("slide_out");
    let formshown = document
      .querySelector("#form-container")
      .classList.contains("hidden");
    if (slideOutMobile && window.innerWidth < 400 && formshown === false) {
      document.querySelector("#sign_up").style.display = "none";
      // document.body.style.overflowX = "hidden";
    }
    // if (window.innerWidth < "950") {
    //   document.querySelector("#scroll_box").style.top = "600px";
    //   document.querySelector("#dot_container").style.top = "800px";
    // }
  });
  signupForm();
}
function clickSignIn() {
  document.querySelector(".sign-in-link").addEventListener("click", (evt) => {
    document.querySelector("#form-container2").classList.remove("hidden");
    document.querySelector("#form-container2").classList.add("slide_in");
    document.querySelector("#sign_up").classList.add("slide_out");
    document.querySelector(".back2").classList.remove("hidden");
    document.querySelector("#submit2").classList.remove("hidden");
    document.querySelector(".back2").addEventListener("click", goBackToLanding);
  });
  signinForm();
}

function goBackToLanding() {
  window.location.reload();
}
