<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        DB::table('role_user')->truncate();

        $adminRole = Role::where('name', 'admin')->first();
        $parentRole = Role::where('name', 'parent')->first();
        $studentRole = Role::where('name', 'student')->first();


        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('testing')
        ]);
        $parent = User::create([
            'name' => 'Udeh Samuel',
            'email' => 'parent@parent.com',
            'password' => Hash::make('testing')
        ]);
        $student = User::create([
            'name' => 'Udeh Evidence',
            'email' => 'student@student.com',
            'password' => Hash::make('testing')
        ]);
        
        $admin->roles()->attach($adminRole);
        $parent->roles()->attach($parentRole);
        $student->roles()->attach($studentRole);
    }
}
