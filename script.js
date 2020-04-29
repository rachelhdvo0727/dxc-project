import { gsap } from "gsap";
import { intro } from "./js_modules/intro";
import { landing } from "./js_modules/landing";
import { sections } from "./js_modules/sections";
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

    if (window.innerWidth < "950") {
      document.querySelector("#scroll_box").style.top = "600px";
      document.querySelector("#dot_container").style.top = "800px";
    }
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

    if (window.innerWidth < "950") {
      document.querySelector("#scroll_box").style.top = "600px";
      document.querySelector("#dot_container").style.top = "800px";
    }
  });
  signinForm();
}
