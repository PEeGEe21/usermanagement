<?php
    
namespace App\Http\Controllers;
    
use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use App\Permissions\HasPermissionsTrait;
// use DB;
use Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Illuminate\Support\Arr;
    
class UserController extends Controller
{

    // use HasPermissionsTrait;
    // public function __construct()
    // {
    //     $this->middleware('cors');
    // }
    

    // protected $user;
    // $user = JWTAuth::toUser($token);
 
    public function __construct()
    {
        // $this->JWTAuth::parseToken()->authenticate();
        // $this->middleware('JwtMiddleware');
        // $this->middleware('jwt-auth');


    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */





    public function index(Request $request)
    {
        
        
        // $token = JWTAuth::getToken();
        // $user = JWTAuth::toUser($token);
        // dd($token);
        
        // $users = User::with('roles')->orderBy('id','ASC')->paginate(50);  
        // dd($users);
        // dd($request);

        // $users = User::with('roles')->orderBy('id','ASC')->paginate(90000);
        $userQuery = (new User)->query();
        $userQuery->with('roles');
        $userQuery->whereHas(
            'roles', function($q){
                $q->where('roles.id', '!=', Role::$admin);
            }
        );

        if($request->input('searchText')){
            $userQuery->where(function($query) use($request){
                return $query->where('name', 'LIKE', '%'.$request->input('searchText').'%')
                        ->orWhere('email', 'LIKE', '%'.$request->input('searchText').'%');
            });
        }
        $limit = 10;

        if($request->input('limit')){
            $limit = $request->input('limit');
        }

        $users = $userQuery->paginate($limit);
          
        

        return response()->json($users);
    }
    
    
    /**
     * S
     *
     * @return \Illuminate\Http\Response
     */
    public function userCount(Request $request)
    {
        $students = User::whereHas(
            'roles', function($q){
                $q->where('name', 'Student');
            }
        )->get()->count();

        $parents = User::whereHas(
            'roles', function($q){
                $q->where('name', 'Parent');
            }
        )->get()->count();

        // $userQuery->whereHas(
        //     'roles', function($q){
        //         $q->where('roles.id', '!=', Role::$admin);
        //     }
        // );
        $users = User::count();

        // $users = User::whereHas(
        //     'roles', function($q){
        //         $q->where('roles.id', '!=', Role::$admin);
        //     }
        // )->count();

        return response()->json(['students' => $students, 'parents' => $parents, 'users' => $users]);
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
        // dd($request);
        $input = $request->all();
        
        // $input = $input['newUser'];
        $input['password'] = Hash::make($input['password']);
        $checkUser = User::with('roles')->where("email", $input['email'])->first();
        if ($checkUser)
            return response()->json(['success' => false, 'message'=> 'User already exists']);

        $user = User::create($input);
        if($user){
            $role = Role::find($request['role_id']);
            $user->roles()->attach($role);
        }
        // $input = $request->all();
        // dd($input);
        // $input = $input['newUser'];
        // $input['password'] = Hash::make($input['password']);
    
        // $user = User::create($input);
        // if($user){
        //     $role = Role::find($request['newUser']['role_id']);
        //     $user->roles()->attach($role);
        // }

        // $user->assignRole($request->input('roles'));
    
        
        return response()->json(['success' => true, 'message'=> 'User created', 'user' => $user]);
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
            if (!$user){
                return response()->json(['message'=> 'Failed, No available user']);
            }
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
        // $data = $request->all();
        // dd($request->roles);

        $user = User::find($id);


        // dd($request->input('role_id'));

        $user->update([
            'name'=>$request['name'],
            'email'=>$request['email'],
        ]);

        // dd($request['role_id']);
        // $user->name = $request['name'];
        // $user->email = $request['email'];
        // $user->update();
        // if($user){
            // dd($user);
            // $role = Role::find($request['role_id']);
        

            // $user->roles()->sync([$request->input('role_id')]);

            if(!is_null($request['role_id'])){
                $role = Role::find($request['role_id']);
                $user->roles()->sync($role);
            }
            
            
            // $user->roles()->sync($request->roles['0']['id'], $request->roles['0']['name']);
            // $user->roles()->sync($request->roles['0']['id'], $request->roles['0']['name']);
            


        // }
        // dd($user);
        // dd($request->roles['0']['id']);
        // $user->roles()->sync($request->roles);
        












        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users,email,',
        //     'role' => 'required'
        // ]);

        // dd($request['roles']['0']['id']);

        // $newRole = Role::findOrFail($request['roles']['0']['id']);
        // $user = User::with('roles')->findOrFail($id);
        // $user->name = $data['name'];
        // $user->email = $data['email'];
        // // 4role = Rolepivot::find()
        // $user->roles[0]->role_id = $request['roles']['0']['id'];
        // $user->roles[0]->name = $newRole->name;
        // $user->roles[0]->pivot->role_id = $request['roles']['0']['id'];
        // $user->save();
        // $user->update([
        //     'name'=>$data['name'],
        //     'email'=>$data['email'],
        // ]);
        // if($user){
        //     // \dd($user->roles[0]->role_id );
        //     $role = $user->roles[0]->role_id = $request['roles']['0']['id'];
        //     $user->save();
        //     // $role = collect($user->roles)->toArray();
        //     // $newRole = Role::findOrFail($role[0]['id']);
        //     // $newRole->update([
        //     //     'role_id' => $request['roles']['0']['id']
        //     // ]);
            
        // }
    
        // $user = User::find($id);

        // $channel->channel = $request->channel();

        // $user->update($input);
        // DB::table('model_has_roles')->where('model_id',$id)->delete();
    
        // $user->assignRole($request->input('roles'));
        // $user = User::with('roles')->where('id','=',$id)->get();
        // $user = $user[0];

        return response()->json([
            'message'=> 'User updated successfully', 
            // 'user' => $user
        ]);

    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        // $token = JWTAuth::getToken();
        // $user = JWTAuth::toUser($token);
        // dd($token);

        User::find($id)->delete();
        return response()->json(['message'=> 'User deleted']);    
    }
}