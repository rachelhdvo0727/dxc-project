require("@babel/polyfill");
import { gsap } from "gsap";
import { signinForm } from "./signin-form";

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  signinForm();
}
