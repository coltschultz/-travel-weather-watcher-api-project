var searchBtn = document.getElementById("searchBtn");
var searchBar = document.getElementById("searchBar");
var todayEl = document.getElementById("today");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");
var historyList = document.getElementById("historyList");
var fiveDayTitle = document.getElementById("fiveDayTitle");

var city;
var date;
var iconCode;

// Get the data for a particular city
var getData = function (city) {
  var baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  var apiKey = "e9da07741ba3933502e8f95cfbb33359";

  var url = baseUrl + "q=" + city + "&appid=" + apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      iconCode = data.cod;
      console.log(iconCode);
      var newUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&units=standard&appid=" +
        apiKey;

      fetch(newUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Display Today's Weather
          var cityUpper = city.toUpperCase();
          var date = moment().format("MM/DD/YYYY");
          var date1 = moment().add(1, "days").format("MM/DD/YYYY");
          var date2 = moment().add(2, "days").format("MM/DD/YYYY");
          var date3 = moment().add(3, "days").format("MM/DD/YYYY");
          var date4 = moment().add(4, "days").format("MM/DD/YYYY");
          var date5 = moment().add(5, "days").format("MM/DD/YYYY");
          console.log(newUrl);
          console.log(data);
          fiveDayTitle.textContent = "Five Day Forecast";
          todayEl.innerHTML =
            "<h2>" +
            cityUpper +
            " – (" +
            date +
            ")</h2>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[0].weather[0].icon +
            '@2x.png">' +
            "<p>Temp: " +
            (Math.floor((data.current.temp - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.current.wind_speed +
            "MPH</p>" +
            "<p>Humidity: " +
            data.current.humidity +
            "%</p>" +
            '<p>UV Index: <span id="uv">&nbsp;&nbsp;&nbsp;' +
            data.current.uvi +
            "&nbsp;&nbsp;&nbsp;</span></p>";
          // Set the Color of the UV bar
          var uviEl = document.getElementById("uv");
          if (data.current.uvi > 3 && data.current.uvi < 5) {
            uviEl.className = "moderate";
          } else if (data.current.uvi > 5) {
            uviEl.className = "severe";
          } else {
            uviEl.className = "favorable";
          }

          // Display The 5 day Forecast
          // Day 1
          day1.innerHTML =
            '<h4 class="date">' +
            date1 +
            "</h4>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[1].weather[0].icon +
            '.png">' +
            "<p>Temp: " +
            (Math.floor((data.daily[1].temp.day - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.daily[1].wind_speed +
            "</p>" +
            "<p>Humidity: " +
            data.daily[1].humidity +
            "%</p>" +
            "";
          // Day 2
          day2.innerHTML =
            '<h4 class="date">' +
            date2 +
            "</h4>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[2].weather[0].icon +
            '.png">' +
            "<p>Temp: " +
            (Math.floor((data.daily[2].temp.day - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.daily[2].wind_speed +
            "</p>" +
            "<p>Humidity: " +
            data.daily[2].humidity +
            "%</p>" +
            "";
          // Day 3
          day3.innerHTML =
            '<h4 class="date">' +
            date3 +
            "</h4>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[3].weather[0].icon +
            '.png">' +
            "<p>Temp: " +
            (Math.floor((data.daily[3].temp.day - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.daily[3].wind_speed +
            "</p>" +
            "<p>Humidity: " +
            data.daily[3].humidity +
            "%</p>" +
            "";
          // Day 4
          day4.innerHTML =
            '<h4 class="date">' +
            date4 +
            "</h4>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[4].weather[0].icon +
            '.png">' +
            "<p>Temp: " +
            (Math.floor((data.daily[4].temp.day - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.daily[4].wind_speed +
            "</p>" +
            "<p>Humidity: " +
            data.daily[4].humidity +
            "%</p>" +
            "";
          // Day 5
          day5.innerHTML =
            '<h4 class="date">' +
            date5 +
            "</h4>" +
            '<img src="https://openweathermap.org/img/wn/' +
            data.daily[5].weather[0].icon +
            '.png">' +
            "<p>Temp: " +
            (Math.floor((data.daily[5].temp.day - 273.15) * 1.8) + 32) +
            "°F</p>" +
            "<p>Wind: " +
            data.daily[5].wind_speed +
            "</p>" +
            "<p>Humidity: " +
            data.daily[5].humidity +
            "%</p>" +
            "";
        });
    });
};

var historyL = [];
var searchDataObj = {};

// Load the prior search history
(function (item) {
  historyL = JSON.parse(localStorage.getItem("historyL"));
  if (historyL) {
    historyL.splice(10);

    for (var i = 0; i < historyL.length; i++) {
      var newEl = document.createElement("li");
      newEl.textContent = historyL[i].city;
      historyList.appendChild(newEl);
    }
  } else {
    var decoy = { city: "" };
    historyL = [decoy];
  }
})();

// Handle the search form

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(document.getElementById("searchBar").value);
  var city = document.getElementById("searchBar").value;
  getData(city);
  // Add the City to the Top of Search History
  (function () {
    cityUpper = city.toUpperCase();
    searchDataObj = { city: cityUpper };
    if (historyL) {
      historyL.unshift(searchDataObj);
    } else {
      historyL.push(searchDataObj);
    }
    historyL.splice(10);
    localStorage.setItem("historyL", JSON.stringify(historyL));
    var newEl = document.createElement("li");
    newEl.textContent = cityUpper;
    historyList.insertBefore(newEl, historyList.firstChild);
  })();
});

// Handle clicks of history buttons
$("#historyList").on("click", "li", function () {
  var element = $(this);

  var text = $(this).text().trim();

  getData(text);
});
