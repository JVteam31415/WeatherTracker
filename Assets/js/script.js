
var API_KEY = config['API_KEY'];
var submitButton = document.querySelector('#submit-city');
var cityNameInput = document.querySelector('#city-name');
var lastInput = "";

if(!localStorage.getItem("numberWeatherCities")){
    localStorage.setItem("numberWeatherCities", 0);
}

function pickCity(){
    var newCity="";
    if(cityNameInput.value){
        newCity=cityNameInput.value;
    }

    console.log(newCity);
    
    addForecast(newCity);



}
function addForecast(cityName){
    var fetchURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+"&appid="+API_KEY;
    fetch(fetchURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
        //Temp, humidity, windspeed, uv
        var coords = data.coord
        var weather= data.weather.main;
        var wind = data.wind.speed;
        var hum = data.main.humidity;
        var temp = data.main.temp;
        var uv = UV(coords[0],coords[1]);
        console.log(coords, weather, wind, hum, temp);

    })
}

function addFiveday(cityName){
    var fetchURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+"&appid="+API_KEY;
    fetch(fetchURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
        //for each day
            //Temp, humidity, weather symbol
        //add to list
    })
}
function UV(lat, long){
    var fetchURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+long +"&appid="+API_KEY;
    fetch(fetchURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
        return data.value;
    })
}

function addToMem(cityName){

}

submitButton.addEventListener('click', pickCity);