function showAllCities() {
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `
      <div class="city" id="los-angeles">
          <div>
              <h2>Los Angeles</h2>
              <div class="date"></div>
          </div>
          <div class="time"></div>
      </div>
      <div class="city" id="paris">
          <div>
              <h2>Paris</h2>
              <div class="date"></div>
          </div>
          <div class="time"></div>
      </div>
    `;
    document.getElementById("back-link").style.display = "none";
  }
  
  function updateTime(cityElement, timeZone) {
    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");
    let cityTime = moment().tz(timeZone);
  
    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  }
  
  function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }
  
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities");
  
    citiesElement.innerHTML = `
      <div class="city" id="${cityName.toLowerCase()}">
          <div>
              <h2>${cityName}</h2>
              <div class="date"></div>
          </div>
          <div class="time"></div>
      </div>
    `;
  
    let cityElement = citiesElement.querySelector(".city");
    updateTime(cityElement, cityTimeZone);
  
    document.getElementById("back-link").style.display = "block";
  }
  
  function initializeClock() {
    updateTime(document.querySelector("#los-angeles"), "America/Los_Angeles");
    updateTime(document.querySelector("#paris"), "Europe/Paris");
  
    setInterval(() => {
      updateTime(document.querySelector("#los-angeles"), "America/Los_Angeles");
      updateTime(document.querySelector("#paris"), "Europe/Paris");
    }, 1000);
  }
  
  initializeClock();
  
  let citiesSelectElement = document.querySelector("#city");
  citiesSelectElement.addEventListener("change", updateCity);
  
  document.getElementById("back-link").style.display = "none";
  