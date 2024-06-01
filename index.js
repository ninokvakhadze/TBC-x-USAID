const burgerMenu = document.querySelector(".burger");
const nav = document.querySelector(".navigation");
const cancel = document.querySelector(".cancel");

// open and close header

burgerMenu.addEventListener("click", () => {
  nav.style.display = "inline";
});

cancel.addEventListener("click", () => {
  nav.style.display = "none";
});
