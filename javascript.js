function formatDate(timesTamp){

let now = new Date(timesTamp);
let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates){
  let apiKey = "5b60990046534336443d1185d1b26d9b";
  let apiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#current-temp");
  h1.innerHTML = `${temp}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;

  let h3 = document.querySelector("h3");
  h3.innerHTML =   formatDate(response.data.dt * 1000);;

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
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class ="row">`;

forecast.forEach(function(forecastDay, index){
  if(index < 6){
  forecastHTML = forecastHTML + `
  
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
    </br>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
    
    id = "icon"
    width ="36"
    />
    <div class ="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
  ${Math.round(forecastDay.temp.max)}° </span>
  <span class="weather-forecast-temperature-min">

  ${Math.round(forecastDay.temp.min)}°</span>
  </div>
</div>
    </div>

  `;

  }
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
