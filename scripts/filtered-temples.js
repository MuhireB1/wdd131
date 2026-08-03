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

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Columbus Ohio",
    location: "Kirtland, Ohio, united States",
    dedicated: "1999, September, 4-5",
    area: 11745,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/columbus-ohio-temple/columbus-ohio-temple-57341-main.jpg"
  },
  {
    templeName: "Aukland New Zealand Temple",
    location: "Auckland, New Zealand",
    dedicated: "2025, April, 13",
    area: 45456,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/auckland-new-zealand-temple/auckland-new-zealand-temple-56277-main.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10-12",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  }
];

// Looping through and create temple cards
const cards = document.querySelector("#cards");

function displayTemples(templeList) {
    cards.innerHTML = "";

    templeList.forEach(temple => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const location = document.createElement("p");
        const dedicated = document.createElement("p");
        const area = document.createElement("p");
        const image = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";

        card.classList.add("card");
        card.append(name, location, dedicated, area, image);

        cards.appendChild(card);
    });
}

// Show all temples when the page loads
displayTemples(temples);

// Respond to the main navigation menu items by filtering and displaying the temples as follows
// Home
document.querySelector("#home").addEventListener("click", (event) => {
    event.preventDefault();
    displayTemples(temples);
});

// Old – before 1900
document.querySelector("#old").addEventListener("click", (event) => {
    event.preventDefault();

    const oldTemples = temples.filter(temple => 
        Number(temple.dedicated.split(",")[0]) < 1900
    );

    displayTemples(oldTemples);
});

// New – after 2000
document.querySelector("#new").addEventListener("click", (event) => {
    event.preventDefault();

    const newTemples = temples.filter(temple => 
        Number(temple.dedicated.split(",")[0]) > 2000
    );

    displayTemples(newTemples);
});

// Large – more than 90,000 sq ft
document.querySelector("#large").addEventListener("click", (event) => {
    event.preventDefault();

    const largeTemples = temples.filter(temple => 
        temple.area > 90000
    );

    displayTemples(largeTemples);
});

// Small – less than 10,000 sq ft
document.querySelector("#small").addEventListener("click", (event) => {
    event.preventDefault();

    const smallTemples = temples.filter(temple => 
        temple.area < 10000
    );
  
    displayTemples(smallTemples);
});