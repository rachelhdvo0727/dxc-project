import { gsap } from "gsap";
export function burgermenuHandler() {
  console.log("burgermenu js");

  let menulist = document.querySelector(".menulist");
  const bgElms = document.querySelectorAll("article, #logo");
  const menuicon = document.querySelector("#menu_container");

  menuicon.addEventListener("click", toggleMenu);
  document.querySelectorAll(".menulist a").forEach((elm) => {
    elm.addEventListener("click", toggleMenu);
  });

  function toggleMenu() {
    console.log("Toggle");
    document.querySelector("#menu").classList.toggle("hidden");
    let menuHidden = document.querySelector("#menu").classList.contains("hidden");
    if (menuHidden === true) {
      hideOverlay();
      menuicon.classList.remove("change");
      document.querySelector(".menu").textContent = "MENU";
    } else {
      addOverlay();
      menuicon.classList.add("change");
      document.querySelector(".menu").textContent = "CLOSE";
    }
  }

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
  function animationBurger() {
    menuicon.classList.toggle("change");
  }
}
