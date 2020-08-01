<?php

namespace App\Http\Controllers;

use App\Model\ServiceModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class ServiceController extends Controller
{
    function ServiceList(){
        $result = ServiceModel::all();
        return $result;
    }
    function ServiceDelete(Request $request){
        $id = $request->input('id');

        $service_logo = ServiceModel::where('id','=',$id)->get(['service_logo']);
        $service_logo_name = explode('/',$service_logo[0]['service_logo'])[4];
        Storage::delete('public/'.$service_logo_name);

        $result = ServiceModel::where('id', '=' , $id )->delete();
        return $result;
    }

    function AddService(Request $request){

        $title = $request->input('title');
        $des = $request->input('des');
        $photoPath = $request->file('photo')->store('public');
        $photoName = explode("/",$photoPath )[1];
        $photoUrl = "http://".$_SERVER['HTTP_HOST']."/storage/". $photoName;

        $result = ServiceModel::insert(['service_logo'=>$photoUrl,'service_name'=>$title,'service_description'=>$des]);
        return $result;
    }
}
