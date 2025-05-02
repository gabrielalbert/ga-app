import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/FillIn.css';
// Tile component
const Tile = ({item }) => {
  const navigate = useNavigate();
  const handleTileClick = (item) => {
    navigate('/drag-drop-match');
  };
  return (
    <div className="tile">      
      <div className="tile-content" onClick={() => handleTileClick(item)}>
        <h3>{item.pageTitle}</h3>
        <p>{item.sheetName}</p>
      </div>
    </div>
  );
};

// Main component with tile grid
const Match = () => {
  const [storedData, setStoredData] = useState([]);
  
  // Retrieve data from localStorage
  useEffect(() => {
    try {
      const rawData = localStorage.getItem('qabank');
      if (!rawData) {
        return;
      }

      const parsedData = JSON.parse(rawData);
      
      // Validate data structure
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid data format in localStorage');
      }
      
      setStoredData(parsedData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes("match")
        )
      ));
      
    } catch (err) {
      console.error('Error retrieving data from localStorage:', err);      
    }
  }, []);

  return (
    <div className="page">
    <div className='page-container'>  
  <h1>Match the word topics</h1>
    <div className="tile-container">
       {(storedData.length>0) && storedData?.map((tile) => (
        <Tile
        key={tile.id}
        item={tile}                          
      />
      ))}
    </div>
    </div>
    </div>
  );
};

export default Match;

