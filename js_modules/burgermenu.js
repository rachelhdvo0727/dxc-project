import { gsap } from "gsap";
export function burgermenuHandler() {
  console.log("burgermenu js");
  let menulist = document.querySelector(".menulist");
  const articlesBg = document.querySelectorAll("article");

  document.querySelector("#burger_icon").addEventListener("click", (evt) => {
    menulist.classList.toggle("hidden");
    let menuHidden = document
      .querySelector(".menulist")
      .classList.contains("hidden");
    if (menuHidden === true) {
      hideOverlay();
    } else {
      addOverlay();
    }
  });
  function addOverlay() {
    articlesBg.forEach((elm) => {
      elm.classList.add("overlay");
    });
  }
  function hideOverlay() {
    articlesBg.forEach((elm) => {
      elm.classList.remove("overlay");
    });
  }
}
