import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = ({ score, totalQuestions }) => {
  useEffect(() => {
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage >= 80) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }
  }, [score, totalQuestions]);

  return null;
};

export default Confetti; 