import React from 'react';
import './Heading.css';

export default ({ addTask, timeStampToString }) => (
  <div className="column heading heading-container">
    <div className="columns level-item">
      <h1 className="title is-2 heading-title has-text-centered">
        Make your list
      </h1>
    </div>
    <div className="columns is-vcentered is-mobile">
      <div className="column">
        <p className="subtitle">
          {timeStampToString(Date.now())}
        </p>
      </div>
      <div className="column level-right">
        <button
          className="button is-primary"
          onClick={addTask}
          type='button'
        >
          Add task
        </button>
      </div>
    </div>
  </div>
);
