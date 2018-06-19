import React, { Component } from 'react';
import style from './style.css';

const FrameTab = ({ onClick, position, isActive, theme, blueprintName, resourceCount }) => {
  const style = theme ? theme.frameTab : '';

  return (<div
      onClick={onClick}
      style={
        isActive ? style.active : style.inactive
      }
      className='frame-tab'
    >
      <h5>{blueprintName} {resourceCount ? '(' + resourceCount + ')' : ''}</h5>
    </div>)

}

export default FrameTab;
