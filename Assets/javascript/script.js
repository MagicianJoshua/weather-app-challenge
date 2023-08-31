var fiveDayForecast = document.querySelector(".five-day-forecast");
var cityListContainer = document.querySelector("#city-list");
var weatherApiKey = "873f105b79ecbeb04cce992c7848ed45";


getCoordinate("london");

function weatherApi(lat,lon) {
    let url = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+weatherApiKey; //this url is for getting the weather
    // let fetch = getApi(url);
    // console.log("Weather: "+ fetch)

}

function getCoordinate(city){
    let url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+weatherApiKey; //this url is for turning city names into lat and longtitude
    
    console.log(getApi(url));
}


function getApi(requestUrl) {
    
    let dataReturn = [];
    
    fetch(requestUrl).then(function (response) {
        // console.log("Response Status: "+response.status);\
        
        return response.json()
    })
    .then(function (data){
        for (i = 0; i < data.length; i++){
            dataReturn.push(data[i]);
            
        }  
        
        
    });
    
    return dataReturn;
    
 }