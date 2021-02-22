# WeatherTracker

This project was conducted to create a current and future forecast for a user given city. 

The Project has a text field at the top for a user to enter a city name. When a city name is enetered and the button pressed, the site calls to https://openweathermap.org/api to get current weather and the weather for 24 hours from now, 48, and so on for the next five days. For today's weather, a temperature, wind speed, Humidity, UV index, and image of the general category are given. THe UV index is colored based on how high it is, from Green, to Yellow, Orange, Red, and Violet for a UV index of 11+. For each forecasted day, an image of the expected weather is given, along with an expected temperature, and Humidity.

Once a city is searched for, its name is added to "Search History" and can be clicked to search again. This list is stored locally.

I learned how to use server APIs, notably the weather one, and how to give elements in the html file new classes from the js file.

I, James VanderKam, worked alone on this assignment.

Website deployed here: https://jvteam31415.github.io/WeatherTracker/