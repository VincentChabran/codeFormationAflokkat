const navBarButton = document.querySelector(".navBarButton");
const navBar = document.querySelector(".navBar");

navBarButton.addEventListener("click", () => navBar.classList.toggle("isActive"));
