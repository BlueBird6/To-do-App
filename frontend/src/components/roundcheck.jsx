import React, { useState } from 'react';
import './roundcheck.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const RoundCheck = ({checked, onClick}) => {
  const [isChecked, setIsChecked] = useState(checked);
  console.log(isChecked);

  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
    setIsChecked(true);
  };

  return (
    <div
      className={`circle ${isChecked ? 'checked' : ''}`}
      onClick={handleClick}
      title='Mark as completed'
    >
      {isChecked && (
        <FontAwesomeIcon icon={faCheck} />
      )}
    </div>
  );
};

export default RoundCheck;
