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
                        timeout:10000 
                    }
                );
                return deferred.promise;
            };
            return this;
        });


weatherForecastApp.factory('fetchWeather', function($q, $http) {
    this.key = '20d5975a307c88f89e58d0541ce81bb6';
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&units=metric&appid='+this.key;

    this.byCountryOrPostCode = function(query) {
        var deferred = $q.defer();

            $http.jsonp(this.apiUrl + '&q=' + encodeURI(query)).then(
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

    this.byfetchedLocation = function(coordinates) {
        var deferred = $q.defer();

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
