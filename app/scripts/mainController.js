myApp.controller('mainController', function($scope, $location, $http, loginService ){
    $scope.hello = 'Hello World'
    // console.log("workinggg")

    var address = 'http://usermanagement.test'


  $scope.logout = function(){
    loginService.logout();
    $location.path('/login');
  }

  if(!loginService.checkIfLoggedIn())
    $location.path('/login');

    $scope.getItem = function(){
      $scope.loggedInUser = loginService.getCurrentUser();
    }
    $scope.getItem();

    
    $scope.getToken = function(){
      $scope.loggedInToken = loginService.getCurrentToken();
      // console.log($scope.loggedInToken)
    }
    $scope.getToken();

    // , {
    //   headers: {
    //   "Authorization": 'Bearer ' + $scope.loggedInToken
    // }}

    $scope.noofusers = function(){
        $http.get(`${address}/api/users/userCount`).success(function(res){
          $scope.userCount = res.users;
          $scope.students = res.students;
          $scope.parents = res.parents;
      
          // console.log(res.users)
          }).error(function(data, status){
            console.log(data);
          }) 
      }
      
      $scope.noofusers();

    // $scope.noofstudents = function(){
    //     $http.get('http://127.0.0.1:8000/api/users/students').success(function(response){
    //       $scope.students = response.students
    //     //   $scope.students = response.students.length
    //       // console.log($scope.total = result);
      
    //       }).error(function(data, status){
    //         console.log(data);
    //       }) 
    //   }
      
    //   $scope.noofstudents();


    // $scope.noofparents = function(){
    //     $http.get('http://127.0.0.1:8000/api/users/parents').success(function(response){
    //       $scope.parents = response.data
    //     //   $scope.students = response.students.length
    //         // console.log(response.data ,"  number of parents");
      
    //       }).error(function(data, status){
    //         console.log(data);
    //       }) 
    //   }
      
      // $scope.noofparents();

    // $scope.showSubMenu = true;

    // $scope.$watch(function(){
    //     return $state.$current.name
    // }, function(currentStateName){
    //   $scope.showSubMenu =  currentStateName === 'login' ? false : true;
    // }) 
});