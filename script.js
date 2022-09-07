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
let historyInfo = JSON.parse(localStorage.getItem("search")) || [];

//Read the APIkey when button is pressed and add it to our URL
const APIkey = "1aa38272280b0c9c37e1820740356264"

//
function getWeather(cityName) {
    //query the API for weather data
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    axios.get(queryURL)
    .then(function(response) {
        console.log(response);
        console.log(queryURL);
    //Parse data
            //
        const currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        cityName.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
    })

}
//adding an eventlistener and setting the data to local storage
searchBtn.addEventListener("click", function() {
    const searchCity = cityChoice.value;
    getWeather(searchCity);
    historyInfo.push(searchCity); //adding the history to an array
    localStorage.setItem("search",JSON.stringify(historyInfo)); //stringify the data for local storage
    searchHistoryRender();
})

function searchHistoryRender() {
    historyData.innerHTML = "";
    for (let i = 0; i < historyInfo.length; i++) {
        historyData = document.createElement('input');
    }
}