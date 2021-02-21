
var API_KEY = config.API_KEY;



function pickCity(){
    
}
function addForecast(cityName){
    var fetchURL = 'api.openweathermap.org/data/2.5/weather?id='+cityName+"&appid="+API_KEY;
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

    })
}

function addFiveday(cityName){
    var fetchURL = 'api.openweathermap.org/data/2.5/forecast?q='+cityName+"&appid="+API_KEY;
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
    var fetchURL = 'api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+long
    fetch(fetchURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
        return data.value;
    }
}