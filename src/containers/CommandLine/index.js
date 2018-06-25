import React, { Component } from 'react';
import style from './style.css';
import { connect } from 'react-redux';
import * as actions  from '../../actions/action_creators'

import parse from '../../helpers/command-line-helpers/parse';
import linter from '../../helpers/command-line-helpers/linter';
import CMDChar from '../../components/CMDChar';
import ErrorEmitter from '../../components/ErrorEmitter';

class CommandLine extends Component {
  state = {
    value: '',
    valueBeforeCursor: '',
    valueAfterCursor: '',
    cursorPosition: -1,
    errors: null
  }

  handleEnter = () => {
    console.log('TRYING TO SUBMIT')
    const { value, errors } = this.state;
    const { activeBlueprintId, blueprints, user } = this.props;


    if (!activeBlueprintId || !blueprints || !user) { return }

    const activeBlueprint = blueprints.find((b) => b._id === activeBlueprintId)
    console.log('THROUGH RETURN CHECKS')
    const imperative = value.split(' ')[0];
    switch (imperative) {
      case 'test':
        const testParse = parse('create resource nesty stats:{nestedProp:N,deepStats2:{deeperProp2:N},deepStats:{deepProp:N,deeperStats:{deeperProp:N}}}')
        this.props.handleCreateExecution(testParse, activeBlueprintId, user._id);
      case 'create':
        const parsedCommand = parse(value, activeBlueprint);

        console.log(parsedCommand)

        this.props.handleCreateExecution(parsedCommand, activeBlueprintId, user._id);
        break
      case 'delete':
        const resourceName = value.split(' ')[1];
        const candidateResourceName = activeBlueprint.resources.find((r) => r.resourceName === resourceName).resourceName
        this.props.handleDeleteExecution(user._id, activeBlueprint._id, candidateResourceName)
        break
      case 'viewer':
        const viewerCommand = value.split(' ')[1];
      default:
        console.log('verb not known')
    }

    this.props.refreshUser(user._id)

    this.setState({ value: '' });
  }

  handleCharClick = (spanCardinalPosition) => {
    const { value } = this.state;
    const newCursorPosition = spanCardinalPosition - 1;

    this.setState(
      { cursorPosition: newCursorPosition,
        valueBeforeCursor: value.split('').slice(0, newCursorPosition + 1).join(''),
        valueAfterCursor: value.split('').slice(newCursorPosition + 1, value.length).join('')
      }
    )
  }

  renderValue = () => {
    const { value, cursorPosition } = this.state;

    const tokens = value.split(' ');

    const processedValue = [];
    let counter = 0;

    const colObj = {
      'create':   'lightgreen',
      'resource': 'lightblue',
      'add':      'orange',
      'prop':     'silver',
      'delete':   'crimson'
    };

    tokens.forEach((t) => {
      if (colObj[t]) {

        t.split('').forEach((char) => {
          // preserve counter position as constant
          const c = counter;

          processedValue.push(
            <CMDChar
              key={c}
              cardinalPosition={c}
              onClick={() => this.handleCharClick(c)}
              char={char}
              style={colObj[t]}
            />
          )
          counter++
        });

      } else {

        t.split('').forEach((char) => {
          const c = counter;

          processedValue.push(
            <CMDChar
              key={c}
              cardinalPosition={c}
              onClick={() => this.handleCharClick(c)}
              char={char}
              style='white'
            />
          )
          counter++
        })
      }

      const c = counter;
      processedValue.push(
        <CMDChar
          key={c}
          cardinalPosition={c}
          onClick={() => this.handleCharClick(c)}
          char={'_'}
          style='transparent'
        />
      )
      counter++
    })

    return [...processedValue.slice(0, cursorPosition + 1),
            <span key={`crs${cursorPosition}`}className='command-line-cursor'>|</span>,
            ...processedValue.slice(cursorPosition + 1)
            ]
  }

  handleDummyInputKeyUp = (e) => {
    const { activeBlueprintId, blueprints } = this.props;

    if (!activeBlueprintId || !blueprints) { return }

    const activeBlueprint = blueprints.find((b) => b._id === activeBlueprintId)

    // prevent input from being rendered into dummy input div

    this.refs.dummyInput.innerHTML = '';

    // set input into state, adjust dummy cursor position
    const { key } = e;
    const { value, cursorPosition, valueBeforeCursor, valueAfterCursor } = this.state;
    const endChar = valueBeforeCursor.split('')[valueBeforeCursor.length - 1] || '';

    const noChange = valueBeforeCursor + valueAfterCursor;

    let update, specialChar, cursorAdjustment = 1;
    // DRY by assuming no change
    update = noChange;

    switch(key) {
      case 'Backspace':
        update = valueBeforeCursor
                    .split('')
                    .slice(0, valueBeforeCursor.length - 1)
                    .join('')
                + valueAfterCursor;

        cursorAdjustment = 0;
        break
      case 'Enter':
        this.handleEnter();
        update = '';
        cursorAdjustment = -noChange.length;
        break
      case 'Shift':
        cursorAdjustment = 0;
        break
      case 'ArrowRight':
      case 'ArrowLeft':
        cursorAdjustment = -1;
        break
      default:
        update = valueBeforeCursor
                    .split('')
                    .slice(0, valueBeforeCursor.length - 1)
                    .join('')
                + endChar + key + valueAfterCursor;
        break
    }
    // ensure cursor position does not exceed the length of the value
    const atStart = (cursorPosition + cursorAdjustment) < -1;
    const atEnd = (cursorPosition + cursorAdjustment) > update.length -1;
    let newCursorPosition;

    if (atStart) {
      newCursorPosition = -1;
    } else if (atEnd) {
      newCursorPosition = update.length -1;
    } else {
      newCursorPosition = cursorPosition + cursorAdjustment;
    }

    const errors = linter(update, null, activeBlueprint)

    this.setState(
      {
        value: update,
        cursorPosition: newCursorPosition,
        valueBeforeCursor: update.split('').slice(0, newCursorPosition + 1).join(''),
        valueAfterCursor: update.split('').slice(newCursorPosition + 1, update.length).join(''),
        errors
      })
    }

  render() {
    // render editable div with transparent overlay to rerender content
    const { errors } = this.state;

    return (
      <div className='command-line-container'>
        <div className='command-line'>
          <div className='command-line-layering-container'>
            <div className='underlay' onClick={() => this.refs.dummyInput.focus()}>
              <p style={{ margin: 0 }}>{this.renderValue()}</p>
            </div>
            <div
              className='dummy-input'
              contentEditable
              suppressContentEditableWarning
              ref={'dummyInput'}
              onKeyUp={this.handleDummyInputKeyUp}
            >
            </div>
          </div>
        </div>
        <div className='error-emitter-container'>
          <ErrorEmitter errors={errors}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeBlueprintId: state.uiReducer.activeBlueprint,
    user: state.authReducer.user,
    blueprints: state.blueprintReducer.blueprints
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCreateExecution: (input, blueprintId, userId)=> {
      dispatch(actions.default.addResourceToBlueprint(input, blueprintId, userId))
    },
    handleDeleteExecution: (userId, blueprintId, resourceId) =>  {
      dispatch(actions.default.deleteResourceFromBlueprint(userId, blueprintId, resourceId))
    },
    refreshUser: (userId) => {
      dispatch(actions.default.getUser(userId))
    },
    refreshActiveBlueprint: (blueprintId) => {

    }
  }
}

const WiredCommandLine = connect(mapStateToProps, mapDispatchToProps)(CommandLine);

export default WiredCommandLine;
