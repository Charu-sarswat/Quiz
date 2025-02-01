import React from 'react';

const ProgressTracker = ({ totalQuestions, currentQuestion, score }) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  const successRate = currentQuestion > 0 
    ? ((score / currentQuestion) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="progress-tracker">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-stats">
        <div className="stat-item">
          <span>Question:</span> {currentQuestion + 1}/{totalQuestions}
        </div>
        <div className="stat-item">
          <span>Correct:</span> {score}
        </div>
        <div className="stat-item">
          <span>Success Rate:</span> {successRate}%
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
