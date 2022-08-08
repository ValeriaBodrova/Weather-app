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

h3.innerHTML = `${day}    ${hours}:${minutes}`;

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temp}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
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

function celcius(event) {
  event.preventDefault();
  let cTemp = document.querySelector("#current-temp");
  cTemp.innerHTML = 17;
}

function fahrenheit() {
  let fTemp = document.querySelector("#current-temp");
  fTemp.innerHTML = Math.round((17 * 9) / 5 + 32);
}

let tempC = document.querySelector("#celsius-temp");
let tempF = document.querySelector("#fahrenheit-temp");

tempC.addEventListener("click", celcius);
tempF.addEventListener("click", fahrenheit);

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
