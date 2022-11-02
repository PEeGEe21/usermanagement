$provide.factory('myHttpInterceptor', function($q) {
    return {
        'request': function (config) {
          console.log('entereess')
            config.headers = config.headers || {};
            if (loginService.getCurrentToken) {
              console.log("founddddd")
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function (response) {
            if (response.status === 401 || response.status === 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        }
    }
});

