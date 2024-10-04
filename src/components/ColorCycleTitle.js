import React, { useEffect, useState } from 'react';
import '../styles/main.css';

const colors = [
  'var(--color-red)',
  'var(--color-orange)',
  'var(--color-yellow)',
  'var(--color-green)',
  'var(--color-blue)',
  'var(--color-indigo)',
  'var(--color-pink)',
  'var(--color-dark-green)',
];

const ColorCycleTitle = ({ text, isLitmusOn, isLitmusPlusOn }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setCharacters(text.split(''));
  }, [text]);

  useEffect(() => {
    if (isLitmusOn && isLitmusPlusOn) {
      const interval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLitmusOn, isLitmusPlusOn]);

  return (
    <h2 className="blog-post-title">
      {characters.map((char, index) => (
        <span
          key={index}
          style={{ color: isLitmusOn ? colors[(index + colorIndex) % colors.length] : 'var(--color-text-light)' }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default ColorCycleTitle;
