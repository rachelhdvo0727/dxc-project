import { gsap } from "gsap";
import { intro } from "./js_modules/intro";
// import { landing } from "./js_modules/landing";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // landing();
  intro();
  sections();
  getSvg("svgs/sixfactors.svg", placeSVG);
}

function placeSVG(svg) {
  console.log("placeSvg");
  document.querySelector(".factors_img").innerHTML = svg;
  document.querySelectorAll("#poly1-2, #poly2-2, #poly3-2, #poly4-2, #poly5-2, #poly6-2").forEach((elm) => {
    elm.addEventListener("mouseover", mouseOverPoly);
    elm.addEventListener("mouseout", mouseOutPoly);
  });

  document.querySelectorAll(".factors_img g").forEach((elm) => {
    elm.addEventListener("mouseover", mouseOverG);
    elm.addEventListener("mouseout", mouseOutG);
  });
}

function mouseOverPoly(e) {
  console.log(e.target);
  e.target.style.fill = "#ffed00";
  console.log(e.target.id);
  document.querySelector(`#${e.target.id}-2`).style.stroke = "#000000";
  document.querySelector(`#${e.target.id}-2`).style.fill = "#000000";
}

function mouseOutPoly(e) {
  e.target.style.fill = "#000000";
  document.querySelector(`#${e.target.id}-2`).style.stroke = "#ffffff";
}

function mouseOverG(e) {
  console.log(e.target);
  document.querySelectorAll(`#${e.target.id}`).forEach((elm) => {
    elm.style.fill = "#000000";
  });
  document.querySelectorAll(`#${e.target.id}`).style.stroke = "#000000";
  console.log(e.target.id);
  const polyId = e.target.id.slice(0, e.target.id.length - 2);
  console.log(polyId);
  document.querySelector(`#${polyId}`).style.stroke = "#000000";
  document.querySelector(`#${polyId}`).style.fill = "#000000";
}

function mouseOutG(e) {
  e.target.style.fill = "#000000";
  document.querySelector(`#${e.target.id}-2`).style.stroke = "#ffffff";
}
async function getSvg(filename, callback) {
  let response = await fetch(filename);
  let mySvgData = await response.text();
  callback(mySvgData);
}

function sections() {
  startSections();

  const endpoint = "https://frontendspring20-67be.restdb.io/rest/dxc-technology?max=6";
  const apiKey = "5e95767d436377171a0c2333";

  function startSections() {
    getData();
    console.log("function started");
  }

  function getData() {
    const data = fetch("https://frontendspring20-67be.restdb.io/rest/dxc-technology?max=6", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5e95767d436377171a0c2333",
        "cache-control": "no-cache",
      },
    })
      .then((e) => e.json())
      .then(handleData);
    console.log("getting data");
  }

  function handleData(myData) {
    myData.forEach(showBenefits);
    console.log("handling data");
  }

  function showBenefits(post) {
    const template = document.querySelector("#benefitTemplate").content;
    const copy = template.cloneNode(true);
    const img = copy.querySelector(".benefit-img img");
    copy.querySelector(".benefit").textContent = post.benefits;
    img.setAttribute("src", `https://frontendspring20-67be.restdb.io/media/${post.benefits_img}`);
    copy.querySelector(".benefit").addEventListener("click", () => {
      fetch(`https://frontendspring20-67be.restdb.io/rest/dxc-technology/${post._id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5e95767d436377171a0c2333",
          "cache-control": "no-cache",
        },
      })
        .then((res) => res.json())
        .then(openModal);
      console.log(post);
    });
    document.querySelector(".section1-bottom-right").appendChild(copy);
  }

  function openModal(modal) {
    document.querySelector("#modal-bg").classList.remove("hide");
    document.querySelector("#modal-container").classList.remove("hide");
    document.querySelector(".benefits-description").textContent = modal.benefits_description;
    document.querySelector(".close").addEventListener("click", closeModal);
    console.log(modal);
  }
  function closeModal() {
    document.querySelector("#modal-bg").classList.add("hide");
    document.querySelector("#modal-container").classList.add("hide");
  }
}
