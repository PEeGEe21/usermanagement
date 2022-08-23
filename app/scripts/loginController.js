myApp.controller('loginController', ['$scope', '$http', function($scope, $http){
    $scope.name = 'PraiseGod'

    $scope.show = 'false'
    $scope.selected = [];
    $scope.filterName = [];


     
    // function success(desserts) {
    //     $scope.desserts = desserts;
    // }
    
    // $http.get('data/data.json').success(function(result){
    //   console.log($scope.nutritions = result);
    // }).error(function(data, status){
    //   console.log(data);
    // })

    // $scope.getDesserts = function () {
    //    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    // };


}]);