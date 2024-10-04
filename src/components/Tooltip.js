import React, { useState, useRef, useEffect } from 'react';
import '../styles/main.css';

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef(null);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.zIndex = '1000'; // Ensure tooltip is on top
    }
  }, [visible]);

  return (
    <span
      className="custom-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div className="custom-tooltip" ref={tooltipRef}>
          {text}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
