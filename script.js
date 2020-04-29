import { gsap } from "gsap";
import { intro } from "./js_modules/intro";
import { landing } from "./js_modules/landing";
import { sections } from "./js_modules/sections";
import { signupForm } from "./js_modules/form";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  landing();
  signupForm();
  intro();
  sections();
}
