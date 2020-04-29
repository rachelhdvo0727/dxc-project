import { gsap } from "gsap";
import { intro } from "./js_modules/intro";
import { landing } from "./js_modules/landing";
require("@babel/polyfill");
window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  landing();
  intro();
}
