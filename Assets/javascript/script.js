var fiveDayForecast = document.querySelector(".five-day-weather-cards");
var cityListContainer = document.querySelector("#city-list");
var weatherApiKey = "873f105b79ecbeb04cce992c7848ed45";
var searchbtn = document.querySelector("#search-btn");
var searchValue = document.querySelector("#city-search");
var todaysTemp = document.querySelector("#todays-temp");
var todaysWind = document.querySelector("#todays-wind")
var todaysHumidty = document.querySelector("#todays-humidity")
var cityNameHeader = document.querySelector("#city-name-header")
// attach input from html


//*This is an event listener so that the textarea doesnt accidently reset the page if the user clicks enter in the text area.
searchValue.addEventListener("keypress", function(event){
    let keyname = event.key;
    if (keyname == "Enter" ){
        event.preventDefault();
    };
})

//*This is an event listener that whe pressed will search the value inside the textarea
searchbtn.addEventListener("click", function(event){
    let searchText = searchValue.value;
    let cards = document.querySelectorAll(".weather-card-template")
    if (cards.length > 0){
        for (i = 0; i < cards.length; i++){
            cards[i].remove();
        }
    }
    getCoordinate(searchText).then(function(data){
        let weather = []
        
        for (let i = 0; i < 6; i++){
            weather.push(data[0].list[i])
            
        }
        console.log("img",data[0].list[0].weather[0].icon )
        let cityName = data[0].city.name;
        let date = data[0].list[0].dt_txt;
        let img = data[0].list[0].weather[0].icon
        let imgUrl = "https://openweathermap.org/img/wn/"+img+"@2x.png"
        let temp = weather[0].main.temp;
        let wind = weather[0].wind.speed;
        let humidity = weather[0].main.humidity;
        console.log("Date",data[0].list[0].dt_txt)
        console.log("Data list",data[0].city.name)
        console.log("temp",weather[0].main.temp);
        todaysTemp.textContent = "Temp: "+ weather[0].main.temp+" C";
        todaysWind.textContent = "Wind: "+ weather[0].wind.speed+" Meters/Second";
        todaysHumidty.textContent = "Humidity: " + weather[0].main.humidity+"%";
        cityNameHeader.textContent = data[0].city.name;

        constructWeatherCards(cityName,date,imgUrl,temp,wind,humidity);
    });

    

});









function weatherApi(lat,lon) {
    //*this url is for getting the weather
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+weatherApiKey+"&units=metric"; 
    let data = [];
    return getApi(url)
    .then(function(weather){
        //
    
       data.push(weather[0]);
       return data;
    });
}

function getCoordinate(city){
    //*this url is for turning city names into latitude and longtitude
    let url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+weatherApiKey; 
    return getApi(url)
        .then(function(fetchData){
            let x = fetchData[0]
            
            return weatherApi(x[0].lat,x[0].lon)
           
        }).catch(function(error){
            searchValue.value = "";
            searchValue.setAttribute("placeholder","Please enter a real city");
            console.log("name a city");
        })
    
}
//async await


//*This function just geta the data for you from a specific url.
function getApi(requestUrl) {
    let dataReturn = [];
    return fetch(requestUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data){
        dataReturn.push(data);
        return dataReturn;
    });
    
 };

 function constructWeatherCards(name,date,img,temp,wind,humidity) {
    
    let card = document.createElement("div");
    card.setAttribute("class","weather-card-template")

    let cardName = document.createElement("h3");
    cardName.textContent = name;
    cardName.setAttribute("id","card-city-name")
    card.appendChild(cardName);

    let cardDate = document.createElement("h4");
    cardDate.setAttribute("id","card-date");
    cardDate.textContent = date;
    card.appendChild(cardDate);

    let cardImg = document.createElement("img");
    cardImg.setAttribute("src",img);
    card.appendChild(cardImg);

    let cardTemp = document.createElement("p");
    cardTemp.setAttribute("id","card-details");
    cardTemp.textContent = "Temp: "+temp+" C";
    card.appendChild(cardTemp);

    let cardWind = document.createElement("p");
    cardWind.setAttribute("id","card-details");
    cardWind.textContent = "Wind: "+wind+" Meters/Second";
    card.appendChild(cardWind);

    let cardHumidity = document.createElement("p");
    cardHumidity.setAttribute("id","card-details");
    cardHumidity.textContent = humidity+"%";
    card.appendChild(cardHumidity);

    fiveDayForecast.appendChild(card);


 };

//  <div class="weather-card-template">
//                 <h3 id="card-city-name">Vancouver</h3>
//                 <h4 id="card-date">Date</h4>
//                 <img id="weather-icon" src="Assets/Images/cloud.jpg">
//                 <p id="card-details">Temp:</p>
//                 <p id="card-details">Wind:</p>
//                 <p id="card-details">Humidity:</p>
//             </div>