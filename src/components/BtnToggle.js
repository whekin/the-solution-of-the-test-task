import React, { Component } from 'react';
import '../stylesheets/BtnToggle.css';

export default class FilterBtn extends Component {
  state = { isActive: this.props.actived };

  handleBtnClick = () => {
    this.props.onClick(!this.state.isActive);

    this.setState(state => ({ isActive: !state.isActive }) );
  };

  componentDidUpdate() {
    if (!(typeof this.props.actived === "undefined") && this.state.isActive !== this.props.actived)
      this.setState({ isActive: this.props.actived });
  }

  render() {
    const { isActive } = this.state;
    const { value } = this.props;

    return (
      <button
        className={
          isActive
            ? "btn-toggle waves-effect waves-light active"
            : "btn-toggle waves-effect waves-light"}
        onClick={this.handleBtnClick}>
        {value}
      </button>
    );
  }
}
