import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../pages/FillInBlankWords.css';


function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function FillInBlankWords() {
  const location = useLocation();
  const { sheetName, pageTitle } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [droppedItems, setDroppedItems] = useState({});
  const [sheetname, setSheetname] = useState('');
  const [pagetitle, setPagetitle] = useState('');

  useEffect(() => {
    setPagetitle(JSON.parse(pageTitle));
    setSheetname(JSON.parse(sheetName));
    console.log("sheetName", sheetname);
    console.log("pageTitle", pagetitle);
    const rawData = localStorage.getItem('qabankdata');
    if (!rawData) {
      return;
    }
    const parsedData = JSON.parse(rawData) || [];
    
    console.log("parsedData", parsedData);
    const initialData = parsedData[sheetname]||[];
    console.log("initialData", initialData);
    
    const shuffledQuestions = shuffleArray(initialData);
    const shuffledAnswers = shuffleArray(initialData.map(item => item.answer));
    setQuestions(shuffledQuestions);
    setAnswers(shuffledAnswers);
  }, [ sheetname, pagetitle]);

  const handleDragStart = (e, answer) => {
    e.dataTransfer.setData("text/plain", answer);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const answer = e.dataTransfer.getData("text/plain");
    const correctAnswer = questions[questionId].answer;

    if (answer === correctAnswer) {
      setDroppedItems(prev => ({
        ...prev,
        [questionId]: answer
      }));
      setAnswers(prev => prev.filter(a => a !== answer));
    }
  };

  return (
    <>   

<div className="page">
    <div className='page-container'>  
  <h1>{pagetitle}</h1>
      
        <div className="word-bank">         
          {answers.map((answer, index) => (
            <div
              key={index}
              className="word"
              draggable
              onDragStart={(e) => handleDragStart(e, answer)}
            >
              {answer}
            </div>
          ))}
        </div>

        <div className="questions">
          
          {questions.map((question, index) => (
            <div
              key={index}
              className="sentence"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {question.question.split('____')[0]}
              <span className="blank">
                {droppedItems[index] || '____'}
              </span>
              {question.question.split('____')[1]}
            </div>
          ))}
        </div>
        

      </div>
    </div>
    </>
  );  
  
}

export default FillInBlankWords;