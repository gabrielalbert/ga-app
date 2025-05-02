import React, { useState,useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

// const wordsLeft = ["small", "hot", "above", "slow", "day"];
// const wordsRight = ["big", "cold", "below", "fast", "night"];

const initialData = [
  { question: "hot", answer: "cold" },
  { question: "small", answer: "big" },
  { question: "above", answer: "below" },
  { question: "day", answer: "night" },
  { question: "slow", answer: "fast" }
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const MatchWords = () => {
  const [matches, setMatches] = useState({});
  const [wordsLeft, setWordsLeft] = useState([]);
  const [wordsRight, setWordsRight] = useState([]);

    useEffect(() => {
      const shuffledQuestions = initialData.map(item => item.question);
      const shuffledAnswers = shuffleArray(initialData.map(item => item.answer));
      setWordsLeft(shuffledQuestions);
      setWordsRight(shuffledAnswers);
    }, []);
  
  
  const handleDrop = (leftWord, rightWord) => {
    console.log("Dropped:", leftWord, rightWord);
    // Check if the dropped word is correct
    const correctAnswer = initialData.find(item => item.question === leftWord)?.answer;
    if (correctAnswer !== rightWord) {      
      return;
    }
    // Update the matches state with the correct match  
    setMatches((prev) => ({ ...prev, [leftWord]: rightWord }));
  };

  const unmatchedRightWords = wordsRight.filter(
    (word) => !Object.values(matches).includes(word)
  );

  return (
    <div className="page">
    <div className='page-container'>  
  <h1>Antonyms</h1>
    <DndProvider backend={HTML5Backend}>
      <h2 style={{ textAlign: 'center' }}></h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <div>
          {wordsLeft.map((word) => (
            <DropZone
              key={word}
              leftWord={word}
              onDrop={handleDrop}
              matchedWord={matches[word]}
            />
          ))}
        </div>
        <div>
          {unmatchedRightWords.map((word) => (
            <Word key={word} word={word} />
          ))}
        </div>
      </div>
    </DndProvider>
    </div>
    </div>
  );
};

export default MatchWords;