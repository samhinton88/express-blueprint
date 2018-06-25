import React, { Component } from 'react';
import style from './style.css';
import { connect } from 'react-redux';
import { advanceFrame, getInitialGeometry, mapRelations } from './geometry_helpers'

import ResourceGraphic from '../../components/ResourceGraphic';
import  * as actions  from '../../actions/action_creators'


class Canvas extends Component {
  getInitialGeometry = getInitialGeometry
  mapRelations = mapRelations
  state = {
    user: null,
    timer: 0,
    resourcePositions: [],
    relations: [],
    resourceMap: {}
  }

  advanceFrame = advanceFrame

  componentWillReceiveProps() {
    this.setState({resourcePositions: [], relations: []})
  }


  componentDidMount() {

    this.canvasTimer = setInterval(() => {
      if (this.state.resourcePositions.length === 0) {
        this.getInitialGeometry();
      }

      this.mapRelations();

      if (this.props.isAnimated) {
        this.advanceFrame()

      }

      this.setState({
        timer: this.state.timer + 0.01,
      })
    },
    20)
  }

  componentWillUnmount() {
    clearInterval(this.canvasTimer)
  }

  renderResources = () => {
    const { resourcePositions } = this.state;
    if(!resourcePositions) { return }
    return resourcePositions.map((res) => {
      const { cx, cy, r, resourceName, props } = res;
      return (
        <ResourceGraphic geometry={{cx, cy, r}} data={{resourceName, props}}/>
      )
    })
  }

  renderRelationshipLines = () => {
    const { relations, resourceMap } = this.state;

    if(!relations || Object.keys(resourceMap).length === 0) { return };


    return relations.map((rel, i) => {
      const [origin, destination] = rel;

      if (!resourceMap[origin] || !resourceMap[destination]) { return }

      const {cx: ox, cy: oy} = resourceMap[origin];
      const {cx: dx, cy: dy} = resourceMap[destination];

      return <line x1={ox} x2={dx} y1={oy} y2={dy} stroke="rgba(90, 90, 200, 1)" key={origin + destination + i}/>
    })

  }

  render() {

    return (
      <div className='canvas'>
        <svg viewBox='0 0 1000 500'>
          {this.renderRelationshipLines()}
          {this.renderResources()}
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
