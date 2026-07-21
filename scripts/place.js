// Footer
document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

// Static weather values
const temperature = 8;
const windSpeed = 6;

// Wind Chill Function
function calculateWindChill(temp, speed) {
    return (
        13.12 +
        (0.6215 * temp) -
        (11.37 * Math.pow(speed, 0.16)) +
        (0.3965 * temp * Math.pow(speed, 0.16))
    ).toFixed(1);
}

// Display Weather Values
document.querySelector("#temperature").textContent = temperature;
document.querySelector("#windspeed").textContent = windSpeed;

// Wind Chill Function
function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

// Display Wind Chill
const windChill = document.querySelector("#windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChill.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChill.textContent = "N/A";
}

// Fetch and display place data
async function getPlaceData() {
    try {
        const response = await fetch("data/place-data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const dataList = document.querySelector(".data dl");

        Object.entries(data).forEach(([key, value]) => {
            const dt = document.createElement("dt");
            dt.textContent = key.charAt(0).toUpperCase() + key.slice(1);

            const dd = document.createElement("dd");
            dd.textContent = value;

            dataList.append(dt, dd);
        });
    } catch (error) {
        console.error("Error loading place data:", error);
    }
}

getPlaceData();
