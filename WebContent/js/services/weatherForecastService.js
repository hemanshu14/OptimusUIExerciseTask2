weatherForecastApp.factory('fetchLocation', function($q) {
            this.getLocation = function() {
                var deferred = $q.defer();

                navigator.geolocation.getCurrentPosition(
                    function(result) {
                        deferred.resolve(result);
                    },
                    function(error) {
                        var errorMessages = [
                            "Sorry, Your browser denied the request for fetching the location."
                        ];
                        deferred.reject(error);
                    },{
                        timeout:5000 //stop searching for position after 5 seconds
                    }
                );
                // Return a promise.
                return deferred.promise;
            };
            return this;
        });


weatherForecastApp.factory('fetchWeather', function($q, $http) {
    this.key = '20d5975a307c88f89e58d0541ce81bb6';
    //prepare the base api url containing, metric and appid
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&units=metric&appid='+this.key;

    // function to get weather by city name or post code
    this.byCountryOrPostCode = function(query) {
        var deferred = $q.defer();

        // Call the API using JSONP and pass the search criteria (query) to the q parameter of the API.
            $http.jsonp(this.apiUrl + '&q=' + encodeURI(query)).then(
            function(response) {
                var statusCode = parseInt(response.data.cod);

                if (statusCode === 200) {
                    // Call successful.
                    deferred.resolve(response.data);
                }
                else {
                    // Something went wrong. Probably the city doesn't exist.
                    deferred.reject(response.data.message);
                }
            },
            function(error) {
                // Unable to connect to API.
                deferred.reject(error);
            }
        );
        // Return a promise.
        return deferred.promise;
    };

    // function to get weather by city name or post code
    this.byfetchedLocation = function(coordinates) {
        var deferred = $q.defer();

        // Call the API using JSONP and pass the latitude and longitude to the API
        $http.jsonp(this.apiUrl + '&lat=' + coordinates.latitude + '&lon=' + coordinates.longitude).then(
            function(response) {
                var statusCode = parseInt(response.data.cod);

                if (statusCode === 200) {
                    deferred.resolve(response.data);
                }
                else {
                    deferred.reject(response.data.message);
                }
            },
            function(error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    };

    return this;
});
