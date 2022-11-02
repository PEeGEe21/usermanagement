var myApp = angular.module("myApp", ['ui.router', 'ngMaterial', 'md.data.table', 'fixed.table.header', 'LocalStorageModule']);

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  
    var helloState = {
      name: 'home',
      url: '/',
      templateUrl: 'pages/main.html',
      controller: 'mainController'

    }
  
    var userState = {
      name: 'users',
      url: '/users',
      templateUrl: 'pages/users.html',
      controller: 'userController'
    }

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: 'pages/login.html',
      controller: 'loginController'
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(userState);
    $stateProvider.state(loginState);

    $urlRouterProvider.otherwise('login');



    $httpProvider.interceptors.push(['$q', 'localStorageService', '$location', '$interval', '$injector', function ($q, localStorageService, $location, $interval, $injector) {
      
      // var storage_token = JSON.parse( localStorage.getItem("ls.token") ) ;

      return {
          'request': function (config) {
              var token = localStorageService.get('token');
              config.headers = config.headers || {};
              if (token) {
                  console.log("enterssss request")
                  config.headers.Authorization = 'Bearer ' + token;

                  
              }
              return config;
          },
          'responseError': function (rejection) {

              var deferred = $q.defer();
              if (rejection.status === 401 || rejection.status === 403) {

                  var loginService = $injector.get('loginService');
                  loginService.refreshToken().then(function (response) {

                    console.log("calling refresh")
                    var config = rejection.config;
                      // _retryHttpRequest(rejection.config, deferred);
                      var _retryHttpRequest = function (config, deferred) {
                        $http = $injector.get('$http');
                        $http(config).then(function (response) {
                          console.log("success", response)
                          deferred.resolve(response);
                            
                        }, function (response) {
                          console.log(response, "errorr")
                            deferred.reject(response);
                        });
                      }
                      _retryHttpRequest(config, deferred);
                  }, function (response) {
                      loginService.logout();
                      $location.path('/login');
                      deferred.reject(response);
                  });
              } else {
                  deferred.reject(rejection);
              }
              return deferred.promise;
              // if (rejection.status === 401 || rejection.status === 403) {
              //     var loginService = $injector.get('loginService');
              //     loginService.refreshToken();
              //     // $location.path('/login');
              // }
              // return $q.reject(rejection);
          }
          
      };

      // return service;

      // var _retryHttpRequest = function (config, deferred) {
      //   $http = $http || $injector.get('$http');
      //   $http(config).then(function (response) {
      //       deferred.resolve(response);
      //   }, function (response) {
      //       deferred.reject(response);
      //   });
      // }








      


    }]);






    // (['$q', '$location', '$localStorage', function ($q, $location, $localStorage)

    // $httpProvider.interceptors.push(function($q) {
    //   console.log("workssss")
    //       return {
    //       'request': function (config) {
    //         console.log('entereess')
    //           config.headers = config.headers || {};
    //           if (loginService.getCurrentToken) {
    //             console.log("founddddd")
    //               config.headers.Authorization = 'Bearer ' + $localStorage.token;
    //           }
    //           return config;
    //       },
    //       'responseError': function (response) {
    //           if (response.status === 401 || response.status === 403) {
    //               $location.path('/login');
    //           }
    //           return $q.reject(response);
    //       }
    //   }
    // });

     
    // $httpProvider.interceptors.push('myHttpInterceptor');



    



  });

  

//  myApp
//   .config([
//   '$stateProvider',
//   '$urlRouterProvider',
//   function($stateProvider, $urlRouterProvider) {
  
//     $stateProvider
//       .state('home', {
//         url: '/',
//         templateUrl: 'pages/main.html',
//         controller: 'appController'
//       });
  
//     $urlRouterProvider.otherwise('home');
//   }])
  

myApp.controller('appController', function($scope, $rootScope, $state, $location, loginService){
    $scope.hello = 'Hello World'

    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
      $scope.showSubMenu =  currentStateName === 'login' ? false : true;
    }) 


  $scope.logout = function(){
    loginService.logout();
    $location.path('/login');
  }

  // if(loginService.checkIfLoggedIn())
  //   $scope.showSidebar = true

  if(!loginService.checkIfLoggedIn())
    $location.path('/login');



});





