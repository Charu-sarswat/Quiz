import React, { useState, useEffect } from "react";
import "./QuizStyle.css";
import AnswerSection from "./AnswerSection";
import ProgressTracker from "./ProgressTracker";
import ResultsSummary from "./ResultsSummary";
import Confetti from "./Confetti";
import LoadingSpinner from "./LoadingSpinner";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Butterfly from './Butterfly';
import Balloons from './Balloons';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

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
    },
    {
      question: "What is the useState Hook in React?",
      answers: {
        answer_a: "A Hook that lets you use state in functional components",
        answer_b: "A database management tool",
        answer_c: "A React routing mechanism",
        answer_d: "A styling component"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "useState is a Hook that allows you to add state management to functional components in React."
    },
    {
      question: "What is the useEffect Hook used for?",
      answers: {
        answer_a: "Handling side effects in functional components",
        answer_b: "Creating visual effects",
        answer_c: "Managing database connections",
        answer_d: "Styling components"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "useEffect is used for handling side effects like data fetching, subscriptions, or DOM manipulation in React components."
    },
    {
      question: "What is React Router?",
      answers: {
        answer_a: "A routing library for React applications",
        answer_b: "A network device",
        answer_c: "A state management tool",
        answer_d: "A testing framework"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "React Router is a standard routing library for React that allows you to handle routes in a web app."
    },
    {
      question: "What is React Context?",
      answers: {
        answer_a: "A way to pass data through the component tree without props",
        answer_b: "A React database",
        answer_c: "A third-party state management library",
        answer_d: "A routing solution"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "React Context provides a way to share values between components without explicitly passing props through every level."
    },
    {
      question: "What are React Hooks?",
      answers: {
        answer_a: "Functions that let you use state and other React features in functional components",
        answer_b: "Tools for handling database operations",
        answer_c: "Physical devices for React development",
        answer_d: "Backend APIs for React"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "Hooks are functions that allow you to 'hook into' React state and lifecycle features from function components."
    },
    {
      question: "What is the Virtual DOM in React?",
      answers: {
        answer_a: "A lightweight copy of the actual DOM",
        answer_b: "A virtual reality development tool",
        answer_c: "A web browser feature",
        answer_d: "A database management system"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "The Virtual DOM is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM."
    },
    {
      question: "What is Redux in React?",
      answers: {
        answer_a: "A state management library for React applications",
        answer_b: "A routing library",
        answer_c: "A styling framework",
        answer_d: "A testing tool"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "Redux is a predictable state container designed to help you write JavaScript apps that behave consistently."
    },
    {
      question: "What is React Props?",
      answers: {
        answer_a: "Arguments passed into React components",
        answer_b: "Local storage in React",
        answer_c: "React database properties",
        answer_d: "Server configurations"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "Props are arguments passed into React components, similar to HTML attributes and function parameters."
    },
    {
      question: "What is React Memo?",
      answers: {
        answer_a: "A higher-order component for performance optimization",
        answer_b: "A note-taking feature",
        answer_c: "A memory management tool",
        answer_d: "A React documentation"
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false"
      },
      explanation: "React.memo is a higher-order component that can be used to wrap components that only render when their props change."
    }
  ];

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      // Just use fallback questions directly
      setQuestions(fallbackQuestions);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Something went wrong. Please try again.');
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
    if (!showWelcome && !showScore) {
      const interval = setInterval(() => {
        setTotalTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
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
    setShowWelcome(true);
    setTotalTimeSpent(0);
  };

  const startQuiz = () => {
    setIsLoading(true); // Show loading state during transition
    setTimeout(() => {
      setShowWelcome(false);
      setTimeLeft(30);
      setTotalTimeSpent(0);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswers({});
      setAnsweredQuestions({});
      fetchQuestions();
      setIsLoading(false);
    }, 500); // Add small delay for transition
  };

  const handleLogin = (credentials) => {
    // Extract name from email by:
    // 1. Split at @ to remove domain
    // 2. Remove any numbers
    // 3. Capitalize first letter
    const rawName = credentials.email.split('@')[0];
    const nameWithoutNumbers = rawName.replace(/[0-9]/g, '');
    const formattedName = nameWithoutNumbers.charAt(0).toUpperCase() + 
                         nameWithoutNumbers.slice(1).toLowerCase();
    
    setIsAuthenticated(true);
    setUserProfile({ name: formattedName });
    localStorage.setItem('quizUser', JSON.stringify({ name: formattedName }));
  };

  const handleRegister = (userData) => {
    // In a real app, send registration data to an API
    setIsAuthenticated(true);
    setUserProfile({ name: userData.name });
    localStorage.setItem('quizUser', JSON.stringify({ name: userData.name }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('quizUser');
    setShowWelcome(true);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(savedUser));
    }
  }, []);

  // Prevent showing questions before they're loaded
  if (questions.length === 0 && !showWelcome && !error && !isLoading) {
    return <LoadingSpinner />;
  }

  console.log('Rendering Quiz component', { isLoading, error, questions });

  if (!isAuthenticated) {
    return (
      <>
        <Butterfly count={3} />
        <Balloons count={8} />
        <div className="quiz">
          <h1>Devlab Quiz App</h1>
          {showLogin ? (
            <Login 
              onLogin={handleLogin}
              switchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <Register 
              onRegister={handleRegister}
              switchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </>
    );
  }

  if (showWelcome) {
    return (
      <>
        <Butterfly count={5} />
        <Balloons count={8} />
        <div className="quiz">
          <div className="user-profile">
            <span>Welcome, {userProfile?.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
          <h1>Devlab Quiz App</h1>
          <div className="welcome-screen">
            <h2>Welcome to the Quiz!</h2>
            <p>Test your knowledge about Science and new Creativity.</p>
            <button className="start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    console.log('Showing error state');
    return (
      <>
        <Butterfly count={2} />
        <Balloons count={8} />
        <div className="quiz">
          <h1>Devlab Quiz App</h1>
          <div className="error-message">
            {error}
            <button onClick={fetchQuestions}>Try Again</button>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    console.log('Showing loading state');
    return (
      <>
        <Butterfly count={3} />
        <Balloons count={8} />
        <div className="quiz">
          <h1>Devlab Quiz App</h1>
          <LoadingSpinner />
        </div>
      </>
    );
  }

  console.log('Showing main quiz content');
  return (
    <>
      <Butterfly count={4} />
      <Balloons count={8} />
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
    </>
  );
};

export default Quiz;
