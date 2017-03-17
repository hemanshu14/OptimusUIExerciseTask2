
var weatherForecastApp = angular.module('weatherForecastApp',[]);

weatherForecastApp.controller('WeatherController', function($scope, $window, fetchLocation, fetchWeather) {
    // Update current weather.
    $scope.updateWeather = function() {
    	fetchLocation.getLocation().then(
            function(pos) {
            	fetchWeather.byfetchedLocation(pos.coords).then(
                    function(weather) {
                        //assign the various sections of the return data for easier referencing
                        $scope.weatherFound = true;
                        $scope.currentWeather = weather;
                        $scope.weather = weather.weather[0];
                        $scope.other = weather.main;
                        $scope.wind = weather.wind;
                        $scope.clouds = weather.clouds;
                        $scope.country= weather.sys;
                        $scope.locationName = weather.name;
                        $scope.getDate = weather.dt;
                        $scope.latlong = weather.coord;
                    },
                    function(error){
                        alert('Sorry, we are unable to get weather by geolocation. Please refresh your browser.');
                    }
                );
            }
        );
    };
    // Update local weather when app starts or page refresh.
    $scope.updateWeather();
})







        // Weather Service to communicate with OpenWeatherMap API.
        
        //manually provide the post code or country name
      weatherForecastApp.controller('manualWeatherCtrl',function($scope,fetchWeather){
            $scope.SearchWeather = function() {
            	
            	if($scope.inputParam=="" || $scope.inputParam==undefined){
            		alert("Please provide input to fetch weather.");
            	}
            	
            	else{
            	fetchWeather.byCountryOrPostCode($scope.inputParam).then(
                    function(weather){
                        //assign the various sections of the return data for easier referencing
                        $scope.weatherFound = true;
                        $scope.currentWeather = weather;
                        $scope.weather = weather.weather[0];
                        $scope.other = weather.main;
                        $scope.wind = weather.wind;
                        $scope.clouds = weather.clouds;
                        $scope.country= weather.sys;
                        $scope.locationName = weather.name;
                        $scope.getDate = weather.dt;
                        $scope.latlong = weather.coord;
                    },
                    function(error){
                        alert('Sorry, we are unable to get weather by provided city name or postcode. Please check your input and try again.');
                    }
                );
            }
            }
      });
            
            
            
            
            
            
            
            
            
            
            
            
            
            
       