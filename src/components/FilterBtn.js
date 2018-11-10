import React, { Component } from 'react';
import BtnToggle from './BtnToggle';

export default class FilterBtn extends Component {
  handleBtnClick = isActive => {
    const { id, filter } = this.props;
    this.props.toggleFilterBtn(id, isActive, filter);
  }

  render() {
    return (
      <BtnToggle
        {...this.props}
        onClick={this.handleBtnClick} />
    );
  }
}
