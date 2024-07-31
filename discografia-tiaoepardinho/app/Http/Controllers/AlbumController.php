<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;

class AlbumController extends Controller
{
    public function index()
    {
        return Album::with('tracks')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
    
        $album = Album::create($request->all());
        return response()->json($album, 201);
    }
    
    public function show(Album $album)
    {
        return $album->load('tracks');
    }

    public function search($name)
    {
        $albums = Album::where('name', 'LIKE', "%{$name}%")->get();
        return response()->json($albums);
    }

    public function update(Request $request, $id)
    {
        $album = Album::findOrFail($id);
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $album->update($request->all());
        return response()->json($album, 200);
    }

    public function destroy($id)
    {
        $album = Album::findOrFail($id);
        $album->delete();
        return response()->json(null, 204);
    }
}
