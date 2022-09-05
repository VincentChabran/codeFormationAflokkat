const buttonHamburger = document.querySelector(".buttonHamburger");
const navBarLateral = document.querySelector(".navBarLateral");

buttonHamburger.addEventListener("click", () => navBarLateral.classList.toggle("isActive"));
