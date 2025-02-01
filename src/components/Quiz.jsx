import React, { useState, useEffect } from "react";
import "./QuizStyle.css";
import AnswerSection from "./AnswerSection";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const fetchQuestions = async () => {
    try {
      console.log('Starting to fetch questions...');
      setIsLoading(true);
      
      // Use a CORS proxy
      const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
      const API_URL = encodeURIComponent('https://api.jsonserve.com/Uw5CrX');
      const fullUrl = CORS_PROXY + API_URL;
      
      console.log('Fetching from:', fullUrl);
      
      const response = await fetch(fullUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Transform the API questions into our expected format
      const formattedQuestions = data.questions.map(q => ({
        question: q.description,
        answers: {
          answer_a: q.options[0].description,
          answer_b: q.options[1].description,
          answer_c: q.options[2].description,
          answer_d: q.options[3].description
        },
        correct_answers: {
          answer_a_correct: q.options[0].is_correct.toString(),
          answer_b_correct: q.options[1].is_correct.toString(),
          answer_c_correct: q.options[2].is_correct.toString(),
          answer_d_correct: q.options[3].is_correct.toString()
        },
        explanation: q.detailed_solution
      }));

      console.log('Setting formatted questions:', formattedQuestions);
      setQuestions(formattedQuestions);
      setIsLoading(false);
      setError(null);
      
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Current state:', {
      questionsLength: questions.length,
      isLoading,
      error,
      currentQuestion
    });
  }, [questions, isLoading, error, currentQuestion]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerOptionClick = (isCorrect, answer) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedSelectedAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswers([]);
  };

  const startQuiz = () => {
    setShowWelcome(false);
    fetchQuestions();
  };

  console.log('Rendering Quiz component', { isLoading, error, questions });
  
  if (showWelcome) {
    return (
      <div className="quiz">
        <h1>Devlab Quiz App</h1>
        <div className="welcome-screen">
          <h2>Welcome to the Quiz!</h2>
          <p>Test your knowledge about React and web development.</p>
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Showing error state');
    return (
      <div className="quiz">
        <h1>Devlab Quiz App</h1>
        <div className="error-message">
          {error}
          <button onClick={fetchQuestions}>Try Again</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    console.log('Showing loading state');
    return (
      <div className="quiz">
        <h1>Devlab Quiz App</h1>
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  console.log('Showing main quiz content');
  return (
    <div className="quiz">
      <h1>Devlab Quiz App</h1>
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} out of {questions.length}</h2>
          <button className="playAgain-btn" onClick={handlePlayAgainClick}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion]?.question}
          </div>

          <AnswerSection
            questions={questions}
            currentQuestion={currentQuestion}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />

          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                Previous
              </button>
            )}
            {currentQuestion < questions.length - 1 && (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
