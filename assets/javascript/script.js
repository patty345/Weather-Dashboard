function initPage() {
    var cityEl = document.getElementById("enter-city");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var fivedayEl = document.getElementById("fiveday-header");
    var todayweatherEl = document.getElementById("today-weather");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "542892d5f29e2b33c206cb20ad5b5de5";

    fucntion getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        
    }
}