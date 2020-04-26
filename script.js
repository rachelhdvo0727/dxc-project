require("@babel/polyfill");
import { gsap } from "gsap";
import { intro } from "./js_modules/intro";
import { burgermenuHandler } from "./js_modules/burgermenu";
window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  intro();
  burgermenuHandler();
}
