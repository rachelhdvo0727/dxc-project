import { gsap } from "gsap";
export function burgermenuHandler() {
  console.log("burgermenu js");

  let menulist = document.querySelector(".menulist");
  const bgElms = document.querySelectorAll("article, #logo");
  const menuicon = document.querySelector("#burger_icon");

  menuicon.addEventListener("click", (evt) => {
    menulist.classList.toggle("hidden");
    let menuHidden = document
      .querySelector(".menulist")
      .classList.contains("hidden");
    if (menuHidden === true) {
      hideOverlay();
    } else {
      addOverlay();
      disableScroll();
    }
  });
  function addOverlay() {
    bgElms.forEach((elm) => {
      elm.classList.add("overlay");
    });
  }
  function hideOverlay() {
    bgElms.forEach((elm) => {
      elm.classList.remove("overlay");
    });
  }
}
