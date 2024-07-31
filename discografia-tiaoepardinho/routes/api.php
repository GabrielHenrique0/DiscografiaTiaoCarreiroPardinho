<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

// 1) Ver lista de álbuns e faixas
Route::get('/albums', [AlbumController::class, 'index']); // Lista todos os álbuns com faixas
Route::get('/tracks', [TrackController::class, 'index']); // Lista todas as faixas

// 2) Pesquisar álbuns e faixas por nome
Route::get('/albums/search/{name}', [AlbumController::class, 'search']); // Pesquisa álbuns por nome
Route::get('/tracks/search/{name}', [TrackController::class, 'search']); // Pesquisa faixas por nome

// 3) Adicionar um novo álbum
Route::post('/albums', [AlbumController::class, 'store']); // Cria um novo álbum

// 4) Adicionar uma nova faixa em um álbum
Route::post('/albums/{id}/tracks', [TrackController::class, 'store']); // Adiciona uma nova faixa a um álbum

// 5) Excluir uma faixa
Route::delete('/tracks/{id}', [TrackController::class, 'destroy']); // Exclui uma faixa

// 6) Excluir um álbum
Route::delete('/albums/{id}', [AlbumController::class, 'destroy']); // Exclui um álbum

// Outras rotas úteis
Route::get('/albums/{id}/tracks', [TrackController::class, 'indexByAlbum']); // Lista faixas de um álbum específico

Route::put('/albums/{id}', [AlbumController::class, 'update']); // Atualiza um álbum
Route::put('/tracks/{id}', [TrackController::class, 'update']); // Atualiza uma faixa