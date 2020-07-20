import React from 'react';
import './TodoListItem.css';
import Checkbox from '../Checkbox/Checkbox';

const TodoListItem = ({
  task, onClick, updateTasks, timeStampToString,
}) => (
  <div className="box">
    <div className="columns is-mobile is-vcentered">
      <div className="column is-1">
        <div className="level-item">
          <Checkbox isChecked={task.done} onClick={() => updateTasks({ ...task, done: !task.done })} />
        </div>
      </div>
      <div className="column is-11 pointer title-container" onClick={() => onClick(task.id)} role='button'>
        <p className={`level-left task-title ${task.done ? 'task-done' : ''}`}>{task.title}</p>
      </div>
    </div>
    <div className="columns level-right">
      <div className="level-right" onClick={() => onClick(task.id)} role='button'>
        <div className="has-text-right task-date">{timeStampToString(task.date)}</div>
      </div>
    </div>
  </div>
);

export default TodoListItem;
