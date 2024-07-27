function displayInfo(response) {
  console.log(response);
  let cityElement = document.querySelector("#current-city");
  let currentTemperature = document.querySelector(".current-temperature-value");
  let timeElement = document.querySelector("#current-date");
  let descriptionElement = document.querySelector(".current-description");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
                  class="current-temperature-icon"
                  src="${response.data.condition.icon_url}"
                  alt=""
                />`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  let date = new Date(response.data.time * 1000);
  let formatedDate = formatDate(date);
  timeElement.innerHTML = formatedDate;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let apiKey = "5aa9fb62d0a7bb52efo9b7105t3487b2";
  let url = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}`;
  axios.get(url).then(displayInfo);
}

function defaultCity(city) {
  let apiKey = "5aa9fb62d0a7bb52efo9b7105t3487b2";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(displayInfo);
}

function formatDate(latestTime) {
  let minutes = latestTime.getMinutes();
  let hours = latestTime.getHours();
  let day = latestTime.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

defaultCity("cape town");
