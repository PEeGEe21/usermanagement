myApp.controller('mainController', function($scope, $location, $http, loginService ){
    $scope.hello = 'Hello World'
    // console.log("workinggg")



  $scope.logout = function(){
    loginService.logout();
    $location.path('/login');
  }

  if(!loginService.checkIfLoggedIn())
    $location.path('/login');

    $scope.getItem = function(){
      $scope.loggedInUser = loginService.getCurrentToken();
    }
    $scope.getItem();


    $scope.noofstudents = function(){
        $http.get('http://127.0.0.1:8000/api/users/students').success(function(response){
          $scope.students = response.students
        //   $scope.students = response.students.length
          // console.log($scope.total = result);
      
          }).error(function(data, status){
            console.log(data);
          }) 
      }
      
      $scope.noofstudents();


    $scope.noofparents = function(){
        $http.get('http://127.0.0.1:8000/api/users/parents').success(function(response){
          $scope.parents = response.parents
        //   $scope.students = response.students.length
          // console.log($scope.total = result);
      
          }).error(function(data, status){
            console.log(data);
          }) 
      }
      
      $scope.noofparents();

    // $scope.showSubMenu = true;

    // $scope.$watch(function(){
    //     return $state.$current.name
    // }, function(currentStateName){
    //   $scope.showSubMenu =  currentStateName === 'login' ? false : true;
    // }) 
});