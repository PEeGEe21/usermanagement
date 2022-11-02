myApp.controller('loginController', ['$scope', '$http', '$location', 'loginService',  function($scope, $http, $location, loginService){
    $scope.name = 'PraiseGod'




        $scope.login = function() {
            loginService.login(
                $scope.email, $scope.password,
                function(response){
                    // alert('It stopped here');
                    if(response.data.success === false){
                        $scope.loginerror = response.data.message;
                    }else{
                        $location.path('/');
                    }

                    // console.log(response);
                },
                function(response){
                    $scope.loginerror = response.data.message;

                    // alert('Something went wrong with the login process. Try again later!');
                    // console.log(response)
                }
            );
        }
    
        $scope.email = '';
        $scope.password = '';
    
        if(loginService.checkIfLoggedIn())
            $location.path('/');
    

}]);

