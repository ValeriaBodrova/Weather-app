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

function getForecast(coordinates){
  let apiKey = "5b60990046534336443d1185d1b26d9b";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}$appid=${apiKey}$units=metric`;
axios.get(apiUrl).then(getForecast);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#current-temp");
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

  getForecast(response.data.coord);
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class ="row">`;
let days =["Sun", "Mon", "Tue"];
days.forEach(function (day){
  forecastHTML = forecastHTML + `
  
  <div class="col-2">
    <div class="weather-forecast-date">${day}
    <img src="http://openweathermap.org/img/wn/10d@2x.png" 
    
    id = "icon"
    width ="36"
    />
    <div class ="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
  24° </span>
  <span class="weather-forecast-temperature-mmin">

  16°</span>
  </div>
</div>
    </div>

  `;
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
