$(document).ready(function () {
    var citySearched;
    var queryURLCurrent;
    var queryURLForecast;
    var forecastDate = $('.date');
    var searchBtn = $('#search-btn');
    var APIKey = "69299ee3f1473733a3c1d646aa060339";



    // Here, after the user clicks the search button, we run our AJAX calls with the Current and Forecast weather URLs to the OpenWeatherMap API

    searchBtn.click(function () {
        event.preventDefault();

        citySearched = $('#text-search').val();

        // Here we are building the URL we need to query the database for current weather
        queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&units=imperial&appid=" + APIKey;

        // Here we are building the URL we need to query the database for a 5 day forcast
        queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&units=imperial&appid=" + APIKey;
        console.log('queryURLForecast', queryURLForecast);
        currentResponse();
        console.log('citySearched', citySearched);
    })

    function currentResponse() {
        citySearched = $('.city-date');
        citySearched.empty();
        currentTemperature = $('.current-temperature');
        currentTemperature.empty();
        currentHumidity = $('.current-humidity');
        currentHumidity.empty;
        windSpeed = $('.wind-speed');
        windSpeed.empty();

        $.ajax({
            url: queryURLCurrent,
            method: "GET"
        }).then(function (currentResponse) {

            // Log the queryURL
            console.log('currentResponse', currentResponse);

            var cityName = currentResponse.name;
            var currentIcon = currentResponse.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
            var currentTemperature = currentResponse.main.temp;
            var currentHumidity = currentResponse.main.humidity;
            var windSpeed = currentResponse.wind.speed;

            $('.city-date').prepend(cityName);

            var m = moment();
            console.log("moment", moment());

            var currentDate = m.format('L');
            $('.city-date').append(' (' + currentDate + ')');


            $('#current-icon').attr('src', iconURL);

            console.log(cityName);

            console.log(currentTemperature);
            $('.current-temperature').append('Temperature: ', currentTemperature, ' \xB0', 'F');


            console.log(currentHumidity);

            $('.current-humidity').append('Humidity: ', currentHumidity, '%');

            console.log(windSpeed);
            $('.wind-speed').append('Wind Speed: ', windSpeed, ' MPH');

            // uv index api. color background based on the value. connect with lat and long. take lat and long in currentResponse, save it, then do the ajax call for the UV Index API

            var lat = currentResponse.coord.lat;
            var lon = currentResponse.coord.lon;
            console.log("lat and lon", lat, lon);

            queryURLUVI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
            // function () {
            $.ajax({
                url: queryURLUVI,
                method: "GET"
            })
                .then(function (response) {
                    var uvIndex = $('.uv-index');
                    uvIndex.empty();
                    $('.uv-index').append(response.value);
                    //look up .catch-- if it a failure, not success
                    console.log(response);

                    var uvIndex = response.value
                    if (uvIndex < 2) {
                        $('.uv-index').addClass('low');
                    }

                    else if (uvIndex >= 3 && uvIndex <= 7) {
                        $('.uv-index').addClass('medium');
                    }

                    else {
                        $('.uv-index').addClass('high')
                    }

                });
        })
        forecastResponse();
    }


    function forecastResponse() {
        date = $('.date');
        date.empty();
        fTemp = $('forecast-temperture');
        fTemp.empty();
        fHumidity = $('.forecast-humidity')
        fHumidity.empty();

        $.ajax({
            url: queryURLForecast,
            method: "GET"
        })

            .then(function (forecastResponse) {

                forecastDate.each(function (index) {
                    var dateStr = forecastResponse.list[index * 8 + 4].dt_txt;
                    var thisForecast = forecastResponse.list[index * 8 + 4];
                    dateStr = dateStr.split(' ');
                    dateStr = dateStr[0].split('-');
                    dateStr = dateStr[1] + '/' + dateStr[2] + '/' + dateStr[0];
                    $(this).append(dateStr);
                    console.log('forecastDate.length', forecastDate.length);
                        
                    var icon = $(this).siblings('img');
                    icon.attr('src', "http://openweathermap.org/img/wn/" + thisForecast.weather[0].icon + "@2x.png");

                    var temp = $(this).siblings('p:nth-child(3)');
                    var thisTemp = thisForecast.main.temp;
                    temp.append(thisTemp, ' \xB0', 'F');

                    var humidity = $(this).siblings('p:nth-child(4)');
                    var thisHumidity = thisForecast.main.humidity;
                    humidity.append('Humidity: ', thisHumidity, '%');

                })
            })
    storeCities();
    }

    function storeCities () {
        
    }


})


