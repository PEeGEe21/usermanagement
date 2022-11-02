myApp.controller('userController', ['$scope', '$http', '$location', '$q', '$timeout', 'loginService', function($scope, $http, $location, $q, $timeout, loginService,){


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
    }
    $scope.getToken();



    $scope.name = 'PraiseGod'

    $scope.show = 'true'
    $scope.selected = []

    $scope.limitOptions = [10, 15, 25, 50, 100];

    $scope.query = {
      order: 'name',
      limit: 10,
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
      $scope.newUser.cpassword = '';
      // $scope.newUser.roles.id = '';
    };

    $scope.addUser = function(){

      // console.log($scope.newUser.name);

      if($scope.newUser.password === $scope.newUser.cpassword){
        
          

        $http.post(`${address}/api/users/create`, {
          name: $scope.newUser.name,
          email: $scope.newUser.email,
          password: $scope.newUser.password,
          role_id: $scope.newUser.role_id,
        }).success(function(res){
          console.log(res, "saved user");
          // alert(res.message);
          
          if(res.success === true){

            // $scope.users.data.push( res.user);
          $scope.getAllUsers(1,10);


            alert(res.message);

          // $scope.getAllUsers();
            // $scope.loadStuff();

            // $scope.newUser = {};
            $scope.resetForm();
          }else if(res.success === false){
            alert(res.message);

          }
          // $scope.initPage();
        }).error(function(data, status){
          console.log(data);
        })
      }else(
        alert('password must be the same')
      )
      
   
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
      $http.post(`${address}/api/users/${user.id}/update`, user)
      .success(function(result){

        // var us = loginService.getCurrentUser();
        // if (us.id === user.id){
        //   loginService.updatestorage(result.user);
        //   window.location.reload();
        // }           
        // $scope.initPage();
        // $scope.resetEditForm();
        alert("successfully updated")
        $scope.getAllUsers(1,10);

      }).error(function(data, status){
        console.log(data);
      })

  }

  $scope.deleteUser = function(user){
    console.log(user.id);

    // var index = $scope.users.data.indexOf(user);
    // console.log(index);

    // $scope.users.data.splice(index, 1);


    $http.post(`${address}/api/users/${user.id}/delete`).success(function(res){
          // $scope.users = result.users.data
          var index = $scope.users.data.indexOf(user);
          $scope.users.data.splice(index, 1);

          
          $scope.getAllUsers(1,10);
          alert(res.message);

          
    }).error(function(data, status){
      console.log(data);
    })

  }



  $scope.getAllUsers = function ( pageNumber = 1 , limit = 10, searchText = '' )
  {
      searchDefer = $q.defer();

      var url = `${address}/api/users` + "?"; 
      

      url = url + '&page='+ pageNumber;

      url = url + '&limit=' + limit;
      
      if(searchText)
          url = url + '&searchText=' + searchText;




      $http.get(url).then(function(data) 
          {
            // console.log(data.data.data, "hereee")
            
            $scope.users = data.data;
              searchDefer.resolve(data.data);
          }, function(response) 
          {
              console.log('Something Went Wrong!', response);
              if(response.status === 500){
                $scope.logout();

                window.location.reload();
              }
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
                        // console.log($scope.query)

                        $scope.getAllUsers( page , limit, searchInput )
                        .then(function ( data )
                        {
                            $scope.users =  data; 
                            // console.log($scope.model.users);
                        });
                    }

                $scope.loadStuff = function (){
                  $timeout(function (){
                    $scope.getAllUsers(1,10)
                  .then(function(data){
                      $scope.users =  data; 
                      // console.log($scope.users);
                    }); 
                  }, 500);
                }
  

}]);