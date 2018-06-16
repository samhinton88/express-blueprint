import React from 'react';
import style from './style.css';

const CMDChar = ({ onClick, char, cardinalPosition, style = {} }) => {

  return(
    <span
      className='command-line-char'
      style={{ color: style}}
    >
      {char}
    </span>
  )
}

export default CMDChar;
