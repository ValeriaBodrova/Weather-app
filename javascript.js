let h3 = document.querySelector("h3");

let now = new Date();
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
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}    ${hours}:${minutes}`;

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temp}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "5b60990046534336443d1185d1b26d9b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  search(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);



function fahrenheit(event) {
  event.preventDefault();
 let temperatureElement = document.querySelector("#current-temp")
  let fTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemp);
}

function celsius(event) {
  event.preventDefault();
 let temperatureElement = document.querySelector("#current-temp")

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let tempF = document.querySelector("#fahrenheit-temp");
tempF.addEventListener("click", fahrenheit);

let tempC = document.querySelector("#celsius-temp");
tempC.addEventListener("click", celsius);

function searchLocation(position) {
  let apiKey = "5b60990046534336443d1185d1b26d9b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemp);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocation = document.querySelector("#current-location");
geolocation.addEventListener("click", handlePosition);
search("Kyiv");

