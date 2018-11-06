import React from 'react';
import BtnToggle from './BtnToggle';

const SortBtn = props => (
  <BtnToggle
    {...props}
    actived={props.activedId === props.id}
    onClick={() => {
      props.activeSortBtn(props.id, props.sort);
    }} />
);

export default SortBtn;
