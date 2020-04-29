import { endpoint1, apiKey1, form } from "./settings";
require("@babel/polyfill");
// let step = 1;
// const personal = document.querySelector("#personal input");

export function signupForm() {
  startForm();
  function startForm() {
    getSvg("svgs/form/progress.svg", svgProgress);
  }

  function svgProgress(svg) {
    document.querySelector("#progress").innerHTML = svg;
    jsonSetUp();
  }

  function jsonSetUp() {
    getJson(setUp);
  }

  function progressbar() {
    let step = document.querySelector("#main-form").dataset.step;
    console.log(step);
    if (step == 1) {
      document.querySelector("#Layer_1 > circle.st1").setAttribute("r", "40.7");
      document.querySelector("#Layer_1 > circle.st1").style.fill = "#ffed00";
      document.querySelector("#Layer_1 > circle:nth-child(5)").style.fill =
        "#818284";

      document
        .querySelector("#Layer_1 > circle:nth-child(5)")
        .setAttribute("r", "35.9");
      document
        .querySelector("#Layer_1 > circle:nth-child(10)")
        .setAttribute("r", "35.9");

      document.querySelector("#nmb1").classList.remove("st3");
      document.querySelector("#nmb2").classList.add("st3");
      document.querySelector("#nmb3").classList.add("st3");
      document.querySelector("#check1").classList.add("st3");

      document.querySelector("#Layer_1 > line:nth-child(2)").style.stroke =
        "#818284";
    }
    if (step == 2) {
      document.querySelector("#Layer_1 > line:nth-child(2)").style.stroke =
        "#ffed00";
      document.querySelector("#Layer_1 > line:nth-child(3)").style.stroke =
        "#818284";
      document.querySelector("#Layer_1 > circle:nth-child(10)").style.fill =
        "#818284";

      document
        .querySelector("#Layer_1 > circle:nth-child(5)")
        .setAttribute("r", "40.7");
      document.querySelector("#Layer_1 > circle:nth-child(5)").style.fill =
        "#ffed00";
      document.querySelector("#nmb1").classList.add("st3");
      document.querySelector("#nmb2").classList.remove("st3");
      document.querySelector("#nmb3").classList.add("st3");
      document.querySelector("#check1").classList.remove("st3");
      document.querySelector("#check2").classList.add("st3");
      document.querySelector("#check3").classList.add("st3");

      // document.querySelector("#Layer_1 > circle.st1").fill = "red";
    }

    if (step == 3) {
      document.querySelector("#Layer_1 > line:nth-child(2)").style.stroke =
        "#ffed00";
      document.querySelector("#Layer_1 > line:nth-child(3)").style.stroke =
        "#ffed00";

      document
        .querySelector("#Layer_1 > circle:nth-child(10)")
        .setAttribute("r", "40.7");
      document.querySelector("#Layer_1 > circle:nth-child(10)").style.fill =
        "#ffed00";

      document.querySelector("#nmb2").classList.add("st3");
      document.querySelector("#nmb3").classList.remove("st3");
      document.querySelector("#check2").classList.remove("st3");
    }
  }

  function checkFieldsets() {
    let step = document.querySelector("#main-form").dataset.step;
    if (step == 1) {
      if (
        form.elements.firstname.checkValidity() &&
        form.elements.lastname.checkValidity() &&
        form.elements.jobtitle.checkValidity()
      ) {
        console.log("valid");
        console.log(personal.checkValidity());
        goToNext();
      } else {
        showError();
      }
    } else if (step == 2) {
      getEmail(form.elements.email.value, doesEmailExist);
    } else if (step == 3) {
      // if (consent.checkValidity()) {
      //   console.log("valid");
      document.querySelector("#submit").addEventListener("click", submit);
      // } else {
      //   showError();
      // }
    }
  }
  //TODO: process bar
  function setUp(data) {
    data.forEach(showCountry);
    document.querySelector("form").setAttribute("novalidate", true);
    document.querySelector(".next").addEventListener("click", (e) => {
      e.preventDefault();
      // console.log("steps" + step);
      console.log("submitted");
      const formElements = form.querySelectorAll("input");

      formElements.forEach((el) => {
        if (el.checkValidity()) {
          console.log("delete");
          el.classList.remove("invalid");
        }
      });
      checkFieldsets();
    });
    document.querySelector(".back").addEventListener("click", () => {
      startAgain();
      goBack();
    });
  }

  function showCountry(data) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("option").value = data.Name;

    document.querySelector("#countries").appendChild(clone);
  }

  async function getJson(callback) {
    let jsonData = await fetch("countries.json");
    let data = await jsonData.json();

    callback(data);
  }

  function doesEmailExist(data) {
    console.log(data);

    if (
      getCountry(form.elements.country.value) == false ||
      data.length > 0 ||
      !form.elements.company.checkValidity() ||
      !form.elements.email.checkValidity()
    ) {
      console.log("Is it working?");

      if (!getCountry(form.elements.country.value)) {
        console.log("country");
        document.querySelector("#country").classList.add("invalid");
        document.querySelector("#countryError").textContent =
          "Please write the country in English or select from the list";
      }
      if (data.length > 0) {
        console.log("email");
        console.log("error");
        document.querySelector("#email").classList.add("invalid");
        document.querySelector("#emailError").textContent =
          "This e-mail address has already been used";
      }

      if (!form.elements.email.checkValidity()) {
        document.querySelector("#emailError").textContent =
          "Please provide a real e-mail address";
        showError();
      }
    } else {
      goToNext();
    }
  }
  //TODO: checking country input
  // function checkStep2() {
  //   if (form.elements.company.checkValidity() && form.elements.country.checkValidity() && form.elements.email.checkValidity()) {
  //     console.log("valid");
  //     console.log(company.checkValidity());
  //     goToNext();
  //   } else {
  //     document.querySelector("#emailError").textContent = "Please provide a real e-mail address";
  //     showError();
  //   }
  // }

  function getCountry(country) {
    const array = [];
    document.querySelectorAll("#countries option").forEach((elm) => {
      array.push(elm.value);
    });

    return array.includes(country);
    //   return false;
    // } else {
    //   return true;
    // }
  }

  function getEmail(email, callback) {
    //fetch data using id
    fetch(`${endpoint1}?q={"workemail":"${email}"}`, {
      method: "get",
      headers: {
        accept: "application/json",
        "x-apiKey1": apiKey1,
        "cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => callback(data));

    //populate form
    //handle submits
    //remove eventhandler and adding eventhandler
  }

  // function get() {
  //   //fetch data using id
  //   fetch(`${endpoint11111}`, {
  //     method: "get",
  //     headers: {
  //       accept: "application/json",
  //       "x-apiKey1": apiKey1,
  //       "cache-control": "no-cache",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => callback(email, data));
  // }

  function submit(e) {
    console.log("submit");
    // document.querySelector("#check3").classList.remove("st3");
    e.preventDefault();
    if (form.checkValidity()) {
      console.log("ready");
      postUser({
        firstname: form.elements.firstname.value,
        lastname: form.elements.lastname.value,
        jobtitle: form.elements.jobtitle.value,
        company: form.elements.company.value,
        country: form.elements.country.value,
        workemail: form.elements.email.value,
      });
      showDoneProcess();
    } else {
      showError();
    }
  }

  function showError() {
    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      if (!el.checkValidity()) {
        el.classList.add("invalid");
      }
    });
  }
  function postUser(data) {
    //   form.reset();
    const postData = JSON.stringify(data);
    console.log(data);
    fetch(endpoint1, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apiKey1": apiKey1,
        "cache-control": "no-cache",
      },
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  //TODO: authentication
  function showDoneProcess() {
    console.log("done sign up");
    //hide back button at step 1
    document.querySelector(".back").classList.add("hide");
  }
  function goToNext() {
    let getStep = document.querySelector("#main-form").dataset.step;
    let step = parseInt(getStep);
    console.log(step);
    if (step == 3) {
      step = 3;
    } else {
      step++;
    }
    document.querySelector("#main-form").dataset.step = step.toString();
    const formElements = form.querySelectorAll("input");
    document.querySelector(".next").removeEventListener("click", goToNext);
    console.log("next");
    console.log(step);
    progressbar();
    if (step == 2) {
      document.querySelector("#personal").classList.add("hide");
      document.querySelector("#aboutCompany").classList.remove("hide");
      formElements.forEach((el) => {
        if (!el.checkValidity()) {
          console.log("delete");
          el.classList.remove("invalid");
        }
      });
    } else if (step == 3) {
      document.querySelector("#personal").classList.add("hide");
      document.querySelector("#aboutCompany").classList.add("hide");
      document.querySelector("#consent-label").classList.remove("hide");
      document.querySelector(".next").classList.add("hide");
      document.querySelector("#submit").classList.remove("hide");
      document.querySelector("#submit").addEventListener("click", submit);
    }
  }
  function goBack() {
    document.querySelector(".back").removeEventListener("click", goBack);
    let getStep = document.querySelector("#main-form").dataset.step;
    let step = parseInt(getStep);
    step--;
    document.querySelector("#main-form").dataset.step = step.toString();
    progressbar();
    console.log(step);
    if (step === 3) {
      console.log(step);
      //show step 2
      document.querySelector("#aboutCompany").classList.remove("hide");
      document.querySelector(".next").classList.remove("hide");
      //click back and hide step 3 and 1
      document.querySelector("#consent-label").classList.add("hide");
      document.querySelector("#submit").classList.add("hide");
      document.querySelector("#personal").classList.add("hide");
    }
    if (step === 2) {
      console.log(step);
      //show step 2
      document.querySelector("#aboutCompany").classList.remove("hide");
      document.querySelector(".next").classList.remove("hide");
      //hide step 3 and step 1
      document.querySelector("#consent-label").classList.add("hide");
      document.querySelector("#submit").classList.add("hide");
      document.querySelector("#personal").classList.add("hide");
      //while at step 2, click back
      document.querySelector(".back").addEventListener("click", () => {
        step = 1;
        if (step === 1) {
          console.log(step);
          startAgain();
        }
      });
    }
  }
  function startAgain() {
    console.log("startAgain");
    //show step 1
    document.querySelector("#personal").classList.remove("hide");
    document.querySelector(".next").classList.remove("hide");
    //hide step 2 and 3
    document.querySelector("#aboutCompany").classList.add("hide");
    document.querySelector("#consent-label").classList.add("hide");
    document.querySelector("#submit").classList.add("hide");
  }

  async function getSvg(filename, callback) {
    let response = await fetch(filename);
    let mySvgData = await response.text();
    callback(mySvgData);
  }
}
