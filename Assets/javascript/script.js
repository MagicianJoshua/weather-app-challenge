var fiveDayForecast = document.querySelector(".five-day-forecast");
var cityListContainer = document.querySelector("#city-list");
var weatherApiKey = "873f105b79ecbeb04cce992c7848ed45";
// attach input from html

//if the user type in the city
getCoordinate("london");

function weatherApi(lat,lon) {
    console.log('trigger')
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+weatherApiKey; //this url is for getting the weather
    return getApi(url)
    .then(function(weather){
        //
        console.log('weather', weather)
       
    });
}

function getCoordinate(city){
    let url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+weatherApiKey; //this url is for turning city names into lat and longtitude
    return getApi(url)
        .then(function(fetchData){
            let x = fetchData[0]
            console.log("x",x);
            return weatherApi(x[0].lat,x[0].lon)
           
        });
    
}
//async await

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