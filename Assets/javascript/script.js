var fiveDayForecast = document.querySelector(".five-day-forecast");
var cityListContainer = document.querySelector("#city-list");
var weatherApiKey = "873f105b79ecbeb04cce992c7848ed45";
var searchbtn = document.querySelector("#search-btn");
var searchValue = document.querySelector("#city-search");
var todaysTemp = document.querySelector("#todays-temp");
var todaysWind = document.querySelector("#todays-wind")
// attach input from html

//* if the user type in the city


searchbtn.addEventListener("click", function(event){
    let searchText = searchValue.value;
    getCoordinate("london");
});

getCoordinate("jerusalem").then(function(data){
    let weather = []
    
    for (let i = 0; i < 5; i++){
        weather.push(data[0].list[i])
        
    }
    console.log("Data list",data[0].list[0])
    console.log("temp",weather[0].main.temp);
    todaysTemp.textContent = "Temp: "+ weather[0].main.temp+" C";
    todaysWind.textContent = "Wind: "+ weather[0].wind.speed+" Meters/Second";
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
    
 }