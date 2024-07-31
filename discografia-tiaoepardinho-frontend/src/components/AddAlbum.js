import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddAlbum = ({ addAlbum }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/albums', { name });
      console.log('Album added:', response.data);
      addAlbum(response.data); // Adiciona o novo álbum ao estado
      setName(''); // Limpa o input após o envio bem-sucedido
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Adicionar álbum</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do álbum"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          <FontAwesomeIcon icon={faPlus} style={styles.icon} />
        </button>
      </form>
    </div>
  );
};

// Estilização
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: "80%"
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#FCA500',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  icon: {
    fontSize: '16px',
  },
};

export default AddAlbum