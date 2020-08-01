<?php

use Illuminate\Support\Facades\Route;


//Home data
Route::get('/CountSummary','HomeController@CountSummary')->middleware('loginCheck');

//contact data
Route::get('/ContactList','ContactController@ContactList')->middleware('loginCheck');
Route::post('/ContactDelete','ContactController@ContactDelete')->middleware('loginCheck');

//courses data
Route::get('/CourseList','CourseController@CourseList')->middleware('loginCheck');
Route::post('/CourseDelete','CourseController@CourseDelete')->middleware('loginCheck');
Route::post('/AddCourse','CourseController@AddCourse')->middleware('loginCheck');

//project data
Route::get('/ProjectList','ProjectController@ProjectList')->middleware('loginCheck');
Route::post('/ProjectDelete','ProjectController@ProjectDelete')->middleware('loginCheck');
Route::post('/AddProject','ProjectController@AddProject')->middleware('loginCheck');

//service data
Route::get('/ServiceList','ServiceController@ServiceList')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');
Route::post('/AddService','ServiceController@AddService')->middleware('loginCheck');

//client review data
Route::get('/ReviewList','ReviewController@ReviewList')->middleware('loginCheck');
Route::post('/ReviewDelete','ReviewController@ReviewDelete')->middleware('loginCheck');
Route::post('/AddReview','ReviewController@AddReview')->middleware('loginCheck');

//admin login
Route::get('/Login','AdminLoginController@LoginPage');
Route::get('/onLogin/{UserName}/{Password}','AdminLoginController@onLogin');
Route::get('/Logout','AdminLoginController@onLogOut');


Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');
Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
