import React from "react";

const AnswerSection = ({
  questions,
  currentQuestion,
  handleAnswerOptionClick,
  selectedAnswer,
  isAnswered
}) => {
  return (
    <div className="answer-section">
      {questions[currentQuestion]?.answers &&
        Object.entries(questions[currentQuestion].answers).map(
          ([key, value]) => {
            if (!value) return null;
            
            const isCorrect = questions[currentQuestion].correct_answers[`${key}_correct`] === "true";
            const isSelected = selectedAnswer === value;
            
            let buttonClass = "answer-options";
            if (isAnswered) {
              if (isSelected) {
                buttonClass += isCorrect ? " correct" : " incorrect";
              } else if (isCorrect) {
                buttonClass += " correct";
              }
            } else if (isSelected) {
              buttonClass += " selected";
            }

            return (
              <button
                className={buttonClass}
                key={key}
                onClick={() => handleAnswerOptionClick(isCorrect, value)}
                disabled={isAnswered}
              >
                {value}
              </button>
            );
          }
        )}
    </div>
  );
};

export default AnswerSection;
