import React, { Component } from 'react';
import './Btn.css';

class FilterBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  btnClickHandler = () => {
    this.props.onClick(this.props.id, this.props.filter, !this.state.isActive);
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    return (
      <button className={this.state.isActive ? "btn-toggle active" : "btn-toggle"} onClick={this.btnClickHandler}>{this.props.value}</button>
    );
  }
}

export default FilterBtn;
