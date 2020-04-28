require("@babel/polyfill");
import { gsap } from "gsap";
import { intro } from "./";

$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});
