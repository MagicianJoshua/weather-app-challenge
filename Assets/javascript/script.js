var fiveDayForecast = document.querySelector(".five-day-weather-cards");
var cityListContainer = document.querySelector("#city-list");
var weatherApiKey = "873f105b79ecbeb04cce992c7848ed45";
var searchbtn = document.querySelector("#search-btn");
var searchValue = document.querySelector("#city-search");
var todaysTemp = document.querySelector("#todays-temp");
var todaysWind = document.querySelector("#todays-wind");
var todaysHumidty = document.querySelector("#todays-humidity");
var cityNameHeader = document.querySelector("#city-name-header");
// attach input from html

//*This is an event listener so that the textarea doesnt accidently reset the page if the user clicks enter in the text area.
searchValue.addEventListener("keypress", function (event) {
  let keyname = event.key;
  if (keyname == "Enter") {
    event.preventDefault();
  }
});

//*This is an event listener that whe pressed will search the value inside the textarea
searchbtn.addEventListener("click", function (event) {
  let searchText = searchValue.value;
  let cards = document.querySelectorAll(".weather-card-template");
  if (cards.length > 0) {
    for (i = 0; i < cards.length; i++) {
      cards[i].remove();
    }
  }

  //!This is setting todays weather!
  getCoordinate(searchText, true).then(function (data) {
    
    todaysTemp.textContent = "Temp: " + data[0].main.temp + " C";
    todaysWind.textContent = "Wind: " + data[0].wind.speed + " Meters/Second";
    todaysHumidty.textContent = "Humidity: " + data[0].main.humidity + "%";
    let img = document.querySelector("#current-day-icon");
    let imgsrc =
      "https://openweathermap.org/img/wn/" +
      data[0].weather[0].icon +
      "@2x.png";
    img.setAttribute("src", imgsrc);
    cityNameHeader.textContent = data[0].name;
  });
  
    //!This is setting the forecast!
  getCoordinate(searchText, false).then(function (data) {
    let weather = [];

    weather.push(data[0].list);

    // console.log("weather",weather[0].dt_txt);
    // console.log("data",data);

    for (i = 4; i < 40; i += 8) {
      let cityName = data[0].city.name;
      let dateTxt = data[0].list[i].dt_txt;
      let dateArray = dateTxt.split(" ");
      let img = data[0].list[i].weather[0].icon;
      let imgUrl = "https://openweathermap.org/img/wn/" + img + "@2x.png";
      let temp = data[0].list[i].main.temp;
      let wind = data[0].list[i].wind.speed;
      let humidity = data[0].list[i].main.humidity;
      constructWeatherCards(
        cityName,
        dateArray[0],
        imgUrl,
        temp,
        wind,
        humidity
      );
    }
  });
});

function weatherApiToday(lat, lon) {
  //*this url is for getting the weather
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    weatherApiKey +
    "&units=metric";
  let data = [];
  return getApi(url).then(function (weather) {
    data.push(weather[0]);
    return data;
  });
}

function weatherApiForecast(lat, lon) {
  //*this url is for getting the weather
  let url =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    weatherApiKey +
    "&units=metric";
  let data = [];
  return getApi(url).then(function (weather) {
    data.push(weather[0]);
    return data;
  });
}

function getCoordinate(city, current) {
  //*this url is for turning city names into latitude and longtitude
  let url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    weatherApiKey;
  if (current === false) {
    return getApi(url)
      .then(function (fetchData) {
        let x = fetchData[0];
        console.log("forecast");
        return weatherApiForecast(x[0].lat, x[0].lon);
      })
      .catch(function (error) {
        searchValue.value = "";
        searchValue.setAttribute("placeholder", "Please enter a real city");
        console.log("name a city");
      });
  } else {
    console.log("current");
    return getApi(url)
      .then(function (fetchData) {
        let x = fetchData[0];

        return weatherApiToday(x[0].lat, x[0].lon);
      })
      .catch(function (error) {
        searchValue.value = "";
        searchValue.setAttribute("placeholder", "Please enter a real city");
        console.log("name a city");
      });
  }
}
//async await

//*This function just geta the data for you from a specific url.
function getApi(requestUrl) {
  let dataReturn = [];
  return fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dataReturn.push(data);
      return dataReturn;
    });
}

function constructWeatherCards(name, date, img, temp, wind, humidity) {
  let card = document.createElement("div");
  card.setAttribute("class", "weather-card-template");

  let cardName = document.createElement("h3");
  cardName.textContent = name;
  cardName.setAttribute("id", "card-city-name");
  card.appendChild(cardName);

  let cardDate = document.createElement("h4");
  cardDate.setAttribute("id", "card-date");
  cardDate.textContent = date;
  card.appendChild(cardDate);

  let cardImg = document.createElement("img");
  cardImg.setAttribute("src", img);
  card.appendChild(cardImg);

  let cardTemp = document.createElement("p");
  cardTemp.setAttribute("id", "card-details");
  cardTemp.textContent = "Temp: " + temp + " C";
  card.appendChild(cardTemp);

  let cardWind = document.createElement("p");
  cardWind.setAttribute("id", "card-details");
  cardWind.textContent = "Wind: " + wind + " Meters/Second";
  card.appendChild(cardWind);

  let cardHumidity = document.createElement("p");
  cardHumidity.setAttribute("id", "card-details");
  cardHumidity.textContent = humidity + "%";
  card.appendChild(cardHumidity);

  fiveDayForecast.appendChild(card);
}

//  <div class="weather-card-template">
//                 <h3 id="card-city-name">Vancouver</h3>
//                 <h4 id="card-date">Date</h4>
//                 <img id="weather-icon" src="Assets/Images/cloud.jpg">
//                 <p id="card-details">Temp:</p>
//                 <p id="card-details">Wind:</p>
//                 <p id="card-details">Humidity:</p>
//             </div>
