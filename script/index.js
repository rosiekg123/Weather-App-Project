//Feature 1

let now = new Date();

let h5 = document.querySelector("h5.box-info");
let h5two = document.querySelector("h5.box-info-two");
let h5three = document.querySelector("h5.box-info-three");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h5.innerHTML = `${day}`;
h5two.innerHTML = `${date} ${month} ${year}`;
h5three.innerHTML = `Last Updated: ${hours}:${minutes}`;

//Feature 2

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#currentCity");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Bonus Feature

function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}&#8457`;
}
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}&#8451`;
}
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertToCelcius);

let celsiusTemperature = null;

//Week 5 Homework - Search Function

function showTemperature(response) {
  let iconElement = document.querySelector("#mainIcon");

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}&#8451`;
  document.querySelector(
    "#current-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function pullCityInfo(citySearch) {
  let apiKey = "643c0c4907c570ba3890edc515e6df98";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?q=${citySearch}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input").value;
  pullCityInfo(citySearch);
}

let searchFormTwo = document.querySelector("#search-form");
searchFormTwo.addEventListener("submit", searchCity);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(pullCityInfo);
}

//Week 5 Homework - Current Button

function findPositionTwo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "643c0c4907c570ba3890edc515e6df98";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(findPositionTwo);
}
let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", showCurrentLocation);

//Week 8 Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
 <div class="card-deck">
  <div class="card">
  <div class="text-bg-secondary p-4">
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    
        />
    <div class="card-body">
      <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
      <span class="card-text" id="weather-forecast-temperatures-one"> ${Math.round(
        forecastDay.temp.max
      )} °</span><span class="card-text-two" id="weather-forecast-temperatures-two"> / ${Math.round(
          forecastDay.temp.min
        )} °</span>
      </div>
      </div>
      </div>
      </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Forecast API call
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
