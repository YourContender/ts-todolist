import React from 'react';

interface CircleProps {
  percent: number;
}

const Test: React.FC<CircleProps> = ({ percent }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - percent / 100);

  return (
    <svg width="30" height="30" viewBox="10 10 100 100">
      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke="#cccccc"
        strokeWidth="10"
      />
      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke="#270acc"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
};

export { Test }