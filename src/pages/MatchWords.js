import React, { useState,useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation } from 'react-router-dom';
import Word from "./Word";
import DropZone from "./DropZone";

function shuffleArray(array) {
  return [...array]?.sort(() => Math.random() - 0.5);
}

function MatchWords() {
  const location = useLocation();
  const { sn, pt } = location.state || {};

  const [matches, setMatches] = useState({});
  const [wordsLeft, setWordsLeft] = useState([]);
  const [wordsRight, setWordsRight] = useState([]);
  const [sheetname, setSheetname] = useState('');
  const [pagetitle, setPagetitle] = useState('');
  const [initialData, setInitialData] = useState([]);

    useEffect(() => {
    setPagetitle(JSON.parse(pt));
    setSheetname(JSON.parse(sn));
    
   
    const rawData = localStorage.getItem('qabankdata');
    if (!rawData) {
      return;
    }
    const parsedData = JSON.parse(rawData) || [];
    
    const iD = parsedData[sheetname]||[];
    
    const shuffledQuestions = iD?.map(item => item.question);
    const shuffledAnswers = shuffleArray(iD?.map(item => item.answer));
    setWordsLeft(shuffledQuestions);
    setWordsRight(shuffledAnswers);    
    setInitialData(iD);    
    }, [sheetname, pagetitle]);
  
  
  const handleDrop = (leftWord, rightWord) => {
    console.log("Dropped:", leftWord, rightWord);   
    // Check if the dropped word is correct
    const correctAnswer = initialData?.find(item => item.question === leftWord)?.answer;
    if (correctAnswer !== rightWord) {      
      return;
    }
    // Update the matches state with the correct match  
    setMatches((prev) => ({ ...prev, [leftWord]: rightWord }));
    console.log("Matches:", matches);
  };

  const unmatchedRightWords = wordsRight?.filter(
    (word) => !Object.values(matches).includes(word)
  );

  return (
    <div className="page">
    <div className='page-container'>  
  <h1>{pagetitle}</h1>
    <DndProvider backend={HTML5Backend}>
      <h2 style={{ textAlign: 'center' }}></h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <div>
          {wordsLeft?.map((word) => (
            <DropZone
              key={word||''}
              leftWord={word||''}
              onDrop={handleDrop}
              matchedWord={matches[word]}
            />
          ))}
        </div>
        <div>
          {unmatchedRightWords?.map((word) => (
            <Word key={word|''} word={word||''} />
          ))}
        </div>
      </div>
    </DndProvider>
    </div>
    </div>
  );
};

export default MatchWords;