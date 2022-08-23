<?php
    
namespace App\Http\Controllers;
    
use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use App\Permissions\HasPermissionsTrait;
// use DB;
use Hash;
// use Illuminate\Support\Arr;
    
class UserController extends Controller
{

    // use HasPermissionsTrait;
    // public function __construct()
    // {
    //     $this->middleware('cors');
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('roles')->orderBy('id','ASC')->paginate(5);        

        return response()->json(['message'=> 'Successfull', 'users' => $users]);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $roles = Role::pluck('name','name')->all();
        // return view('users.create',compact('roles'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $requestT = $request['newUser'];
        // $this->validate($requestT, [
        //     // 'name' => 'required',
        //     'name' => ['required', 'string', 'max:255'],
        //     'email' => 'required|email|unique:users,email',
        //     'password' => 'required|same:confirm-password',
        //     'roles' => ['required']
        // ]);
    
        $input = $request->all();
        $input = $input['newUser'];
        $input['password'] = Hash::make($input['password']);
    
        $user = User::create($input);
        if($user){
            $role = Role::find($request['newUser']['roles']['id']);
            $user->roles()->attach($role);
        }

        // $user->assignRole($request->input('roles'));
    
        
        return response()->json(['message'=> 'User created', 'user' => $user]);
        // $token = JWTAuth::fromUser($admin);


        // return response()->json( [
        //     "success" => true,
        //     "My input"=> request("email")
        // ] );
        
       
        // return response()->json(compact('admin', 'token'), 201);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('roles')->find($id);
        return response()->json(['message'=> 'Successfull', 'user' => $user]);

    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        // $roles = Role::pluck('name','name')->all();
        // $userRole = $user->roles->pluck('name','name')->all();
    
        // return view('users.edit',compact('user','roles','userRole'));
        return response()->json(['message'=> 'Successfull', 'user' => $user]);

    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users,email,',
        //     'role' => 'required'
        // ]);


        $user = User::findOrFail($id);

        $user->update(request()->all());
    
        // $user = User::find($id);

        // $channel->channel = $request->channel();

        // $user->update($input);
        // DB::table('model_has_roles')->where('model_id',$id)->delete();
    
        // $user->assignRole($request->input('roles'));

        return response()->json([
            'message'=> 'User updated successfully', 
            'user' => $user
        ]);

    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        return response()->json(['message'=> 'User deleted']);    
    }
}