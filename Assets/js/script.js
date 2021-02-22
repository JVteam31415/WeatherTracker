
var API_KEY = config['API_KEY'];
var submitButton = document.querySelector('#submit-city');
var cityNameInput = document.querySelector('#city-name');
var lastInput = "";
var current = document.getElementById("current");
var forecastDays = document.getElementById("forecast")
var searchHistory = document.getElementById("search-history")


if(!localStorage.getItem("numberWeatherCities") ||!localStorage.getItem("city1")){
    localStorage.setItem("numberWeatherCities", 0);
}
else{
    for(var i=0;i<localStorage.getItem("numberWeatherCities");i++){
        var x = i+1
        var toBeAdded = document.createElement('div');
        toBeAdded.textContent = localStorage.getItem("city"+x);
        toBeAdded.addEventListener("click", function(){
            var newCity = toBeAdded.textContent;
            
            addForecast(newCity);
    
            addFiveday(newCity);
            addToMem(newCity);
        });
        searchHistory.appendChild(toBeAdded);
    }
}

function pickCity(){
    var newCity="";
    if(cityNameInput.value){
        newCity=cityNameInput.value;
    }
    else{
        return;
    }

    console.log(newCity);
    
    addForecast(newCity);

    addFiveday(newCity);
    addToMem(newCity);

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
        var weather= data.weather[0].main;
        var wind = data.wind.speed;
        var hum = data.main.humidity;
        var temp = data.main.temp;
        var uv = UV(coords["lat"],coords["lon"]);
        // console.log(coords, weather, wind, hum, temp);
        // console.log()
        console.log(data)
        console.log(current.children)
        /* for( var i = 0;i<current.childNodes.length;i++){
            console.log("node "+i+":"+current.childNodes[i])
        } */ 
        current.children[0].textContent = cityName+" "+moment().format("MM/DD/YYYY") 
        console.log("today it is "+weather);

        //img
        if(weather=="Clouds"){
            current.children[1].src="./Assets/images/cloud.jpeg"
        }
        else if(weather=="Snow"){
            current.children[1].src="./Assets/images/snow.jpg"
        }
        else if(weather=="Rain"){
            current.children[1].src="./Assets/images/rain.png"

        }
        else if(weather=="Clear"){
            current.children[1].src="./Assets/images/sun.jpg"
        }
        else{
            current.children[1].src="";
        }
        current.children[1].width = 150
        current.children[1].height = 150

        current.children[2].textContent = "Temperature:"+ ~~(9*(temp-273.15)/5+32) +" F"
        current.children[3].textContent = "Humidity"+hum+"%"
        current.children[4].textContent ="Wind speed"+wind+" mph" 
        current.children[5].textContent="UV:"+uv;
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
            thisDay.children[0].textContent = moment().add(i,"days").format("MM/DD/YYYY");
            console.log(data.list[i].weather[0].main)
            //thisDay.children[1].textContent = data.list[i].weather;
            var weather = data.list[i].weather[0].main;
            if(weather=="Clouds"){
                thisDay.children[1].src="./Assets/images/cloud.jpeg"
            }
            else if(weather=="Snow"){
                thisDay.children[1].src="./Assets/images/snow.jpg"
            }
            else if(weather=="Rain"){
                thisDay.children[1].src="./Assets/images/rain.png"

            }
            else if(weather=="Clear"){
                thisDay.children[1].src="./Assets/images/sun.jpg"
            }
            else{
                thisDay.children[1].src="";
            }
            thisDay.children[1].width = 100
            thisDay.children[1].height = 100

            thisDay.children[2].textContent = "Temperature:"+ ~~((9*(data.list[i].main.temp-273.15)/5)+32) +" F";
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
        
        current.children[5].textContent="UV:"+data.value;

        if(data.value<2.5){
            current.children[5].classList.add("green")
        }
        else if(data.value<5.5){
            current.children[5].classList.add("yellow")
        }
        else if(data.value<7.5){
            current.children[5].classList.add("orange")
        }
        else if(data.value<11){
            current.children[5].classList.add("red")
        }
        else{
            current.children[5].classList.add("violet")
        }

        return data.value;
    })
}

function addToMem(cityName){
    var oldnum = localStorage.getItem("numberWeaterCities");
    var newnum = oldnum+1;
    localStorage.setItem("numberWeatherCities",newnum);
    localStorage.setItem("city"+newnum ,cityName)

    var toBeAdded = document.createElement('div');
    toBeAdded.textContent = cityName;
    toBeAdded.addEventListener("click", function(){
        var newCity = toBeAdded.textContent;
        
        addForecast(newCity);

        addFiveday(newCity);
        addToMem(newCity);
    });
    searchHistory.appendChild(toBeAdded);

}

submitButton.addEventListener('click', pickCity);