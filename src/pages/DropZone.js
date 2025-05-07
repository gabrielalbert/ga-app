import React from "react";
import {  useDrop } from "react-dnd";
const ItemType = "WORD";
// DropZone component to accept dropped words
const DropZone = ({ leftWord, onDrop, matchedWord }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(leftWord, item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [leftWord]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <div style={{
        backgroundColor: '#2f62b4',
        color: 'white',
        padding: '10px 20px',
        marginRight: '10px',
        borderRadius: '5px',
        width: '120px',
        textAlign: 'center',
      }}>
        {leftWord}
      </div>
      <div
        ref={drop}
        style={{
          border: '2px dashed orange',
          backgroundColor: isOver ? '#f9f9f9' : 'transparent',
          padding: '10px 20px',
          minHeight: '40px',
          width: '120px',
          textAlign: 'center',
        }}
      >
        {matchedWord}
      </div>
    </div>
  );
};

export default DropZone;