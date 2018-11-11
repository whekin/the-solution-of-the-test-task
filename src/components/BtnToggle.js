import React, { Component } from 'react';
import Btn from '@material-ui/core/Button';

class BtnToggle extends Component {
  state = { isActive: this.props.actived };

  static defaultProps = {
    color: "primary",
    variant: "text"
  }

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
      <Btn
        color={this.props.color}
        variant={isActive ? "contained" : this.props.variant}
        onClick={this.handleBtnClick}>
        {value}
      </Btn>
    );
  }
}

export default BtnToggle;
