window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("#scroll_box").addEventListener("scroll", scrolling);
}

function scrolling() {
  let scrollContainer = document.querySelector("#scroll_box");
  let ratio = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight);
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