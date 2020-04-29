import { gsap } from "gsap";
require("@babel/polyfill");
export function landing() {
  startLanding();

  function startLanding() {
    //document.querySelector("#scroll_box").addEventListener("scroll", scrolling);
    document.querySelector("button").addEventListener("click", showQuotes);
  }
  function scrolling() {
    let scrollContainer = document.querySelector("#scroll_box");
    let ratio =
      scrollContainer.scrollTop /
      (scrollContainer.scrollHeight - scrollContainer.clientHeight);
    console.log(ratio);

    if (ratio < "0.333333") {
      document.querySelector("#dot1").classList.add("filled");
      document.querySelector("#dot2").classList.remove("filled");
      document.querySelector("#dot3").classList.remove("filled");
    }

    if (ratio < "0.66666" && ratio > "0.333333") {
      document.querySelector("#dot1").classList.remove("filled");
      document.querySelector("#dot2").classList.add("filled");
      document.querySelector("#dot3").classList.remove("filled");
    }

    if (ratio > "0.66666") {
      document.querySelector("#dot1").classList.remove("filled");
      document.querySelector("#dot2").classList.remove("filled");
      document.querySelector("#dot3").classList.add("filled");
    }
  }

  function showQuotes() {
    document.querySelector("#intro_txt").classList.add("hide");
    document.querySelector("#quotes").classList.remove("hide");
    document.querySelector("#quotes").classList.add("slide_in");
    document.querySelector("#dot_container").classList.remove("hidden");
  }
}
