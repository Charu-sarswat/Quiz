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
      
      // Add a short delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockQuestions = [
        {
          question: "What is React?",
          answers: {
            answer_a: "A JavaScript library for building user interfaces",
            answer_b: "A programming language",
            answer_c: "A database",
            answer_d: "An operating system"
          },
          correct_answers: {
            answer_a_correct: "true",
            answer_b_correct: "false",
            answer_c_correct: "false",
            answer_d_correct: "false"
          }
        },
        {
          question: "Which hook is used for side effects in React?",
          answers: {
            answer_a: "useState",
            answer_b: "useEffect",
            answer_c: "useContext",
            answer_d: "useReducer"
          },
          correct_answers: {
            answer_a_correct: "false",
            answer_b_correct: "true",
            answer_c_correct: "false",
            answer_d_correct: "false"
          }
        }
      ];

      setQuestions(mockQuestions);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load questions. Please try again later.');
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
