import React from 'react';

const Balloons = ({ count = 10 }) => {
  const colors = ['#FF3CAC', '#784BA0', '#2B86C5', '#FF5E62', '#FF9966', '#45B649', '#6B8DD6'];
  
  return (
    <div className="balloons">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 2}s`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <div className="balloon-string"></div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;
