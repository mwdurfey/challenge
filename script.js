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

dateTime.innerHTML = `${month} ${date} <br/> ${localTime}`;

function showWeather(response) {
  let city = document.querySelector(".searchedCity");
  let tempDisplay = document.querySelector(".temp-display");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".windSpeed");
  let iconElement = document.querySelector("#icon");

  city.innerHTML = `${response.data.name}`;
  fahrenheitTemperature = Math.round(`${response.data.main.temp}`);
  tempDisplay.innerHTML = fahrenheitTemperature;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}MPS`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let unit = "imperial";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

getDefault("San Francisco");

function searchLocation(position) {
  let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "imperial";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp-display");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp-display");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLocationButton = document.querySelector(".locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
