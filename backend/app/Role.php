<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
   public static $admin = 1;
   
     public function users() {
        return $this->belongsToMany('App\User');
     }
}
