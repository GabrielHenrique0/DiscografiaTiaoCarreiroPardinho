<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

// Route::get('/', function () {
//     return view('welcome');
// });

// use Illuminate\Support\Facades\DB;

// Route::get('/test-db', function () {
//     try {
//         DB::connection()->getPdo();
//         return 'Database connection is working!';
//     } catch (\Exception $e) {
//         return 'Could not connect to the database. Error: ' . $e->getMessage();
//     }
// });
// Route::get('/test', function () {
//     return response()->json(['message' => 'API is working!']);
// });

Route::get('/albums', [AlbumController::class, 'index']);
Route::get('/albums/{id}/tracks', [TrackController::class, 'indexByAlbum']);
Route::post('/albums', [AlbumController::class, 'store']);
Route::get('/albums/search/{name}', [AlbumController::class, 'search']);
Route::get('/tracks/search/{name}', [TrackController::class, 'search']);