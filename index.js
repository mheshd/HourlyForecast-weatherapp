const searchInput = document.querySelector("#search-input").value;
const searchButton = document.querySelector(".search-btn");
const WeatherInfo = document.getElementsByClassName("weather-info")[0];
const errorMsg = document.getElementsByClassName("error-msg")[0];

const weatherData = {
  currentData: {},
  forecast: [],
};

const API_KEY = "4f9178ad0c01897df092cda6526c2cdc";

// weather data
async function getWeatherData(city) {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    errorMsg.innerHTML = "";
    WeatherInfo.innerHTML = "";

    weatherData.currentData = data;
    displayWeatherData(data);
  } catch (error) {
    console.log(error.message, "something went wrong to fetch the weather");
    errorMsg.innerHTML = " please enter correct city name ";
    WeatherInfo.innerHTML = "";
  }
}

// houly forecast
async function getHourlyForecast(city) {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    weatherData.forecast = data.list;
    displayHourlyForecast(data.list);
  } catch (error) {
    console.log(error.message, "something went wrong on hourly forecast");
    errorMsg.innerHTML = " somthing went wrong on hourly forecast";
  }
}

// display weather data

function displayWeatherData(data) {
  const div = document.createElement("div");
  div.classList.add("weather-data");

  div.innerHTML = `
   
     <div class="weather-left">
          <div class="weather-temp">
          <h1> ${data.name}</h1>
          <div class="weather-con">
              <img src=${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather condition">
             <p> ${Math.round(data.main.temp - 273.15)}°C</p>
      </div>
    
      </div>
        <div class="weather-detail">
        <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} km/h</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
      <p>Visibility: ${data.visibility / 1000} km</p>
      </div>
      </div>
    
          <div class="weather-right">
            <p>condition: ${data.weather[0].main}</p>
      <p>Min Temp: ${Math.round(data.main.temp_min - 273.15)}°C</p>
      <p>Max Temp: ${Math.round(data.main.temp_max - 273.15)}°C</p>
      <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      </div>
  
 
    `;

  WeatherInfo.appendChild(div);
}

// display hourly forecast
function displayHourlyForecast(list) {
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast");
  list.slice(0, 6).forEach((item) => {
    const time = new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    forecastItem.innerHTML = `
     <p>${time}</p>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
      <p>${Math.round(item.main.temp - 273.15)}°C</p>
  `;
    forecastContainer.appendChild(forecastItem);
  });

  WeatherInfo.appendChild(forecastContainer);
}
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value;
  getWeatherData(searchInput);
  getHourlyForecast(searchInput);
});
