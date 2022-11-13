function startProgram() {

const cityChoice = document.getElementById("search-city");
const searchBtn = document.getElementById("searchButton");
const clearBtn = document.getElementById("clearSearch");
const cityNm = document.getElementById("cityName");
const currentPicEl = document.getElementById("current-dayImg");
const TempDiv = document.getElementById("tempurature");
const HumiDiv = document.getElementById("humidity");
const WindDiv = document.getElementById("windSpeed");
const UVIndexC = document.getElementById("UV-index");
const historyData = document.getElementById("history");
var fivedayHead = document.getElementById("fiveday-header");
var currentDayHead = document.getElementById("weather-today");
var calendarDate = document.getElementById("todaysDate");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

const APIkey = "0becbeca9713066f0639d10be1ed37e3";

//Get weather from the API call
function getWeather(cityName) {
    //Request URL with the passed variables
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    axios.get(queryURL) // axios get all to the API
        .then(function (response) { //handling the response 
          currentDayHead.classList.remove("d-none"); //display toggle

            // Parse response to display current weather
            const currentDate = new Date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            cityNm.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", response.data.weather[0].description);
            TempDiv.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            HumiDiv.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            WindDiv.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            
            // Get UV Index
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&cnt=1";
            axios.get(UVQueryURL)
                .then(function (response) {
                    let UVIndex = document.createElement("span");
                    
                    // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                    if (response.data[0].value < 4 ) {
                        UVIndex.setAttribute("class", "badge bg-success");
                    }
                    else if (response.data[0].value < 8) {
                        UVIndex.setAttribute("class", "badge bg-warning");
                    }
                    else {
                        UVIndex.setAttribute("class", "badge bg-danger");
                    }
                    UVIndex.innerText = response.data[0].value;
                    UVIndexC.innerHTML = "UV Index: ";
                    UVIndexC.append(UVIndex);
                });
            
            // Get 5 day forecast for this city
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIkey; //Request API URL with the city ID
            axios.get(forecastQueryURL)
                .then(function (response) {
                    fivedayHead.classList.remove("d-none"); //toggle the five day display
                    console.log(response)
                    //  Parse response to display forecast for next 5 days
                    const forecastEl = document.querySelectorAll(".forecast");
                    for (let i = 0; i < forecastEl.length; i++) {
                        forecastEl[i].innerHTML = "";
                        const forecastIndex = i * 8 + 4;
                        const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        const forecastDay = forecastDate.getDate();
                        const forecastMonth = forecastDate.getMonth() + 1;
                        const forecastYear = forecastDate.getFullYear();
                        const forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastEl[i].append(forecastDateEl);

                        // Card for current weather - append to the page (fiveday)
                        const forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                        forecastEl[i].append(forecastWeatherEl);
                        const forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                        forecastEl[i].append(forecastTempEl);
                        const forecastWindEl = document.createElement("p");
                        forecastWindEl.innerHTML = "Wind: " + response.data.list[forecastIndex].wind.speed + "&deg";
                        forecastEl[i].append(forecastWindEl);
                        const forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                        forecastEl[i].append(forecastHumidityEl);
                    }
                })
        });
}

    // Get history from local storage if any - push search term to Array
    // Invoke render search history
    searchBtn.addEventListener("click", function () {
      const searchTerm = cityChoice.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
  })

  // Clear History button - Clear local storage method, the search history array and reload search history
  clearBtn.addEventListener("click", function () {
      localStorage.clear();
      searchHistory = [];
      renderSearchHistory();
  })

  function k2f(K) { // conversion function from kelvin to farenheit
      return Math.floor((K - 273.15) * 1.8 + 32);
  }

  function renderSearchHistory() { //rendering the history to the page, styling is handled here as well
      historyData.innerHTML = "";
      for (let i = 0; i < searchHistory.length; i++) {
          const historyItem = document.createElement("input");
          historyItem.setAttribute("type", "text");
          historyItem.setAttribute("readonly", true);
          historyItem.setAttribute("class", "form-control d-block bg-light history");
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

