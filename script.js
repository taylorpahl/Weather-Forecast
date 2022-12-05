var submitButton = document.getElementById('submit-button');
var inputValue = document.getElementById('search-input');
var resultTextEl = document.querySelector('#result-text');
var currentWeatherEl = document.querySelector('#current-weather');
var forecastEl = document.querySelector('#forecast');
var searchFormEl = document.querySelector('#search-form');
var weatherKey = 'c676dc8f9a3c261b4e867037f17aa377';
var weatherURL = `http://api.openweathermap.org/data/2.5/`;
var geoCodingURL = `http://api.openweathermap.org/geo/1.0/`;
var forecastCall = 'forecast';
var currentWeatherCall = 'weather';
var directGeoCall = 'direct';
var iconEl = document.querySelector(".weather-icon");


function getCoordinatesURL() {
  var searchInput = document.getElementById('search-input').value
  console.log(searchInput);
  var result = geoCodingURL + directGeoCall + '?q=' + searchInput + '&limit=1&appid=' + weatherKey;
  return result;
}

function getForecastURL(lat, lon) {
  var result = weatherURL + forecastCall + '?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + weatherKey;
 // var result = weatherURL + forecastCall + '?lat=' + lat + '&lon=' + lon + '&cnt=40' + '&appid=' + weatherKey;
  return result;
}

// getCurrentWeatherURL returns string similar to below
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c676dc8f9a3c261b4e867037f17aa377
function getCurrentWeatherURL(lat, lon) {
  var result = weatherURL + currentWeatherCall + '?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + weatherKey;
  return result;
}

submitButton.addEventListener("click", function() {
  var sInput = document.getElementById('search-input').value;
  console.log(sInput)
  var coordinateURL = getCoordinatesURL();
  console.log(coordinateURL);
  fetch(coordinateURL)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var currentWeatherURL = getCurrentWeatherURL(lat, lon);
    console.log(currentWeatherURL)
    console.log(data[0].lat)

    fetch(currentWeatherURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data.weather[0].main);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      setVisableCurrentWeather(data);

      var forecastURL  = getForecastURL(lat, lon);
      console.log(forecastURL);
      fetch(forecastURL)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // console.log(data.list[0].dt_txt);
        // console.log(data.list[0].weather[0].icon);
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].main.humidity);
        // console.log(data.list[0].wind.speed);
        // console.log(data.list[8].dt_txt);
        // console.log(data.list[8].weather[0].icon);
        // console.log(data.list[8].main.temp);
        // console.log(data.list[8].main.humidity);
        // console.log(data.list[8].wind.speed);
        setVisableForecastWeather1(data);
        setVisableForecastWeather2(data);
        setVisableForecastWeather3(data);
        setVisableForecastWeather4(data);
        setVisableForecastWeather5(data);
      })
    }) 
  })
});

function setVisableCurrentWeather(data) {
  var currentWeather = {
    city: data.name,
    country: data.sys.country,
    dt: new Date(),
    iconId: data.weather[0].icon,
    temp: data.main.temp,
    wind: data.wind.speed,
    humidity: data.main.humidity
  }
  document.getElementById('cw-location').innerHTML = currentWeather.city + ', ' + currentWeather.country;
  document.getElementById('cw-date').innerHTML = currentWeather.dt;
  document.getElementById('cw-icon').innerHTML = `<img src="icons/${currentWeather.iconId}.png"/>`;
  document.getElementById('cw-temp').innerHTML ='Temperature: ' + currentWeather.temp + ' °F';
  document.getElementById('cw-wind').innerHTML ='Wind Speed: ' + currentWeather.wind + ' MPH';
  document.getElementById('cw-humidity').innerHTML ='Humidity: ' + currentWeather.humidity + '%';
}

