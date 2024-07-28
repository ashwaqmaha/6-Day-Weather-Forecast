function updateWeatherInfo(data) {
  const cityElement = document.querySelector("#current-city");
  const temperatureElement = document.querySelector(
    ".current-temperature-value"
  );
  const timeElement = document.querySelector("#current-date");
  const descriptionElement = document.querySelector(".current-description");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `
    <img
      class="current-temperature-icon"
      src="${data.condition.icon_url}"
      alt="Weather Icon"
    />`;
  windElement.innerHTML = `${data.wind.speed} km/h`;
  humidityElement.innerHTML = `${data.temperature.humidity}%`;
  cityElement.innerHTML = data.city;
  descriptionElement.innerHTML = data.condition.description;
  temperatureElement.innerHTML = Math.round(data.temperature.current);

  const date = new Date(data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  fetchForecast(data.city);
}

// Function to format the date
function formatDate(date) {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const day = date.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

// Function to fetch weather data and update the UI
function fetchWeather(city) {
  const apiKey = "5aa9fb62d0a7bb52efo9b7105t3487b2";
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(url).then((response) => {
    updateWeatherInfo(response.data);
  });
}

function fetchForecast(city) {
  const apiKey = "5aa9fb62d0a7bb52efo9b7105t3487b2";
  const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(url).then(displayForecast);
}

function formateDayForecast(timeStamp) {
  let day = new Date(timeStamp * 1000);
  let dates = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
  return dates[day.getDay()];
}

function displayForecast(response) {
  let dailyForecasts = response.data.daily;

  let forecastData = "";
  dailyForecasts.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      // daily weather for the forecast:
      forecastData += `<div class="weather-forecast-daily">
            <div class="weather-forecast-day">${formateDayForecast(
              day.time
            )}</div>
            
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-highest-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-lowest-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastData;
}

// Event handler for form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInputElement = document.querySelector("#search-input");
  fetchWeather(searchInputElement.value);
}

// Initialize the app with a default city
function init() {
  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearch);

  fetchWeather("cape town");
}

// Start the app
init();
