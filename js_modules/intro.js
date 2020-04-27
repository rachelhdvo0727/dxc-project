import { gsap } from "gsap";
import { burgermenuHandler } from "./burgermenu";
export function intro() {
  console.log("introduction");
  burgermenuHandler();
  getData();

  const endpoint =
    "https://frontendspring20-67be.restdb.io/rest/dxc-technology";
  const apiKey = "5e95767d436377171a0c2333";

  function getData() {
    fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
    })
      .then((e) => e.json())
      .then(showData);
  }
  function showData(data) {
    data.forEach();
    console.log(data);
  }
  // function showIntroOne(txt) {
  //   // const display = document.querySelector("#introtext_1");
  //   // const clone = pattern.cloneNode(true);
  //   // const pattern = document.querySelector("template#testing").content;
  //   // clone.querySelector(".intro_txt1").textContent = txt.intro_text;
  //   console.log(txt);
  //   // display.appendChild(clone);
  // }
}
