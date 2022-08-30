myApp.controller('userController', ['$scope', '$http', '$location', '$q', '$timeout', 'loginService', function($scope, $http, $location, $q, $timeout, loginService){




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



    $scope.name = 'PraiseGod'

    $scope.show = 'true'
    $scope.selected = []

    $scope.limitOptions = [5, 10, 15, 25, 50];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1,
      search: ''
    };

    

    // $scope.showSubMenu = true;

    // $scope.$watch(function(){
    //     return $state.$current.name
    // }, function(currentStateName){
    //   $scope.showSubMenu =  currentStateName === 'login' ? false : true;
    // }) 

    

    

    $scope.newUser = {};

    $scope.resetForm = function () {
      $scope.newUser.name = '';
      $scope.newUser.email = '';
      $scope.newUser.password = '';
      // $scope.newUser.roles.id = '';
    };

    $scope.addUser = function(){

      $http.post('http://127.0.0.1:8000/api/users/create', {
        newUser: $scope.newUser 
      }).success(function(result){
        $scope.newUser = {};
        $scope.initPage();
        $scope.resetForm();
      }).error(function(data, status){
        console.log(data);
      })
   
    }

    $scope.editUser = (user) => {
      $scope.existingUser = user;
    };
    
    $scope.resetEditForm = function (user) {
      $scope.existingUser.name = '';
      $scope.existingUser.email = '';
      // $scope.newUser.password = '';
      // $scope.newUser.roles.id = '';
    };
    $scope.saveUserEdit = function(user){
      $http.post(`http://127.0.0.1:8000/api/users/${user.id}/update`, user).success(function(result){
        var us = loginService.getCurrentToken();
        if (us.id === user.id){
          loginService.updatestorage(result.user);
          window.location.reload();
        }
        $scope.initPage();
        $scope.resetEditForm(user);
      }).error(function(data, status){
        console.log(data);
      })

  }

  $scope.deleteCrib = function(user){
    var index = $scope.users.indexOf(user);
    $scope.users.splice(index, 1)

    $http.post(`http://127.0.0.1:8000/api/users/${user.id}/delete`).success(function(result){
      // $scope.users = result.users.data
    }).error(function(data, status){
      console.log(data);
    })

  }



  $scope.getAllUsers = function ( pageNumber = 1 , limit = 5, searchText = '' )
  {
      searchDefer = $q.defer();

      var url = 'http://127.0.0.1:8000/api/users' + "?";

      url = url + '&page='+ pageNumber;

      url = url + '&limit=' + limit;
      
      if(searchText)
          url = url + '&searchText=' + searchText;

      $http.get(url)
          .then(function(data) 
          {
            console.log(data.data.data, "hereee")
            
            $scope.users = data.data;
              searchDefer.resolve(data.data);
          }, function(response) 
          {
              console.log('Something Went Wrong!', response);
          });

      return searchDefer.promise;

  }
  
  $scope.getAllUsers();



  
// $scope.initPage = function(){
//   $http.get('http://127.0.0.1:8000/api/users').success(function(result){
//     $scope.users = result.users;

//     }).error(function(data, status){
//       console.log(data);
//     }) 
// }

// $scope.initPage();
     

                  $scope.logPagination = function (page, limit) 
                    {
                        var searchInput =  $scope.query.search;
                        $scope.getAllUsers ( page , limit, searchInput )
                        .then(function ( data )
                        {
                          console.log(data)
                            $scope.users = data;
                        });
                    }
                    
                  $scope.searchFilter = function()
                    {
                        var page = $scope.query.page;
                        var limit = $scope.query.limit;
                        var searchInput =  $scope.query.search;
                        console.log($scope.query)

                        $scope.getAllUsers( page , limit, searchInput )
                        .then(function ( data )
                        {
                            $scope.users =  data; 
                            // console.log($scope.model.users);
                        });
                    }

                $scope.loadStuff = function (){
                  $timeout(function (){
                    $scope.getAllUsers(1,5)
                  .then(function(data){
                      $scope.users =  data; 
                      console.log($scope.users);
                    }); 
                  }, 500);
                }
  

}]);