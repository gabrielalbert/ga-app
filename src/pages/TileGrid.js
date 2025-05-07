import React, { useState } from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

const TileGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data
  const items = [
    { id: 1, title: 'Item 1', content: 'Content for item 1' },
    { id: 2, title: 'Item 2', content: 'Content for item 2' },
    { id: 3, title: 'Item 3', content: 'Content for item 3' },
  ];

  const handleTileClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="page">
    <div className='page-container'>  
      <h1>Tile Grid</h1>
      <div style={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            style={styles.tile}
            onClick={() => handleTileClick(item)}
          >
            {item.title}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.content}</p>
        </Modal>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  tile: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-3px)',
    },
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    position: 'relative',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    color: '#666',
    ':hover': {
      boxShadow: '0 0 10px #234db5,0 0 20px #234db5',
      backgroundColor: '#234db5',
      color: '#333',
    },
  },
};

export default TileGrid;