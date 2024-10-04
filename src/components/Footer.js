import React from 'react';
import Tooltip from './Tooltip';

const Footer = ({ toggleLitmus, toggleLitmusPlus, isLitmusOn, isLitmusPlusOn }) => {
  return (
    <footer className="footer">
      <Tooltip text="Activate coloring mode for the page.">
        <label htmlFor="litmus-toggle" className="checkbox-label">
          <input
            id="litmus-toggle"
            type="checkbox"
            checked={isLitmusOn}
            onChange={toggleLitmus}
          />
          Litmus
        </label>
      </Tooltip>

      <Tooltip text="Enable character-by-character color cycling. Works only if Litmus is active.">
        <label htmlFor="litmus-plus-toggle" className="checkbox-label">
          <input
            id="litmus-plus-toggle"
            type="checkbox"
            checked={isLitmusPlusOn}
            onChange={toggleLitmusPlus}
            disabled={!isLitmusOn}
          />
          Litmus+
        </label>
      </Tooltip>
    </footer>
  );
};

export default Footer;
