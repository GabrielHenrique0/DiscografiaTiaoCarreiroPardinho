import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import AlbumCard from './AlbumCard';
import AddAlbum from './AddAlbum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = ({ value, onChange }) => {
  return (
    <div style={searchStyles.container}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Procurar álbum..."
        style={searchStyles.input}
      />
      <FontAwesomeIcon icon={faSearch} style={searchStyles.icon} />
    </div>
  );
};

// Listar álbuns
const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/albums');
        setAlbums(response.data);
        setFilteredAlbums(response.data); // Initialize filtered albums
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    // Filtrar álbuns com base na pesquisa feita pelo usuário
    const filtered = albums.filter(album =>
      album.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlbums(filtered);
  }, [searchTerm, albums]);

  // Editar álbum
  const handleEditAlbum = async (id, newName) => {
    try {
      await api.put(`/albums/${id}`, { name: newName });
      setAlbums(albums.map(album => album.id === id ? { ...album, name: newName } : album));
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  // Deletar álbum
  const handleDeleteAlbum = async (id) => {
    try {
      await api.delete(`/albums/${id}`);
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  // Editar faixa
  const handleEditTrack = async (id, newName) => {
    try {
      await api.put(`/tracks/${id}`, { name: newName });
      setAlbums(albums.map(album => ({
        ...album,
        tracks: album.tracks.map(track => track.id === id ? { ...track, name: newName } : track),
      })));
    } catch (error) {
      console.error('Error updating track:', error);
    }
  };

  const handleDeleteTrack = async (id) => {
    try {
      await api.delete(`/tracks/${id}`);
      setAlbums(albums.map(album => ({
        ...album,
        tracks: album.tracks.filter(track => track.id !== id),
      })));
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const handleAddTrack = async (albumId, trackName) => {
    if (!trackName.trim()) {
      console.error('Track name is required.');
      return;
    }

    try {
      await api.post(`/albums/${albumId}/tracks`, { name: trackName });
      const response = await api.get('/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error adding track:', error);
    }
  };

  const addAlbum = (newAlbum) => {
    setAlbums([...albums, newAlbum]);
    setFilteredAlbums([...albums, newAlbum]);
  };

  return (
    <div style={styles.container}>
      <AddAlbum addAlbum={addAlbum} />
      <h1 style={styles.title}>Álbuns</h1>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={styles.albumList}>
        {filteredAlbums.map(album => (
          <AlbumCard
            key={album.id}
            album={album}
            onEdit={handleEditAlbum}
            onDelete={handleDeleteAlbum}
            onEditTrack={handleEditTrack}
            onDeleteTrack={handleDeleteTrack}
            onAddTrack={handleAddTrack}
            isAddingTrack={selectedAlbumId === album.id}
            onSelectAlbum={() => setSelectedAlbumId(album.id)}
            onCancel={() => setSelectedAlbumId(null)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  albumList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
};

const searchStyles = {
  container: {
    position: 'relative',
    margin: '10px auto 25px',
    maxWidth: '400px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px 0px 10px 10px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: '#888',
  },
};

export default AlbumsList