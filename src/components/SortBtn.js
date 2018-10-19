import React, { Component } from 'react';
import BtnToggle from './BtnToggle';

export default class SortBtn extends Component {

  handleBtnClick = () => {
    this.props.onClick(this.props.id, this.props.sort);
  }

  render() {
    return (
      <BtnToggle
        {...this.props}
        onClick={this.handleBtnClick} />
    );
  }
}
