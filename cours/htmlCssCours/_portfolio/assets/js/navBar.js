const a = document.querySelectorAll(".navBarLien");

a.forEach((el) => {
    el.addEventListener("click", () => {
        a.forEach((el) => el.classList.remove("clicked"));
        el.classList.add("clicked");
    });
});
