<?php

namespace App\Http\Controllers;

use App\Model\CourseTableModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class CourseController extends Controller
{
    function CourseList(){
        $result = CourseTableModel::all();
        return $result;
    }
    function CourseDelete(Request $request){
        $id = $request->input('id');

        $small_img   = CourseTableModel::where('id','=',$id)->get(['small_img']);
        $small_img_name = explode('/',$small_img[0]['small_img'])[4];
        Storage::delete('public/'.$small_img_name);

        $result = CourseTableModel::where('id', '=' , $id )->delete();
        return $result;
    }
    function AddCourse(Request $request){

        $shortTitle = $request->input('shortTitle');
        $shortDes = $request->input('shortDes');
        $longTitle = $request->input('longTitle');
        $longDes = $request->input('longDes');
        $TotalLecture = $request->input('TotalLecture');
        $TotalStudent = $request->input('TotalStudent');
        $skillAll = $request->input('skillAll');
        $videoUrl = $request->input('videoUrl');
        $courseLink = $request->input('courseLink');

        $photoPath = $request->file('coursePhoto')->store('public');
        $photoName = explode("/",$photoPath)[1];
        $photoUrl = "http://".$_SERVER['HTTP_HOST']."/storage/".$photoName;

        $result = CourseTableModel::insert(['short_title'=>$shortTitle,'short_des'=>$shortDes,'small_img'=>$photoUrl,'long_title'=>$longTitle,'long_des'=>$longDes,'total_lecture'=>$TotalLecture,'total_student'=>$TotalStudent,'skill_all'=> $skillAll,'video_url'=>$videoUrl,'courses_link'=>$courseLink]);
        return $result;
    }
}