function setVisableForecastWeather1(data) {
  var forecastWeather1 = {
    dt: data.list[7].dt_txt,
    iconId: data.list[7].weather[0].icon,
    temp: data.list[7].main.temp,
    wind: data.list[7].wind.speed,
    humidity: data.list[7].main.humidity
  }
  document.getElementById('f-date-1').innerHTML = forecastWeather1.dt;
  document.getElementById('f-icon-1').innerHTML = `<img src="icons/${forecastWeather1.iconId}.png"/>`;
  document.getElementById('f-temp-1').innerHTML ='Temperature: ' + forecastWeather1.temp + ' °F';
  document.getElementById('f-wind-1').innerHTML ='Wind Speed: ' + forecastWeather1.wind + ' MPH';
  document.getElementById('f-humidity-1').innerHTML ='Humidity: ' + forecastWeather1.humidity + '%';
}

function setVisableForecastWeather2(data) {
  var forecastWeather2 = {
    dt: data.list[15].dt_txt,
    iconId: data.list[15].weather[0].icon,
    temp: data.list[15].main.temp,
    wind: data.list[15].wind.speed,
    humidity: data.list[15].main.humidity
  }
  document.getElementById('f-date-2').innerHTML = forecastWeather2.dt;
  document.getElementById('f-icon-2').innerHTML = `<img src="icons/${forecastWeather2.iconId}.png"/>`;
  document.getElementById('f-temp-2').innerHTML ='Temperature: ' + forecastWeather2.temp + ' °F';
  document.getElementById('f-wind-2').innerHTML ='Wind Speed: ' + forecastWeather2.wind + ' MPH';
  document.getElementById('f-humidity-2').innerHTML ='Humidity: ' + forecastWeather2.humidity + '%';
}

function setVisableForecastWeather3(data) {
  var forecastWeather3 = {
    dt: data.list[23].dt_txt,
    iconId: data.list[23].weather[0].icon,
    temp: data.list[23].main.temp,
    wind: data.list[23].wind.speed,
    humidity: data.list[23].main.humidity
  }
  document.getElementById('f-date-3').innerHTML = forecastWeather3.dt;
  document.getElementById('f-icon-3').innerHTML = `<img src="icons/${forecastWeather3.iconId}.png"/>`;
  document.getElementById('f-temp-3').innerHTML ='Temperature: ' + forecastWeather3.temp + ' °F';
  document.getElementById('f-wind-3').innerHTML ='Wind Speed: ' + forecastWeather3.wind + ' MPH';
  document.getElementById('f-humidity-3').innerHTML ='Humidity: ' + forecastWeather3.humidity + '%';
}

function setVisableForecastWeather4(data) {
  var forecastWeather4 = {
    dt: data.list[31].dt_txt,
    iconId: data.list[31].weather[0].icon,
    temp: data.list[31].main.temp,
    wind: data.list[31].wind.speed,
    humidity: data.list[31].main.humidity
  }
  document.getElementById('f-date-4').innerHTML = forecastWeather4.dt;
  document.getElementById('f-icon-4').innerHTML = `<img src="icons/${forecastWeather4.iconId}.png"/>`;
  document.getElementById('f-temp-4').innerHTML ='Temperature: ' + forecastWeather4.temp + ' °F';
  document.getElementById('f-wind-4').innerHTML ='Wind Speed: ' + forecastWeather4.wind + ' MPH';
  document.getElementById('f-humidity-4').innerHTML ='Humidity: ' + forecastWeather4.humidity + '%';
}

function setVisableForecastWeather5(data) {
  var forecastWeather5 = {
    dt: data.list[39].dt_txt,
    iconId: data.list[39].weather[0].icon,
    temp: data.list[39].main.temp,
    wind: data.list[39].wind.speed,
    humidity: data.list[39].main.humidity
  }

  document.getElementById('f-date-5').innerHTML = forecastWeather5.dt;
  document.getElementById('f-icon-5').innerHTML = `<img src="icons/${forecastWeather5.iconId}.png"/>`;
  document.getElementById('f-temp-5').innerHTML ='Temperature: ' + forecastWeather5.temp + ' °F';
  document.getElementById('f-wind-5').innerHTML ='Wind Speed: ' + forecastWeather5.wind + ' MPH';
  document.getElementById('f-humidity-5').innerHTML ='Humidity: ' + forecastWeather5.humidity + '%';
}