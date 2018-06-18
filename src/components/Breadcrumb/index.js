import React, { Component } from 'react';

class Breadcrumb extends Component {

  render() {
    const { onClick, lookupName } = this.props;

    return (
      <div onClick={onClick}>
        {lookupName}
      </div>
    )
  }
}

export default Breadcrumb;
