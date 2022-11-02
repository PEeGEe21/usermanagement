<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
// use Tymon\JWTAuth\Facades\JWTAuth;
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
        // $this->middleware('guest')->except('logout');
        // $this->middleware('jwt.auth', ['except' => array('login', 'logout')]);

        // $this->middleware('auth:api', ['except' => ['login', 'logout']]);

    }

       // ------------ [ User Login ] -------------------
    public function login(Request $request) {





        $credentials = $request->only('email', 'password');
        // if (! $token = auth()->attempt($credentials)) {


        // $token = JWTAuth::attempt($credentials);
        // if (!$token) {
        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unable to login. Email doesnt exist.',
                
            ], 401);
        } else{

            // check if entered email exists in db
            $email_status = User::where("email", $request->email)->first();
            // dd($email_status);


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
                        "status" => 200, 
                        "success" => true, 
                        "message" => "You have logged in successfully", 
                        "user" => $user,
                        "token" => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60
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



    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }



    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        // $this->validate($request, ['token' => 'required']);
        
        // try {
        //     JWTAuth::invalidate($request->input('token'));
        //     return response([
        //     'status' => 'success',
        //     'msg' => 'You have successfully logged out.'
        // ]);
        // } catch (JWTException $e) {
        //     return response([
        //         'status' => 'error',
        //         'msg' => 'Failed to logout, please try again.'
        //     ]);
        // }
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        // return response([
        //     'status' => 'success'
        // ]);
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    
}



