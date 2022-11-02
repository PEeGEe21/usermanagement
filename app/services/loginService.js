


myApp.factory('loginService', ['$q', '$http', 'localStorageService', '$interval', '$injector', function($q, $http, localStorageService, $interval, $injector) {

    var address = 'http://usermanagement.test'

    function checkIfLoggedIn() {

        if(localStorageService.get('token'))
            return true;
        else
            return false;

    }


    var refreshToken = function ()
    {
        var deferred = $q.defer();
       
        var authData = localStorageService.get('token');

        if (authData) {

            // var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

            // localStorageService.remove('token');

            // $http = $http || $injector.get('$http');
            $http.post(`${address}/api/refresh`).success(function (response) {
                console.log('token', response.access_token)

                // localStorageService.remove('token');
                localStorageService.set('token', response.access_token);
                localStorageService.set('expires_in', response.expires_in);

                deferred.resolve(response);

            }).error(function (err, status) {
                console.log(err, "errorrr")
                logout();
                deferred.reject(err);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise;
    };


        // var getRefreshToken = function () {
        //     refreshToken();
        // }
        // $interval(getRefreshToken, 60000); 


      






    // function getAuthorizationHeader() {
                            
    //       if (localStorageService.get('token') && localStorageService.get('expires_on') > moment(new Date().getTime()).unix()) {
    //         console.log("works")        
    //       } else {
    //         return $http.post('http://127.0.0.1:8000/api/refresh').then(
    //           response => {
    //             const data = response.data;

    //             token = data.token;
    //             expires_in = data.expires_in;
    //             // localStorageService.set('token');
    //             localStorageService.set('token', token);
    //             localStorageService.set('expires_in', expires_in); 
    //           }, 
    //           err => {
    //             console.log('Error refreshing token ' + err)
    //           }
    //         );
    //       }
    //     }

        // getAuthorizationHeader();

    function signup(name, email, password, onSuccess, onError) {

        $http.post('/api/auth/signup', 
        {
            name: name,
            email: email,
            password: password
        }).
        then(function(response) {

            localStorageService.set('user', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){
        $http.post(`${address}/api/auth/login`, 
        {
            email: email,
            password: password
        }).
        then(function(response) {

            // console.log(response.data.data);
            if(response.data.success === true){
                // $scope.loginerror = response.data.message;
                
                localStorageService.set('user', response.data.user);
                localStorageService.set('token', response.data.token);
                localStorageService.set('expires_in', response.data.expires_in);
            }

            // localStorageService.set('token', response.data);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    // function logout(){

    //     localStorageService.remove('user');
    //     localStorageService.remove('token');

    // }

    function logout(){
        // $http.post(`${address}/api/auth/logout`
        // ).success(function (response) {
        //     console.log("logged out")

        // }).error(function (err, status) {
        //     console.log(err)
        // });

        // .then(function(response) {
        //     onSuccess(response);
        // }, function(response) {

        //     onError(response);

        // });

        localStorageService.remove('user');
        localStorageService.remove('token');
        localStorageService.remove('expires_in');

    }

    
    // function refresh(){
    //     $http.get('http://127.0.0.1:8000/api/refresh', 
    //     {
    //         headers: {
    //         "Authorization": 'Bearer ' + localStorageService.get('token')
    //       }}).
    //     then(function(response) {
    //         // onSuccess(response);
    //     }, function(response) {

    //         // onError(response);

    //     });

    // }
    // refresh();

    // userlogout();

    function getCurrentUser(){
        return localStorageService.get('user');
    }
    function getCurrentToken(){
        return localStorageService.get('token');
    }

    function updatestorage(data) {
        localStorageService.set('user', data);
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getCurrentToken: getCurrentToken,
        updatestorage: updatestorage,
        refreshToken: refreshToken,
        // getAuthorizationHeader: getAuthorizationHeader
    }

}]);