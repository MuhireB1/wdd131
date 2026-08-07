// Product Array
const products = [
    {
        id: "fc-1888",
        name: "Flux Capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "Power Laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "Time Circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "Low Voltage Reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "Warp Equalizer",
        averagerating: 5.0
    }
];

// Footer
document.getElementById("currentyear").textContent =
    new Date().getFullYear();

document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

// Populate Product Select
const productSelect = document.getElementById("productName");

if (productSelect) {
    products.forEach(product => {
        const option = document.createElement("option");

        // Display uses product name
        option.textContent = product.name;

        // Value uses product id
        option.value = product.id;

        productSelect.appendChild(option);
    });
}

// Review Counter on review.html
const reviewCountElement = document.getElementById("reviewCount");

if (reviewCountElement) {
    let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

    reviewCount++;

    localStorage.setItem("reviewCount", reviewCount);

    reviewCountElement.textContent = reviewCount;
}