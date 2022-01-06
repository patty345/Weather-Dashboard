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

    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        fetch.get(queryURL).then(function (response){
            todayweatherEl.classList.remove("d-none");

            var currentDate = new Date(response.data.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + "(" + month + "/" + day + "/" + year + ") ";
            var weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", response.data.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            var lat = response.data.coord.lat;
            var lon = response.data.coord.lon;
            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            fetch.get(UVQueryURL).then(function (response){
                var UVIndex = document.createElement("span");

                if(response.data[0].value < 4 ){
                    UVIndex.setAttribute("class", "badge badge-success");
                }
                else if(response.data[0].value < 8){
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


            
        }
        )}
}