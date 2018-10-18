import React from 'react';
import '../stylesheets/Btn.css';

const Btn = (props) => (
      <button
        {...props}
        className="Btn waves-effect waves-light"
        onClick={props.onClick}>
        {props.value}
      </button>);
export default Btn;
