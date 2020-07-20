import React, { Component } from 'react';

class CustomDateInput extends Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        className="button is-primary is-outlined"
        type="button"
      >
        {value}
      </button>
    );
  }
}

export default CustomDateInput;
