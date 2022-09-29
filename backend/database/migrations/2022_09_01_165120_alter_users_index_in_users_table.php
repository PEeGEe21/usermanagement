<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;

// use DB;

class AlterUsersIndexInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // $table_name = 'users';
        // Schema::table($table_name, function (Blueprint $table) use($table_name){
        //     $sm = Schema::getConnection()->getDoctrineSchemaManager();
        //     $indexesFound = $sm->listTableIndexes($table_name);
        //     if(!array_key_exists("index_users", $indexesFound)){
        //         $url = "CREATE INDEX index_users ON users(name,email)";
        //         DB::statement($url);
        //     }
        // });
        // $table_name = 'role_user';
        // Schema::table($table_name, function (Blueprint $table) use($table_name){
        //     $sm = Schema::getConnection()->getDoctrineSchemaManager();
        //     $indexesFound = $sm->listTableIndexes($table_name);
        //     if(!array_key_exists("index_role_user", $indexesFound)){
        //         $url = "CREATE INDEX index_role_user ON role_user(role_id,user_id)";
        //         DB::statement($url);
        //     }
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
