import React, { Component } from 'react';

class PropNameTab extends Component {

  render() {
    const { name } = this.props;

    console.log(this)

    return (
      <div onClick={this.props.onClick}>
        {name}
      </div>
    )
  }
}

export default PropNameTab;
