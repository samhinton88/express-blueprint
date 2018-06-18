import React, { Component } from 'react';
import style from './style.css';

class LeftNav extends Component {

  handleClick = () => {
    console.log(this)
  }

  render() {

    return (
      <div className='left-nav'>
        <button onClick={this.handleClick}>PRINT CODEBASE</button>
      </div>
    )
  }
}

export default LeftNav;
