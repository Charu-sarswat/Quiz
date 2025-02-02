import React, { useState, useEffect } from "react";
import "./QuizStyle.css";
import AnswerSection from "./AnswerSection";
import ProgressTracker from "./ProgressTracker";
import ResultsSummary from "./ResultsSummary";
import Confetti from "./Confetti";
import LoadingSpinner from "./LoadingSpinner";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [difficulty] = useState('Medium'); // You can make this dynamic later

  const fetchQuestions = async () => {
    try {
      console.log('Starting to fetch questions...');
      setIsLoading(true);
      
      // Fallback questions in case the API fails
      const fallbackQuestions = [
        {
          question: "What is React?",
          answers: {
            answer_a: "A JavaScript library for building user interfaces",
            answer_b: "A programming language",
            answer_c: "A database management system",
            answer_d: "An operating system"
          },
          correct_answers: {
            answer_a_correct: "true",
            answer_b_correct: "false",
            answer_c_correct: "false",
            answer_d_correct: "false"
          },
          explanation: "React is a JavaScript library developed by Facebook for building user interfaces."
        },
        {
          question: "What is JSX?",
          answers: {
            answer_a: "A JavaScript XML syntax",
            answer_b: "A new programming language",
            answer_c: "A database query language",
            answer_d: "A styling framework"
          },
          correct_answers: {
            answer_a_correct: "true",
            answer_b_correct: "false",
            answer_c_correct: "false",
            answer_d_correct: "false"
          },
          explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
        }
      ];

      try {
        // First try the API
        const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
        const API_URL = encodeURIComponent('https://api.jsonserve.com/Uw5CrX');
        const fullUrl = CORS_PROXY + API_URL;
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
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

        setQuestions(formattedQuestions);
      } catch (apiError) {
        console.warn('API failed, using fallback questions:', apiError);
        setQuestions(fallbackQuestions);
      }

      setIsLoading(false);
      setError(null);
      
    } catch (error) {
      console.error('Error in fetchQuestions:', error);
      setError('Failed to load questions. Please refresh the page or try again later.');
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

  useEffect(() => {
    if (!showWelcome && !showScore && !answeredQuestions[currentQuestion] && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !answeredQuestions[currentQuestion]) {
      // Auto-submit when time runs out
      handleAnswerOptionClick(false, null);
    }
  }, [timeLeft, showWelcome, showScore, currentQuestion]);

  useEffect(() => {
    let interval;
    if (!showWelcome && !showScore) {
      interval = setInterval(() => {
        setTotalTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showWelcome, showScore]);

  const handleAnswerOptionClick = (isCorrect, answer) => {
    if (!answeredQuestions[currentQuestion]) {
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));

      setAnsweredQuestions(prev => ({
        ...prev,
        [currentQuestion]: true
      }));

      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setTimeLeft(30); // Reset timer for next question
        } else {
          setShowScore(true);
        }
      }, 1000);
    }
  };

  const handlePlayAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswers({});
    setAnsweredQuestions({});
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
          <p>Test your knowledge about Science and new Creativity.</p>
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
        <LoadingSpinner />
      </div>
    );
  }

  console.log('Showing main quiz content');
  return (
    <div className="quiz">
      <h1>Devlab Quiz App</h1>
      {showScore ? (
        <div className="score-section">
          <Confetti score={score} totalQuestions={questions.length} />
          <ResultsSummary 
            score={score}
            totalQuestions={questions.length}
            timeSpent={totalTimeSpent}
            difficulty={difficulty}
          />
          <button className="playAgain-btn" onClick={handlePlayAgainClick}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="question-section">
          <div className="timer-container">
            <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
              Time Left: {timeLeft}s
            </div>
          </div>
          
          <ProgressTracker 
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            score={score}
          />
          
          <div className="question-text">
            {questions[currentQuestion]?.question}
          </div>

          <AnswerSection
            questions={questions}
            currentQuestion={currentQuestion}
            handleAnswerOptionClick={handleAnswerOptionClick}
            selectedAnswer={selectedAnswers[currentQuestion]}
            isAnswered={answeredQuestions[currentQuestion]}
          />

          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                ← Previous
              </button>
            )}
            {currentQuestion < questions.length - 1 && (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                Next →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
