import React from 'react';
import './Checkbox.css';

const Checkbox = ({ isChecked, onClick }) => (
  <div className="container" onClick={onClick} role='button'>
    <div className="checkbox-container">
      <div className={`${isChecked ? 'checked-side' : ''}`} />
      <div className={`${isChecked ? 'checked-bottom' : ''}`} />
    </div>
  </div>
);

export default Checkbox;
