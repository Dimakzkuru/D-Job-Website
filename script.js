"use strict";

// window.addEventListener("beforeunload", function () {
//   window.scroll(0, 0);
// });

// Sticky Navigation
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const section1 = document.querySelector(".section--1");

// Smooth Scrolling for page navigation
document.querySelectorAll(".nav__link").forEach((el) =>
  el.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (id.startsWith("#")) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  })
);
const test = document.querySelector(".profile");

// About Us Section functionality
const profileTabContainer = document.querySelector(".profile__tab--container");
const profileTab = document.querySelectorAll(".profile__tab");
const tabContent = document.querySelectorAll(".profile__content");
const showTab = function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".profile__tab");
  if (!clicked) return;
  profileTab.forEach((el) => el.classList.remove("profile__tab--active"));
  clicked.classList.add("profile__tab--active");
  tabContent.forEach((tab) => tab.classList.remove("profile__content--active"));

  const selectedId = clicked.getAttribute("data-tab");
  document
    .querySelector(`.profile__content--${selectedId}`)
    .classList.add("profile__content--active");
};
profileTabContainer.addEventListener("click", showTab);

// Login/Signup Modal Section

const navLogin = document.querySelector(".nav__login");
const navSignup = document.querySelector(".nav__signup");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const tabs = document.querySelectorAll(".login__tab");
const closeModalBtn = document.querySelector(".btn__close-modal");
const modalForm = document.querySelectorAll(".modal__form");

const showModal = function (e) {
  e.preventDefault();
  const clicked = e.target;
  if (!clicked) return;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const selectedId = this.getAttribute("data-tab");
  formToggle(selectedId);

  modalForm.forEach((form) => {
    form.getAttribute("data-tab") === selectedId
      ? form.classList.add("modal__form--active")
      : form.classList.remove("modal__form--active");
  });
  console.log(tabContent);
};

navLogin.addEventListener("click", showModal);
navSignup.addEventListener("click", showModal);
tabs.forEach((tab) => tab.addEventListener("click", showModal));

const formToggle = function (id) {
  tabs.forEach((tab) => tab.classList.remove("login__tab--active"));
  document
    .querySelector(`.login__tab-${id}`)
    .classList.add("login__tab--active");
};

// Close Modal Event
const closeModal = function (e) {
  e.preventDefault();

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

// Filter Jobs
const jobContainers = document.querySelectorAll(".box");
const jobSection = document.querySelector(".job-section");
const dropdownAnchors = document.querySelectorAll(".dropdown-menu a");
// Filter Jobs by Dropdowns
dropdownAnchors.forEach((anchor) =>
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const clickedClass = this.getAttribute("class");
    const filteredValue = this.textContent;

    filterJobsByDropDowns(clickedClass, filteredValue);
  })
);

const filterJobsByDropDowns = function (option, filteredValue) {
  jobContainers.forEach((job) => {
    const selectedOption = job.querySelector(`.${option}`);
    if (!selectedOption) return;
    job.style.display =
      selectedOption?.textContent === filteredValue ? "grid" : "none";
  });
};

// Filter Jobs by Input fields
const jobTitleInput = document.querySelector("#jobSearch");
const jobLocationInput = document.querySelector("#jobLocation");
const jobChecker = (option, value) =>
  option.textContent.toLowerCase().includes(`${value}`);

const filterJobsByInput = function (e) {
  e.preventDefault();
  const inputValue = e.target.value.toLowerCase();
  jobContainers.forEach((job) => {
    const jobTitle = job.querySelector("h3");
    const jobCategory = job.querySelector(".category");
    const jobCompany = job.querySelector(".company");
    console.log(jobCategory);
    if (
      jobChecker(jobTitle, inputValue) ||
      jobChecker(jobCategory, inputValue) ||
      jobChecker(jobCompany, inputValue)
    ) {
      jobTitle.closest(".box").style.display = "grid";
    } else {
      jobTitle.closest(".box").style.display = "none";
    }
  });
};

const filterJobsByJobLocationInput = function (e) {
  e.preventDefault();
  const inputValue = e.target.value.toLowerCase();
  jobContainers.forEach((job) => {
    const jobLocation = job.querySelector(".location");
    jobLocation.closest(".box").style.display = jobChecker(
      jobLocation,
      inputValue
    )
      ? "grid"
      : "none";
  });
};

jobTitleInput.addEventListener("input", filterJobsByInput);
jobLocationInput.addEventListener("input", filterJobsByJobLocationInput);
