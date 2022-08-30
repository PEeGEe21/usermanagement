
myApp.factory('loginService', ['$http', 'localStorageService', function($http, localStorageService) {

    function checkIfLoggedIn() {

        if(localStorageService.get('token'))
            return true;
        else
            return false;

    }

    function signup(name, email, password, onSuccess, onError) {

        $http.post('/api/auth/signup', 
        {
            name: name,
            email: email,
            password: password
        }).
        then(function(response) {

            localStorageService.set('token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){
        $http.post('http://127.0.0.1:8000/api/auth/login', 
        {
            email: email,
            password: password
        }).
        then(function(response) {

            // console.log(response.data.data);
            if(response.data.success === true){
                // $scope.loginerror = response.data.message;
                localStorageService.set('token', response.data.data);
            }

            // localStorageService.set('token', response.data);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function logout(){

        localStorageService.remove('token');

    }

    function getCurrentToken(){
        return localStorageService.get('token');
    }

    function updatestorage(data) {
        localStorageService.set('token', data);
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentToken: getCurrentToken,
        updatestorage: updatestorage
    }

}]);