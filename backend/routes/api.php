<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/test', function () {
    return ['movie' => "Avengers"];
});



Route::group([

    'middleware' => 'jwt.auth',
    'prefix' => ''

], function ($router) {

    Route::post('me', 'Auth\LoginController@me');
    Route::get('users', 'UserController@index');
    Route::post('users/create', 'UserController@store');
    Route::get('users/userCount', 'UserController@userCount');
    Route::post('users/{id}/update', 'UserController@update');
    Route::get('users/{id}', 'UserController@show');
    Route::post('users/{id}/delete', 'UserController@destroy');

    Route::post('auth/logout', 'Auth\LoginController@logout');
    

});

Route::post('refresh', 'Auth\LoginController@refresh');


Route::post('auth/login', 'Auth\LoginController@login');

// Route::group(['prefix' => '', 'middleware' => 'jwt.auth'], function () {



// });

    
    
    // Route::get('users/students', 'UserController@noOfStudents');
    // Route::get('users/parents', 'UserController@noOfParents');
    

// Route::middleware('jwt.refresh')->get('/token/refresh', 'Auth\LoginController@refresh');






// Route::post('login', 'AuthApi@login');
// Route::get('profile', 'AuthApi@getAuthenticatedUser');
// Route::get('/email-check', 'AuthApi@userDetail');

// Route::get("send-email", "EmailController@sendEmailToUser");
