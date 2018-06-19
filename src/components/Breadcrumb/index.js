import React, { Component } from 'react';
import style from './style.css';

class Breadcrumb extends Component {

  handleClick = ()  => {
    this.props.onClick(this.props.index)
  }

  render() {
    const { onClick, lookupName } = this.props;

    return (
      <div className='breadcrumb' onClick={this.handleClick}>
        {lookupName}<span className='dot-operator'>.</span>
      </div>
    )
  }
}

export default Breadcrumb;
