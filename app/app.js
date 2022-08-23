var myApp = angular.module("myApp", ['ui.router', 'ngMaterial', 'md.data.table', 'fixed.table.header']);


myApp.config(function($stateProvider ) {
    var helloState = {
      name: 'home',
      url: '/',
      templateUrl: 'pages/main.html',
      controller: 'appController'

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
  


myApp.controller('appController', function($scope){
    $scope.hello = 'Hello World'
    console.log("workinggg")
});


