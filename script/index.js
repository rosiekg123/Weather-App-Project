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
h5three.innerHTML = `${hours}:${minutes}`;

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
function convertToCelcius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temp");
  celsiusTemperature.innerHTML = `15&#8451`;
}
function convertToFarenheit(event) {
  event.preventDefault();
  let FarenheitTemperature = document.querySelector("#temp");
  FarenheitTemperature.innerHTML = `55&#8457`;
}
let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertToCelcius);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

//Week 5 Homework - Search Function

function showTemperature(response) {
  console.log(response.data);
  let iconElement = document.querySelector("mainIcon");

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
