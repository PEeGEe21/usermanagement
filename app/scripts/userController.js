myApp.controller('userController', ['$scope', '$http', function($scope, $http){
    $scope.name = 'PraiseGod'

    $scope.show = 'true'
    $scope.selected = []

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };


    $scope.newUser = {};
    

    $scope.addUser = function(){
      // console.log({newUser: $scope.newUser});

      $http.post('http://127.0.0.1:8000/api/users/create', {
        newUser: $scope.newUser 
      }).success(function(result){
        
        console.log($scope.users = result.users.data);
        $scope.newUser = {};

      }).error(function(data, status){
        console.log(data);
      })
   
    }


    $http.get('http://127.0.0.1:8000/api/users').success(function(result){
      console.log($scope.users = result.users.data);
    }).error(function(data, status){
      console.log(data);
    })

  

}]);