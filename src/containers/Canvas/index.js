import React, { Component } from 'react';
import style from './style.css';
import { connect } from 'react-redux';

import ResourceGraphic from '../../components/ResourceGraphic';
import  * as actions  from '../../actions/action_creators'

class Canvas extends Component {
  state = {
    user: null,
    timer: 0
  }

  componentDidMount() {
    this.canvasTimer = setInterval(() => this.setState({timer: this.state.timer + 0.01}), 10)
  }

  componentWillUnmount() {
    clearInterval(this.canvasTimer)
  }

  renderResources = () => {
    const { blueprints, activeBlueprintId } = this.props;
    const { timer } = this.state;

    if (!activeBlueprintId || !blueprints) { return }
    const activeBlueprint = blueprints.find((b) => b._id === activeBlueprintId)

    if (!activeBlueprint) { return }
    // console.log(this)
    const { resources } = activeBlueprint;
    if(!resources) { return }
    return resources.map((r, i) => {
      const sizeMultiplier = r.props ? r.props.length * 2 : 1;

      const geometry = {
        cx: (1000 / (resources.length + 1) * (i + 1)),
        cy: 200 + (Math.sin(timer - i) * 20),
        r: (sizeMultiplier) + 25
      }

      return (
        <ResourceGraphic
          key={r.id}
          data={r}
          geometry={geometry}
          style={{fill: 'white', stroke: 'steelblue'}}
        />
    )})
  }

  renderRelationshipLines = () => {
    const { resources } = this.props;

  }

  render() {
    // console.log('props in canvas', this.props)


    return (
      <div className='canvas'>
        <svg viewBox='0 0 1000 500'>
          {this.renderResources()}
          {this.renderRelationshipLines()}
        </svg>
      </div>
    )
  }
}

const mapStateToProps = (state) => {


  return {
    resources: state.resourceReducer.resources,
    blueprints: state.blueprintReducer.blueprints,
    activeResources: state.activeResources,
    activeBlueprintId: state.uiReducer.activeBlueprint,
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    getUser: id => {
      dispatch(actions.default.getUser(id))
    },
    getActiveResources: blueprintId => {
      dispatch(actions.default.resourceActionCreators.getResources(blueprintId))
    }
  }
}



const WiredCanvas = connect(mapStateToProps, mapDispatchToProps)(Canvas)

export default WiredCanvas;
