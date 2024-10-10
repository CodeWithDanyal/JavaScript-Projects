// Dom Elements
let inputBox = document.querySelector("#inputBox");
let searchBtn = document.querySelector("#searchBtn");
let weatherImg = document.querySelector("#weatherImg");
let tempraturBox = document.querySelector("#celsius");
let cityNameBox = document.querySelector("#city-name");
let humadityBox = document.querySelector("#humidityDataNum");
let windSpeedBox = document.querySelector("#windSpeed");
let form = document.querySelector("form");
let errorMsg = document.createElement("p");

// WeatherApi
let apiKey = "048e4206ba04f3de8e216928709f0d7c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function getCityName(city) {
  try {
    errorMsg.remove();
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    let temprature = data.main.temp;
    let cityName = data.name;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    showData(temprature, cityName, humidity, windSpeed);
  } catch (err) {
    errorMsg.innerText = "**City Not Found";
    errorMsg.style.color = "red";
    form.before(errorMsg);
  }
}

// Displayinf Data
function showData(temprature, cityName, humidity, windSpeed) {
  let temp = Math.round(temprature);
  if (temp < 0) {
    weatherImg.src = "images/snow.png";
  } else if (temp >= 0 && temp < 10) {
    weatherImg.src = "images/cool.png";
  } else if (temp >= 10 && temp < 20) {
    weatherImg.src = "images/sky.png";
  } else if (temp >= 20 && temp < 30) {
    weatherImg.src = "images/sun.png";
  } else if (temp >= 30) {
    weatherImg.src = "images/hot-sun.png";
  } else {
    console.log("temprature Error");
  }

  tempraturBox.innerText = temp + "°C";
  cityNameBox.innerText = cityName;
  humadityBox.innerText = humidity + "%";
  windSpeedBox.innerText = windSpeed + "km/h";
}

// search Event
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputBox.value !== "") {
    getCityName(inputBox.value);
  } else {
    inputBox.focus();
    errorMsg.innerText = "**Enter City Name";
    errorMsg.style.color = "red";
    form.before(errorMsg);
  }
});

// Event On User Input
inputBox.addEventListener("input", () => errorMsg.remove());
