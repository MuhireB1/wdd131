// Get the current year for the copyright
const currentYear = document.querySelector("#current-year");
const nowYear = new Date().getFullYear();

//updating the footer year
currentYear.innerHTML = nowYear;
document.getElementById("lastModified").innerHTML = document.lastModified;

// Adding event listener to the hamburger menu for mobile navigation
const buttonMenu = document.getElementById("menu");
const navigation = document.querySelector("nav");

buttonMenu.addEventListener("click", () => {
        buttonMenu.classList.toggle('open');
        navigation.classList.toggle('open');
})