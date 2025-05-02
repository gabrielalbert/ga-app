import { useState, useEffect } from 'react';
import '../pages/FillInBlankWords.css';

const initialData = [
  {
    question: "A ____ is worth a thousand words.",
    answer: "Picture"
  },
  {
    question: "Don’t put all your ____ in one basket.",
    answer: "Eggs"
  },
  {
    question: "Let the ____ out of the bag.",
    answer: "Cat"
  },
  {
    question: "You can’t judge a ____ by its cover.",
    answer: "Book"
  },
  {
    question: "You can lead a ____ to water, but you can’t make it drink.",
    answer: "Horse"
  }
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function FillInBlankWords() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [droppedItems, setDroppedItems] = useState({});

  useEffect(() => {
    const shuffledQuestions = shuffleArray(initialData);
    const shuffledAnswers = shuffleArray(initialData.map(item => item.answer));
    setQuestions(shuffledQuestions);
    setAnswers(shuffledAnswers);
  }, []);

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
  <h1>Fill in the blanks topics</h1>
      
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