// Function to update the time for a specific city
function updateTime(cityElement, timeZone) {
    const dateElement = cityElement.querySelector(".date");
    const timeElement = cityElement.querySelector(".time");
    const cityTime = moment().tz(timeZone);

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
}

// Function to initialize clocks for Miami, New York, and São Paulo
function initializeClock() {
    const cities = ["new-york", "miami", "sao-paulo"];

    cities.forEach(city => {
        const cityElement = document.querySelector(`#${city}`);
        updateTime(cityElement, `America/${city.replace('-', '_')}`);
    });

    // Update clocks every second
    setInterval(() => {
        cities.forEach(city => {
            const cityElement = document.querySelector(`#${city}`);
            updateTime(cityElement, `America/${city.replace('-', '_')}`);
        });
    }, 1000);
}

// Function to update the displayed city based on user selection
function updateCity(event) {
    const cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }

    const cityName = cityTimeZone.replace("_", " ").split("/")[1];
    const cityTime = moment().tz(cityTimeZone);
    const citiesElement = document.querySelector("#cities");

    // Display the selected city
    citiesElement.innerHTML = `
        <div class="city" id="${cityName.toLowerCase()}">
            <div>
                <h2>${cityName}</h2>
                <div class="date"></div>
            </div>
            <div class="time"></div>
        </div>
    `;

    // Update the time for the selected city
    const cityElement = document.querySelector(".city");
    updateTime(cityElement, cityTimeZone);

    // Show the "Go back to all cities" link
    document.getElementById("back-link").style.display = "block";
}

// Function to reset and show all cities
function showAllCities() {
    const citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `
        <div class="city" id="new-york">
            <div>
                <h2>New York</h2>
                <div class="date"></div>
            </div>
            <div class="time"></div>
        </div>
        <div class="city" id="miami">
            <div>
                <h2>Miami</h2>
                <div class="date"></div>
            </div>
            <div class="time"></div>
        </div>
        <div class="city" id="sao-paulo">
            <div>
                <h2>São Paulo</h2>
                <div class="date"></div>
            </div>
            <div class="time"></div>
        </div>
    `;

    // Hide the "Go back to all cities" link
    document.getElementById("back-link").style.display = "none";
}

// Initial setup
initializeClock();

// Event listener for city selection change
const citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

// Hide the "Go back to all cities" link initially
document.getElementById("back-link").style.display = "none";
