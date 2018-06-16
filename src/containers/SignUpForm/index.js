import React from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './style.css'

let SignUpForm = props => {

  const { handleSubmit } = props;

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='auth-form-section'>

        <Field name='email' placeholder='email' component='input' type='email' className='auth-form-input'/>
      </div>
      <div className='auth-form-section'>

        <Field name='password' placeholder='password' component='input' type='password' className='auth-form-input'/>
      </div>
      <div className='auth-form-section'>

        <Field name='password-confirm' placeholder='confirm password' component='input' type='password' className='auth-form-input'/>
      </div>
      <button type='submit' className='btn-sign-up'>join up</button>
    </form>
  )
}

SignUpForm = reduxForm({
  form: 'sign-up'
})(SignUpForm);

export default SignUpForm;
