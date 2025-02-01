import React from 'react';

const ResultsSummary = ({ score, totalQuestions, timeSpent, difficulty }) => {
  const percentage = (score / totalQuestions) * 100;
  
  const getFeedback = () => {
    if (percentage >= 80) return "🌟 Outstanding!";
    if (percentage >= 60) return "👍 Good job!";
    if (percentage >= 40) return "💪 Keep practicing!";
    return "📚 More study needed";
  };

  return (
    <div className="results-summary">
      <h2>{getFeedback()}</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Score</span>
          <span className="stat-value">{percentage.toFixed(1)}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Correct Answers</span>
          <span className="stat-value">{score}/{totalQuestions}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Time Spent</span>
          <span className="stat-value">{timeSpent}s</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">{difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary; 