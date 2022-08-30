<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\User;
use Hash;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

       // ------------ [ User Login ] -------------------
    public function login(Request $request) {

        $validator = Validator::make($request->all(),
            [
                "email" => "required|email",
                "password" => "required"
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }


        // check if entered email exists in db
        $email_status = User::where("email", $request->email)->first();


        // if email exists then we will check password for the same email
        if(!is_null($email_status)) {
            $hashedPassword = $email_status->password;

            // $password_status = User::where("email", $request->email)->first();
            $password_status = Hash::check($request->password, $hashedPassword);

            // if password is correct
            if(($password_status)) {
                // $user = $this->userDetail();
                $user = User::with('roles')->where("email", $request->email)->first();

                return response()->json([
                    // "status" => $this->status_code, 
                    "success" => true, 
                    "message" => "You have logged in successfully", 
                    "data" => $user
                ]);
            }
            else {
                return response()->json([
                    "status" => "failed", 
                    "success" => false, 
                    "message" => "Unable to login. Incorrect password."
                ]);
            }
        }
        else {
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Unable to login. Email doesn't exist."]);
        }
    }
    
}



