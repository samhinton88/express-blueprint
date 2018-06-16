import React, { Component } from 'react';

import SignUpForm from '../SignUpForm';

class Signup extends Component {

  render() {

    return (
      <div className='sign-up'>
        <SignUpForm onSubmit={this.props.handleSignup}/>
      </div>
    )
  }
}

export default Signup;
