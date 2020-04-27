"use strict";

window.addEventListener("load", init);

const endpoint =
  "https://frontendspring20-67be.restdb.io/rest/dxc-technology?max=6";
const apiKey = "5e95767d436377171a0c2333";

function init() {
  getData();
  console.log("function started");
}

function getData() {
  const data = fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(handleData);
  console.log("getting data");
}

function handleData(myData) {
  myData.forEach(showBenefits);
}

function showBenefits(post) {
  const template = document.querySelector("#benefitTemplate").content;
  const copy = template.cloneNode(true);
  const img = copy.querySelector(".benefit-img img");
  copy.querySelector(".benefit").textContent = post.benefits;
  img.setAttribute(
    "src",
    `https://frontendspring20-67be.restdb.io/media/${post.benefits_img}`
  );
  copy.querySelector(".benefit").addEventListener("click", () => {
    fetch(
      `https://frontendspring20-67be.restdb.io/rest/dxc-technology/${post._id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": apiKey,
          "cache-control": "no-cache",
        },
      }
    )
      .then((res) => res.json())
      .then(openModal);
    console.log(post);
  });
  document.querySelector(".section1-bottom-right").appendChild(copy);
}

function openModal(modal) {
  document.querySelector("#modal-bg").classList.remove("hide");
  document.querySelector("#modal-container").classList.remove("hide");
  document.querySelector(".benefits-description").textContent =
    modal.benefits_description;
  document.querySelector(".close").addEventListener("click", closeModal);
  console.log(modal);
}
function closeModal() {
  document.querySelector("#modal-bg").classList.add("hide");
  document.querySelector("#modal-container").classList.add("hide");
}
