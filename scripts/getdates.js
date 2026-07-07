// Get the current year and display it in the footer
const fullYear = document.querySelector("#current-year");
const currentYear = new Date().getFullYear();
fullYear.innerHTML = `<span id="current-year">${currentYear}</span>`;

// Get the last modified date of the document and display it in the footer
document.getElementById("lastModified").innerHTML = document.lastModified;