import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const AlbumCard = ({
    album,
    onEdit,
    onDelete,
    onEditTrack,
    onDeleteTrack,
    onAddTrack,
    isAddingTrack,
    onSelectAlbum,
    onCancel
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [albumName, setAlbumName] = useState(album.name);
    const [editTrackId, setEditTrackId] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [newTrackName, setNewTrackName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleEditAlbum = async () => {
        try {
            await onEdit(album.id, albumName);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    const handleEditTrack = async (trackId) => {
        try {
            await onEditTrack(trackId, trackName);
            setEditTrackId(null);
        } catch (error) {
            console.error('Error updating track:', error);
        }
    };

    const handleAddTrack = async () => {
        if (!newTrackName.trim()) {
            console.error('Track name is required.');
            return;
        }

        try {
            await onAddTrack(album.id, newTrackName);
            setNewTrackName('');
            onCancel();  // Cancela o modo de adição de faixa após adicionar
        } catch (error) {
            console.error('Error adding track:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTracks = album.tracks?.filter(track => track.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={styles.card}>
            <div style={styles.cardContent}>
                {isEditing ? (
                    <div style={styles.editSection}>
                        <input
                            type="text"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            placeholder="Nome do álbum"
                            style={styles.inputAlbumName}
                        />
                        <button onClick={handleEditAlbum} style={styles.saveButton}><FontAwesomeIcon icon={faSave} /></button>
                        <button onClick={() => setIsEditing(false)} style={styles.cancelButton}><FontAwesomeIcon icon={faTimes} /></button>
                    </div>
                ) : (
                    <div style={styles.header}>
                        <div style={styles.headerContent}>
                            <h2>{album.name}</h2>
                            <div style={styles.headerButtons}>
                                <button onClick={() => setIsEditing(true)} style={styles.editButton}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                <button onClick={() => onDelete(album.id)} style={styles.deleteButton}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    </div>
                )}
                {isSearching ? (
                    <div style={styles.searchSection}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Nome da faixa"
                            style={styles.inputSearchTrack}
                        />
                        <button onClick={() => setIsSearching(false)} style={styles.cancelButton}><FontAwesomeIcon icon={faTimes} /></button>
                    </div>
                ) : (
                    <div style={styles.searchButtonContainer}>
                        <button onClick={() => setIsSearching(true)} style={styles.searchButton}><p>Buscar faixa...</p></button>
                    </div>
                )}
                <ul style={styles.trackList}>
                    {filteredTracks && filteredTracks.map(track => (
                        <li key={track.id} style={styles.trackItem}>
                            {editTrackId === track.id ? (
                                <div style={styles.editSection}>
                                    <input
                                        type="text"
                                        value={trackName}
                                        onChange={(e) => setTrackName(e.target.value)}
                                        placeholder="Nome da faixa"
                                        style={styles.inputTrackEdit}
                                    />
                                    <button onClick={() => handleEditTrack(track.id)} style={styles.saveButton}><FontAwesomeIcon icon={faSave} /></button>
                                    <button onClick={() => setEditTrackId(null)} style={styles.cancelButton}><FontAwesomeIcon icon={faTimes} /></button>
                                </div>
                            ) : (
                                <div style={styles.trackContent}>
                                    <span>{track.name}</span>
                                    <div style={styles.trackButtons}>
                                        <button onClick={() => {
                                            setEditTrackId(track.id);
                                            setTrackName(track.name);
                                        }} style={styles.editButton}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        <button onClick={() => onDeleteTrack(track.id)} style={styles.deleteButton}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <div style={styles.addTrackContainer}>
                    {isAddingTrack ? (
                        <div style={styles.addTrackSection}>
                            <input
                                type="text"
                                value={newTrackName}
                                onChange={(e) => setNewTrackName(e.target.value)}
                                placeholder="Nome da nova faixa"
                                style={styles.inputAddTrack}
                            />
                            <button onClick={handleAddTrack} style={styles.saveButton}><FontAwesomeIcon icon={faSave} /></button>
                            <button onClick={onCancel} style={styles.cancelButton}><FontAwesomeIcon icon={faTimes} /></button>
                        </div>
                    ) : (
                        <>
                            <button onClick={onSelectAlbum} style={styles.addTrackButton}><FontAwesomeIcon icon={faPlus} /></button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Estilização
const styles = {
    card: {
        border: '1px solid #ddd',
        background: '#FCA500',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        gap: '10px',
    },
    headerButtons: {
        display: 'flex',
        gap: '5px',
    },
    editSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '5px'
    },
    trackList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        width: '100%',
        overflowY: 'auto',
    },
    trackItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0',
        border: '1px solid #000',
        borderRadius: '5px',
        background: '#a7a7a7',
        padding: '5px',
        justifyContent: 'center',
    },
    trackContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    trackButtons: {
        display: 'flex',
        gap: '5px',
    },
    addTrackContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 'auto',
    },
    addTrackSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    inputAlbumName: {
        border: '1px solid #000',
        padding: '6px',
        borderRadius: '15px',
        fontSize: '12px',
        outline: 'none',
        width: '100%',
        maxWidth: '150px',
        background: 'transparent'
    },
    inputSearchTrack: {
        border: '1px solid #000',
        padding: '6px',
        borderRadius: '15px',
        fontSize: '12px',
        outline: 'none',
        width: '100%',
        maxWidth: '150px',
        background: 'transparent',
    },
    inputAddTrack: {
        border: '1px solid #000',
        padding: '6px',
        borderRadius: '15px',
        fontSize: '12px',
        outline: 'none',
        width: '100%',
        maxWidth: '150px',
        background: 'transparent',
    },
    inputTrackEdit: {
        border: '1px solid #000',
        padding: '6px',
        borderRadius: '15px',
        fontSize: '12px',
        outline: 'none',
        width: '100%',
        maxWidth: '150px',
        background: 'transparent',
    },
    saveButton: {
        background: 'none',
        border: 'none',
        color: '#00f',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0',
    },
    editButton: {
        background: 'none',
        border: 'none',
        color: '#00f',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#e61919',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0',
    },
    cancelButton: {
        background: 'none',
        border: 'none',
        color: '#e61919',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0',
    },
    addTrackButton: {
        background: 'none',
        border: 'none',
        color: '#008000',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0',
    },
    searchButton: {
        background: 'none',
        border: 'none',
        color: '#800080',
        cursor: 'pointer',
        fontSize: '1rem',
        padding: '0',
    },
    searchButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px',
    },
    searchSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        margin: '10px 10px',
    },
};

export default AlbumCard