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


// Display Wind Chill
const windChill = document.querySelector("#windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChill.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChill.textContent = "N/A";
}