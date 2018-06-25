import React, { Component } from 'react';
import style from './style.css';

class ErrorEmitter extends Component {

  renderErrors = () => {
    const { errors } = this.props;

    if (!errors) { return }

    const aggregatedErrors = errors.aggregatedErrors();

    return aggregatedErrors.map((err, i) => {
      return (
        <div
          className='error-emitter-error'
          key={err.message + i}
          style={{background: err.blocking ? 'red' : 'orange'}}
        >
          <div className='error-body'>
            {err.message}
          </div>
          <div className='error-hint-btn'>
            ?
          </div>
        </div>
      )
    })
  }

  renderEmoji = () => {
    if (!this.props.errors) { return }

    const {
      errors
    } = this.props;

    const aggregatedErrors = errors.aggregatedErrors().filter((e) => e !== undefined)

    let signal = 'clean';

    if (aggregatedErrors.length > 0) {
      signal = 'warning';
    }

    if (aggregatedErrors.some((e) => e.blocking)) {
      signal = 'blocking'
    }

    const emojiMap = {
      clean:      '😀',
      warning:    '🤔',
      blocking:   '😖'
    }

    return <div className='error-emoji'>{emojiMap[signal]}</div>
  }

  render() {

    return (
      <div className='error-emitter'>
        {this.renderEmoji()}

        {this.renderErrors()}
      </div>
    )
  }
}

export default ErrorEmitter;
