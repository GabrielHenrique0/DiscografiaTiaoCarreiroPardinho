import React from 'react';
import { FaHatCowboy } from 'react-icons/fa';
import './App.css';
import AlbumsList from './components/AlbumsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-nav">
          <FaHatCowboy className="App-logo" />
          <h1>Discografia - Tião Carreiro e Pardinho</h1>
        </div>
      </header>
      <main>

        <AlbumsList />
        
      </main>
    </div>
  );
}

export default App