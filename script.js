$(document).ready(function () {
    var citySearched;
    var queryURLCurrent;
    var queryURLForecast;
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


            $('.icon').attr('src', iconURL);

            console.log(cityName);

            console.log(currentTemperature);
            $('.current-temperature').append(currentTemperature);


            console.log(currentHumidity);
            
            $('.current-humidity').append(currentHumidity);

            console.log(windSpeed);
            $('.wind-speed').append(windSpeed);

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
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        })

            .then(function (forecastResponse) {

                // Log the queryURL
                // console.log('forecastResponse', forecastResponse);
                var m = moment();
                console.log("moment", moment());

                var currentDate = m.format('L');
                console.log('currentDate', currentTime);

                var day1 = $('#forecast-date1');
                var day2 = $('#forecast-date2');
                var day3 = $('#forecast-date3');
                var day4 = $('#forecast-date4');
                var day5 = $('#forecast-date5');

                day1 = currentDate;
                console.log(day1);
                $('#forecast-date1').append(day1);
                // var dateTimeFromForecastResponse = forecastResponse.list[0].dt_txt;
                // var split = dateTimeFromForecastResponse.split(' ');
                // console.log('split', split);
                // var forecastDate = $('.forecast-date');
                // for (let index = 0; index < forecastDate.length; index++) {
                //     $(this).append(forecastResponse.list[0].dt_txt);
                //     console.log('forecastDate.lenth', forecastDate.length);
                    
                // }


                // for (let index = 0; index < forecastResponse.list.length; index++) {
                //     if (forecastResponse.list[index].dt_txt === '15:00:00') 
                //     //extract time from date/time string, use formatter to get th hour, js date object or use moment.js. look up split and join methods to get only 15:00:00 from string
                //     //add



                //             //loop through the day-# ids and set condition of i to start at 1 and stop at 5. Write code to change HTML based on objects
                //         });
                // }


            })


    }
});

