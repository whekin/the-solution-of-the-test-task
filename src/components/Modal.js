import React, { Component } from 'react';
import Btn from './Btn';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/Modal.css';

const isMobile = 'ontouchstart' in document;

export default class Modal extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  state = {
    moveX: window.innerWidth * 0.5,
    moveY: window.innerHeight * 0.5,
    resolution: {
      x: window.innerWidth,
      y: window.innerHeight
    }
  };

  close() {
    this.props.onModalClose();
  }

  handleClick = event => {
    if (event.target.className === "Modal opened")
      this.close();
  };

  handleMouseMove = event => {
    this.setState({
      moveX: event.clientX,
      moveY: event.clientY
    });
  };

  handleTouchMove = event => {
    this.setState({
      moveX: event.touches[0].clientX,
      moveY: event.touches[0].clientY
    });
  };

  handleKeyDown = event => {
    event.preventDefault();
    if (event.keyCode === 13)
      this.close();
  }

  render() {
    const
      { moveX, moveY, resolution } = this.state,
      moveXFromCenterToOne = (moveX - resolution.x * 0.5) / resolution.x,
      moveYFromCenterToOne = (moveY - resolution.y * 0.5) / resolution.y,
      transform = `
        rotateX(${-moveYFromCenterToOne * 70}deg)
        rotateY(${moveXFromCenterToOne * 70}deg)
        translateX(${moveXFromCenterToOne * 100}px)
        translateY(${moveYFromCenterToOne * 100}px)`;

    return (
      <LanguageContext.Consumer>
        {language => (
          <div
            className={`Modal ${this.props.isOpen ? "opened" : "closed"}`}
            onMouseMove={this.props.isOpen && !isMobile ? this.handleMouseMove : false}
            onTouchMove={this.props.isOpen ? this.handleTouchMove : false}
            onClick={this.handleClick}>
            <div
              style={{
                transform
              }}
              className="Modal__window">
              <div className="Modal__header">{this.props.header}</div>
              <div className="Modal__body">
                <div className="Modal__body_content">
                  {this.props.message}
                </div>
              </div>
              <div className="Modal__footer">
                <Btn
                  onClick={this.props.onModalClose}
                  value={language.modal_btn_close_text} />
              </div>
            </div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}
