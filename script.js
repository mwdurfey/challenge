let now = new Date();
let dateTime = document.querySelector("span.dateTime");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let localTime = now.toLocaleString("en-us", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
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

dateTime.innerHTML = `${month} ${date}, ${localTime}`;

function showWeather(response) {
  console.log("API Response:");
  console.log(response);
  let city = document.querySelector(".searchedCity");
  let tempDisplay = document.querySelector(".temp-display");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".windSpeed");

  city.innerHTML = `${response.data.name}`;
  tempDisplay.innerHTML = Math.round(`${response.data.main.temp}`);
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}MPS`;
}

function getWeather(location) {
  let apiKey = "0d9a0ad5403b83d6055e39cc3d90410a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${location}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  console.log(searchInput.value);
  let searchedCity = document.querySelector(".searchedCity");
  if (searchInput.value) {
    searchedCity.innerHTML = `${searchInput.value}`;
    getWeather(searchInput.value);
  } else {
    searchedCity.innerHTML = null;
    alert("please type a city");
  }
}
let form = document.querySelector(".city");
form.addEventListener("submit", city);

function getDefault(city) {
  let apiKey = "0d9a0ad5403b83d6055e39cc3d90410a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

getDefault("San Francisco");

function searchLocation(position) {
  let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

//let tempDisplay = document.querySelector(".temp-display");
//let tempChangeCel = document.querySelector(".temp-change-cel");
//let tempChangeFahr = document.querySelector(".temp-change-fahr");
//tempChangeCel.addEventListener("click", function () {
//tempDisplay.innerHTML = "33°C";
//});
//tempChangeFahr.addEventListener("click", function () {
//tempDisplay.innerHTML = "91°F";
//});
