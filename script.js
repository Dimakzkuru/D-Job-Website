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
let jobSearchInput2 = document.querySelector("#jobSearch2");
let jobLocationInput2 = document.querySelector("#jobLocation2");

const filterJobsByInput = function () {
  let searchValue = jobSearchInput2.value.toLowerCase();
  let locationValue = jobLocationInput2.value.toLowerCase();
  jobContainers.forEach((job) => {
    const jobTitle = job.querySelector("h3").textContent.toLowerCase();
    const jobCategory = job
      .querySelector(".category")
      .textContent.toLowerCase();
    const jobCompany = job.querySelector(".company").textContent.toLowerCase();
    const jobLocation = job
      .querySelector(".location")
      .textContent.toLowerCase();

    const matchesSearch =
      jobTitle.includes(searchValue) ||
      jobCategory.includes(searchValue) ||
      jobCompany.includes(searchValue);
    const matchesLocation = jobLocation.includes(locationValue);
    job.style.display = matchesSearch && matchesLocation ? "grid" : "none";
  });
};

jobSearchInput2?.addEventListener("input", filterJobsByInput);
jobLocationInput2?.addEventListener("input", filterJobsByInput);

// From Index.html Input Forms

const params = new URLSearchParams(window.location.search);
if (params.has("jobSearch1")) {
  jobSearchInput2.value = params.get("jobSearch1");
}

if (params.has("jobLocation1")) {
  jobLocationInput2.value = params.get("jobLocation1");
}
filterJobsByInput();

// From jobs.html Categories : Apply ScrollIntoView

const jobCategoryContainer = document.querySelectorAll(".box-category");

jobCategoryContainer.forEach((category) => {
  category.addEventListener("click", function (e) {
    const clickedCategory = category.querySelector("h3").textContent;

    jobContainers.forEach((job) => {
      const jobCategory = job.querySelector(".category");
      job.closest(".box").style.display = jobCategory.textContent.includes(
        `${clickedCategory}`
      )
        ? "grid"
        : "none";
    });
    document
      .querySelector("#jobs-section")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
