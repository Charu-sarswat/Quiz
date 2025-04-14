import React from 'react';

const Butterfly = ({ count = 5 }) => {
  const colors = [
    '#FF3CAC', '#784BA0', '#2B86C5', '#FF5E62', 
    '#45B649', '#FFA07A', '#87CEEB', '#DDA0DD',
    '#FFD700', '#98FB98', '#FF69B4', '#9370DB'
  ];
  
  return (
    <div className="butterflies">
      {[...Array(count)].map((_, i) => {
        const size = 30 + Math.random() * 30; // Random size between 30-60px
        return (
          <div key={i} className="butterfly" style={{
            animationDelay: `${i * 2}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`
          }}>
            <div className="wing left" style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}80, ${colors[Math.floor(Math.random() * colors.length)]}80)`
            }}></div>
            <div className="wing right" style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}80, ${colors[Math.floor(Math.random() * colors.length)]}80)`
            }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default Butterfly;
