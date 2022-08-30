var myApp = angular.module("myApp", ['ui.router', 'ngMaterial', 'md.data.table', 'fixed.table.header', 'LocalStorageModule']);


  


myApp.config(function($stateProvider, $urlRouterProvider ) {
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





