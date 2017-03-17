
var weatherForecastApp = angular.module('weatherForecastApp',[]);

weatherForecastApp.controller('WeatherController', function($scope, $window, fetchLocation, fetchWeather) {
    $scope.updateWeather = function() {
    	fetchLocation.getLocation().then(
            function(pos) {
            	fetchWeather.byfetchedLocation(pos.coords).then(
                    function(weather) {
                        $scope.weatherFound = true;
                        $scope.weatherReport = weather;
                        $scope.weather = weather.weather[0];
                        $scope.other = weather.main;
                        $scope.windReport = weather.wind;
                        $scope.cloudsReport = weather.clouds;
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
    $scope.updateWeather();
})







        
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
                        $scope.weatherReport = weather;
                        $scope.weather = weather.weather[0];
                        $scope.other = weather.main;
                        $scope.windReport = weather.wind;
                        $scope.cloudsReport = weather.clouds;
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
       