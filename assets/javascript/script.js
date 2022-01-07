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
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?id=" +
      cityName +
      "&appid=" +
      APIKey;
    fetch(queryURL).then(function (response) {
      todayweatherEl.classList.remove("d-none");

      var currentDate = new Date(response.data.dt * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.currentDate.getFullYear();
      nameEl.innerHTML =
        response.data.name + "(" + month + "/" + day + "/" + year + ") ";
      var weatherPic = response.data.weather[0].icon;
      currentPicEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
      );
      currentPicEl.setAttribute("alt", response.data.weather[0].description);
      currentTempEl.innerHTML =
        "Temperature: " + k2f(response.data.main.temp) + " &#176F";
      currentHumidityEl.innerHTML =
        "Humidity: " + response.data.main.humidity + "%";
      currentWindEl.innerHTML =
        "Wind Speed: " + response.data.wind.speed + " MPH";

      var lat = response.data.coord.lat;
      var lon = response.data.coord.lon;
      var UVQueryURL =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey +
        "&cnt=1";
      fetch(UVQueryURL).then(function (response) {
        var UVIndex = document.createElement("span");

        if (response.data[0].value < 4) {
          UVIndex.setAttribute("class", "badge badge-success");
        } else if (response.data[0].value < 8) {
          UVIndex.setAttribute("class", "badge badge-warning");
        } else {
          UVIndex.setAttribute("class", "badge badge-danger");
        }
        console.log(response.data[0].value);
        UVIndex.innerHTML = response.data[0].value;
        currentUVEl.innerHTML = "UV Index: ";
        currentUVEl.append(UVIndex);
      });

      var cityID = response.data.id;
      var forecastQueryURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityID +
        "&appid=" +
        APIKey;
      fetch.get(forecastQueryURL).then(function (response) {
        fivedayEl.classList.remove("d-none");

        var forecastEls = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastEls.length; i++) {
          forecastEls[i].innerHTML = "";
          var forecastIndex = i * 8 + 4;
          var forecastDate = new Date(
            response.data.list[forecastIndex].dt * 1000
          );
          var forecastDay = forecastDate.getDate();
          var forecastMonth = forecastDate.getMonth() + 1;
          var forecastYear = forecastDate.getFullYear();
          var forecastDateEl = document.createElement("p");
          forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
          forecastDateEl.innerHTML =
            forecastMonth + "/" + forecastDay + "/" + forecastYear;
          forecastEls.append(forecastDateEl);

          var forecastWeatherEl = document.createElement("img");
          forecastWeatherEl.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.data.list[forecastIndex].weather[0].icon +
              "@2x.png"
          );
          forecastWeatherEl.setAttribute(
            "alt",
            response.data.list[forecastIndex].weather[0].description
          );
          forecastEls[i].append(forecastWeatherEl);
          var forecastTempEl = document.createElement("p");
          forecastTempEl.innerHTML =
            "Temp: " +
            k2f(response.data.list[forecastIndex].main.temp) +
            " &#176F";
          forecastEls[i].append(forecastTempEl);
          var forecastHumidtyEl = document.createElement("p");
          forecastEls[i].append(forecastHumidtyEl);
        }
      });
    });
  }

  searchEl.addEventListener("click", function () {
    const searchTerm = cityEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
  });

  clearEl.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
  });

  function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
  }

  function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "form-control d-block bg-white");
      historyItem.setAttribute("value", searchHistory[i]);
      historyItem.addEventListener("click", function () {
        getWeather(historyItem.value);
      });
      historyEl.append(historyItem);
    }
  }

  renderSearchHistory();
  if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
  }
}

initPage();
