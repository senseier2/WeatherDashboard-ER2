const cityChoice = document.getElementById("search-city");
const searchBtn = document.getElementById("searchButton");
const clearBtn = document.getElementById("clearSearch");
const cityName = document.getElementById("cityName");
const currentImg = document.getElementById("current-dayImg");
const TempDiv = document.getElementById("tempurature");
const HumiDiv = document.getElementById("humidity");
const WindDiv = document.getElementById("windSpeed");
const UVDiv = document.getElementById("UV-index");

const historyData = document.getElementById("history");
var fivedayHead = document.getElementById("fiveDay-header");
var currentDayHead = document.getElementById("weather-today");
var calendarDate = document.getElementById("todaysDate");

const APIkey = "0becbeca9713066f0639d10be1ed37e3"

// Setup event listener to take in user input
searchBtn.addEventListener("click", function() {
    console.log("Submit Button");
})

//Event listener to take if user input for clear search
clearBtn.addEventListener("click", function() {
  console.log("Clear Button");
})

//Get request from the weather API

// requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=41&lon=87&appid=0becbeca9713066f0639d10be1ed37e3&units=imperial';
let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=41&lon=87&appid=0becbeca9713066f0639d10be1ed37e3&units=imperial';
console.log(requestUrl);

function getWeather(requestURL) {
  // let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;

    fetch(requestURL)
      .then(function (response) {
        console.log(response.json());
        
      

      // Use response to display current weather
      const currentDate = new Date(response.data);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      cityNmaeEl.innerHTML = response.formData.name + " (" + month + "/" + day + "/" + year + ") ";
      let weatherImg = response.data.weather[0].icon;
      currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
      currentPicEl.setAttribute("alt", response.weather[0].description);
      TempDiv.innerHTML = "Tempurature: " + response.main.humidity + "%";
      HumiDiv.innerHTML = "Humidity: " + response.main.humidity + "%";
      WindDiv.innerHTML = "Wind Speed " + promise.wind.speed + " MPH";
      
      // Get UV index

    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    // let UVQuestURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat "&lon=" + lon + "&appit=" + APIkey + "&cnt=1";
        let UVQuestURL = "Hello"
    axios.get(UVQuestURL)
        .then(function (response) {
            let UVIndex = document.createElement("span");
            console.log(UVQuestURL);


        })
      





    });
  }

  
  
  getWeather(requestUrl);

// Display current date

