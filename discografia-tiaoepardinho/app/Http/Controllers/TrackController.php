<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Track;
use App\Models\Album;

class TrackController extends Controller
{
    public function index()
    {
        return Track::all();
    }

    public function indexByAlbum($id)
    {
        $album = Album::findOrFail($id);
        return $album->tracks;
    }

    public function store(Request $request, $albumId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $album = Album::findOrFail($albumId);
        $track = new Track($request->all());
        $album->tracks()->save($track);

        return response()->json($track, 201);
    }

    public function update(Request $request, $id)
    {
        $track = Track::findOrFail($id);
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'album_id' => 'sometimes|required|exists:albums,id',
        ]);

        $track->update($request->all());
        return response()->json($track, 200);
    }

    public function destroy($id)
    {
        $track = Track::findOrFail($id);
        $track->delete();

        return response()->json(null, 204);
    }

    public function search($name)
    {
        $tracks = Track::where('name', 'LIKE', "%{$name}%")->get();
        return response()->json($tracks);
    }
}