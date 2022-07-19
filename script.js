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

const APIkey = "1aa38272280b0c9c37e1820740356264"

curl "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=1aa38272280b0c9c37e1820740356264"