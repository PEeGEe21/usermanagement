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
    return['movie'=> "Avengers"];
});

Route::post('users/create', 'UserController@store');
Route::get('users', 'UserController@index');
Route::get('users/{id}', 'UserController@show');
Route::post('users/delete/{id}', 'UserController@destroy');

// Route::post('login', 'AuthApi@login');
// Route::get('profile', 'AuthApi@getAuthenticatedUser');
// Route::get('/email-check', 'AuthApi@userDetail');

// Route::get("send-email", "EmailController@sendEmailToUser");
