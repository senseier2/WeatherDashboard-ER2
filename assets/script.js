function startProgram() {

const cityChoice = document.getElementById("search-city");
const searchBtn = document.getElementById("searchButton");
const clearBtn = document.getElementById("clearSearch");
const cityNm = document.getElementById("cityName");
const currentImg = document.getElementById("current-dayImg");
const TempDiv = document.getElementById("tempurature");
const HumiDiv = document.getElementById("humidity");
const WindDiv = document.getElementById("windSpeed");
const UVDiv = document.getElementById("UV-index");

const historyData = document.getElementById("history");
var fivedayHead = document.getElementById("fiveDay-header");
var currentDayHead = document.getElementById("weather-today");
var calendarDate = document.getElementById("todaysDate");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

const APIkey = "0becbeca9713066f0639d10be1ed37e3";



// requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=41&lon=87&appid=0becbeca9713066f0639d10be1ed37e3&units=imperial';

//Get request from the weather API
function getWeather(cityName) {
    // Execute a current weather get request from open weather api
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    // axios.get(queryURL)
    //     .then(function (response) {

    fetch(queryURL)
        .then(function (response) {
          console.log(response);
          currentDayHead.classList.remove("d-none");

            // Parse response to display current weather
            const currentDate = new Date(response.data.date * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", response.data.weather[0].description);
            TempDiv.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            HumiDiv.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            WindDiv.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            
            // Get UV Index
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)
                .then(function (response) {
                    let UVIndex = document.createElement("span");
                    
                    // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                    if (response.data[0].value < 4 ) {
                        UVIndex.setAttribute("class", "badge badge-success");
                    }
                    else if (response.data[0].value < 8) {
                        UVIndex.setAttribute("class", "badge badge-warning");
                    }
                    else {
                        UVIndex.setAttribute("class", "badge badge-danger");
                    }
                    console.log(response.data[0].value)
                    UVIndex.innerHTML = response.data[0].value;
                    currentUVEl.innerHTML = "UV Index: ";
                    currentUVEl.append(UVIndex);
                });
            
            // Get 5 day forecast for this city
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            axios.get(forecastQueryURL)
                .then(function (response) {
                    fivedayEl.classList.remove("d-none");
                    
                    //  Parse response to display forecast for next 5 days
                    const forecastEls = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecastEls.length; i++) {
                        forecastEls[i].innerHTML = "";
                        const forecastIndex = i * 8 + 4;
                        const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        const forecastDay = forecastDate.getDate();
                        const forecastMonth = forecastDate.getMonth() + 1;
                        const forecastYear = forecastDate.getFullYear();
                        const forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastEls[i].append(forecastDateEl);

                        // Icon for current weather
                        const forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                        forecastEls[i].append(forecastWeatherEl);
                        const forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                        forecastEls[i].append(forecastTempEl);
                        const forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                        forecastEls[i].append(forecastHumidityEl);
                    }
                })
        });
}

    // Get history from local storage if any
    searchBtn.addEventListener("click", function () {
      const searchTerm = cityChoice.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
  })

  // Clear History button
  clearBtn.addEventListener("click", function () {
      localStorage.clear();
      searchHistory = [];
      renderSearchHistory();
  })

  function k2f(K) {
      return Math.floor((K - 273.15) * 1.8 + 32);
  }

  function renderSearchHistory() {
      historyData.innerHTML = "";
      for (let i = 0; i < searchHistory.length; i++) {
          const historyItem = document.createElement("input");
          historyItem.setAttribute("type", "text");
          historyItem.setAttribute("readonly", true);
          historyItem.setAttribute("class", "form-control d-block bg-white");
          historyItem.setAttribute("value", searchHistory[i]);
          historyItem.addEventListener("click", function () {
              getWeather(historyItem.value);
          })
          historyData.append(historyItem);
      }
  }

  renderSearchHistory();
  if (searchHistory.length > 0) {
      getWeather(searchHistory[searchHistory.length - 1]);
  }

}
  


startProgram();

