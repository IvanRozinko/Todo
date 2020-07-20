import React, {Component} from 'react';
import {Modal} from 'react-bulma-components';
import DatePicker from 'react-datepicker';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import 'react-datepicker/dist/react-datepicker.css';

class TodoEditItem extends Component {
  constructor (props) {
    super(props);
    const { task } = this.props;
    this.state = {
      task
    }
  };

  handleInputChange = ({target}) => {
    const {task} = this.state;
    this.setState({
      task: {
        ...task, [target.name]: target.value
      }
    })
  };

  handleDateChange = date => {
    const {task} = this.state;
    this.setState({
      task: {
        ...task, date: Date.parse(date)
      }
    })
  };

  render () {
    const {isOpen, toggleModal, updateTasks, deleteTask} = this.props;
    const {task} = this.state;
    return (
      <Modal
        closeOnEsc={true}
        show={isOpen}
        onClose={toggleModal}
      >
        <div className='modal-card'>
          <header className='modal-card-head has-background-primary'>
            <p className='modal-card-title'>Edit task</p>
            <button className='delete' onClick={toggleModal}/>
          </header>
          <section className='modal-card-body'>
            <div className="level">
              <DatePicker
                selected={task.date}
                onChange={this.handleDateChange}
                customInput={<CustomDateInput/>}
                dateFormat="dd/MM/yyyy"
                withPortal
              />
            </div>
            <input
              className='input is-primary'
              value={task.title}
              onChange={this.handleInputChange}
              name='title'
              maxLength={300}
            />
          </section>
          <footer className='modal-card-foot'>
            <button
              className='button is-danger'
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button
              className='button is-primary'
              onClick={() => updateTasks(task, toggleModal)}
            >
              Save
            </button>
          </footer>
        </div>
      </Modal>
    );
  };
}

export default TodoEditItem;
