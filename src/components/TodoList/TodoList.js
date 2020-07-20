import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import tasksMock from '../../assets/mock/todos';
import TodoListItem from '../TodoListItem/TodoListItem';
import TodoEditItem from '../TodoEditItem/TodoEditItem';

class TodoList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeTask: undefined,
      isOpenModal: false
    };
  }

  componentDidMount () {
    const store = localStorage.getItem('tasks');
    const storedTasks = JSON.parse(store);
    this.setState({ tasks: storedTasks && storedTasks.length ? storedTasks : tasksMock })
  }

  componentDidUpdate (prevProps, prevState) {
    const { tasks } = this.state;
    if (prevState.tasks !== tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  addTask = () => {
    const { tasks } = this.state;
    const task = {
      id: this.getNewTaskId(),
      title: 'New task, press to edit...',
      date: Date.now(),
      done: false
    };
    this.setState({
      tasks: [...tasks, task]
    })
  };

  getNewTaskId = () => {
    const { tasks } = this.state;
    let id = 1;
    if (tasks.length) {
      tasks.sort((a, b) => a.id - b.id);
      const lastTask =  tasks.slice(-1).pop();
      id = lastTask.id + 1;
    }
    return id ;
  };

  deleteTask = id => {
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter(task => task.id !== id)});
    this.toggleModal();
  };

  handleItemClick = id => {
    const { tasks } = this.state;
    this.setState({ activeTask: tasks.find(task => task.id === id)});
    this.toggleModal();
  };

  toggleModal = () => this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));

  updateTasks = (updatedTask, callback) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? {...task, ...updatedTask} : task);
    this.setState({ tasks: updatedTasks });
    callback && callback();
  };

  timeStampToString = timestamp => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  };

  render() {
    const { tasks, activeTask, isOpenModal } = this.state;
    return(
          <div className="columns is-centered is-gapless">
            <div className="column is-three-fifths">
              <Heading
                timeStampToString={this.timeStampToString}
                addTask={this.addTask}
              />
              <div className="column">
                {tasks.map(task =>
                  <TodoListItem
                    task={task}
                    key={task.id}
                    onClick={this.handleItemClick}
                    updateTasks={this.updateTasks}
                    timeStampToString={this.timeStampToString}
                  />
                )}
              </div>
              {isOpenModal &&
              <TodoEditItem
                task={activeTask}
                isOpen={isOpenModal}
                toggleModal={this.toggleModal}
                updateTasks={this.updateTasks}
                handleInputChange={this.handleInputChange}
                deleteTask={this.deleteTask}
              />
              }
            </div>
          </div>
    );
  }
}

export default TodoList;
