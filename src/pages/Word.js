import React from "react";
import {  useDrag } from "react-dnd";
const ItemType = "WORD";

const Word = ({ word, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [word]);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: '#2f62b4',
        color: 'white',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'move',
        width: '120px',
        textAlign: 'center',
      }}
    >
      {word}
    </div>
  );
};

export default Word;