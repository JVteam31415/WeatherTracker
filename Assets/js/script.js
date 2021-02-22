
var API_KEY = config['API_KEY'];
var submitButton = document.querySelector('#submit-city');
var cityNameInput = document.querySelector('#city-name');
var lastInput = "";
var current = document.getElementById("current");
var forecastDays = document.getElementById("forecast")

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

    addFiveday(newCity);

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
        var uv = UV(coords["lat"],coords["lon"]);
        console.log(coords, weather, wind, hum, temp);
        console.log()
        console.log(current.children)
        for( var i = 0;i<current.childNodes.length;i++){
            console.log("node "+i+":"+current.childNodes[i])
        }
        current.childNodes[0].nodeValue = cityName+" "+moment().format("MM/DD/YYYY") 
        current.childNodes[2].nodeValue = "Temperature:"+(9*(temp-273.15)/5+32) +" F"
        current.childNodes[4].nodeValue = "Humidity"+hum+"%"
        current.childNodes[6].nodeValue ="Wind speed"+wind+" mph" 
        current.childNodes[8].nodeValue="UV:"+uv;
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
        //console.log(data.list);
        for(var i=1;i<6;i++){
            var element = "day"+i
            var thisDay = document.getElementById(element);
            console.log(thisDay.children)
            console.log(i+" "+thisDay.children[0]+element);
            thisDay.children[0].textContent = moment().add(i,"days").format("MM/DD/YYYY");
            console.log(data.list[i].main)
            thisDay.children[2].textContent = "Temperature:"+(9*(data.list[i].main.temp-273.15)/5) +" F";
            thisDay.children[3].textContent = "Humidity:"+data.list[i].main.humidity +"%";
        }
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
        console.log("hello console, line 75"+data.value);
        current.childNodes[8].nodeValue="UV:"+data.value;
        return data.value;
    })
}

function addToMem(cityName){

}

submitButton.addEventListener('click', pickCity);