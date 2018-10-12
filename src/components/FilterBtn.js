import React, { Component } from 'react';
import './FilterBtn.css';

export default class FilterBtn extends Component {
  state = {
    isActive: false
  }

  btnClickHandler = () => {
    const { id, filter } = this.props;
    const { isActive } = this.state;

    this.props.onClick(id, filter, !isActive);
    this.setState(state => ({
      isActive: !state.isActive
    }));
  }

  render() {
    const { isActive } = this.state;
    const { value } = this.props;

    return (
      <button className={isActive ? "btn-toggle active" : "btn-toggle"} onClick={this.btnClickHandler}>{value}</button>
    );
  }
}
