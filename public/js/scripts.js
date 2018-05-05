var app = angular.module('smartMirror', []);

app.controller('clockCtrl', function($rootScope,$scope, $interval) {
  // Clock function that updates time every second
  $scope.clock = Date.now();
  $scope.hour = new Date().getHours();

  var tick = function(){
    // Constantly updates the time and checks to see if there has been a change in time.
    $scope.clock = Date.now();
    var hour2 = new Date().getHours(); //used for comparisons
    if ($scope.hour != hour2){ // hour has chanc
      console.log("New hour");
      $scope.hour = hour2;
      $rootScope.$broadcast("UpdateHour")
    }
    console.log($scope.hour);
  }
  $interval(tick, 1000);
});

app.controller('weatherCtrl', function($http, $rootScope, $scope, weatherService, forecastService) {
  // Controls the data related to weather display

  $http.get("json/config.json").then(function(response) {
    // Load JSON containing configuration settings
    console.log("Loading: Startup configuration file");
    localStorage.setItem('config',angular.toJson(response.data));
  });

  $http.get("json/images.json").then(function(response){
    // Load JSON containing configuration settings
    console.log("Loading: Image information file");
    localStorage.setItem('images',angular.toJson(response.data));
  });

  // Save contents from file into $scope for easy access
  $scope.config = JSON.parse(localStorage.getItem('config'));
  $scope.images = JSON.parse(localStorage.getItem('images'));

  // Call the weather and forecaste services to make weather information available
  weatherService.getWeather($scope.config.API_key, $scope.config.City).then(function(data){
    $scope.weather = JSON.parse(data);
  });

  forecastService.getForecast($scope.config.API_key, $scope.config.City).then(function(data){
    $scope.forecast = JSON.parse(data);
  });

  // Function that converts date into date object
  $scope.formatDate = function(date){
    return new Date(Date.parse(date))
  }
  // Functions to convert Kelvin into Celsius or Farenheit
  $scope.toCelsius = function(temp){
    return temp - 273.15
  }

  $scope.toFahrenheit = function(temp){
    return temp * (9/5) - 459.67
  }
  // Retrieve image from Weather description
  $scope.getImage = function(desc){
    var date = new Date().getHours();
    if( 7 < date < 19){
      return $scope.images.Day[desc];
    }
    else {
      return $scope.images.Night[desc];
    }
  }

  $scope.$on('UpdateHour', function(){
    // Remove the old saved weather data
    localStorage.removeItem("weather");
    localStorage.removeItem("forecast");

    // call services to get new data
    weatherService.getWeather($scope.config.API_key, $scope.config.City).then(function(data){
      $scope.weather = JSON.parse(data);
    });

    forecastService.getForecast($scope.config.API_key, $scope.config.City).then(function(data){
      $scope.forecast = JSON.parse(data);
    });

  });
});

app.service('weatherService', function($http, $q){
  // Retrieve JSON file with local weather information
  var weather = localStorage.getItem('weather');
  this.getWeather = function(key, location){
    var deferred = $q.defer();
    if(weather === null){
      $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + key).then(function(data){
        localStorage.setItem('weather',angular.toJson(data));
        console.log("new json added");
        deferred.resolve(data);
      });
    }
    else{
      deferred.resolve(localStorage.getItem('weather'));
      console.log("old json returned");
    }
    return deferred.promise;
  }
});

app.service('forecastService', function($http, $q){
  //Retreive JSON file with local weather forecast
  var forecast = localStorage.getItem('forecast');
  var deferred = $q.defer();
  this.getForecast = function(key, location){
    if(forecast === null){
      $http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=" + key).then(function(data){
        console.log("new json added");
        localStorage.setItem('forecast',angular.toJson(data));
        deferred.resolve(data);
      });
    }
    else{
      deferred.resolve(localStorage.getItem('forecast'));
    }
    return deferred.promise;
  }
});
