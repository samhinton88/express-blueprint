import React, { Component } from 'react';
import {circleToPath} from './svg_helper';
import { connect } from 'react-redux';
import * as actions from '../../actions/action_creators';

class ResourceGraphic extends Component {
  state = {
    timer: 0
  }

  componentDidMount() {
    // const animationTimer = setInterval(() => this.setState({timer: this.state.timer + 0.05}), 17);
  }

  renderBackground  = () => {
    // const { timer } = this.state;

    // const colorMetric = Math.abs(Math.sin(timer))

    // return `rgba(${colorMetric * 100}, 100, 200, ${colorMetric})`
  }

  renderBlobX = (cx) => {
    // const { timer } = this.state;

    // const sway = Math.sin(timer) * 10
    // return cx - sway;
  }

  renderBlobY = (cy) => {
    // const { timer } = this.state;

    // const sway = Math.sin(timer) * 10 * 2

    // return cy + sway;
  }
  handleClick = () => {
    const { data } = this.props;
    console.log('clicked')
    this.props.setModeledResource(data)
  }

  render() {
    const { data: { resourceName, props }, geometry: { cx, cy, r }, style } = this.props;
    style.fill = 'rgba(255,255, 255, 1)'
    style.stroke = 'rgba(0, 0, 0, 1)'
    return(
      <g>
        {circleToPath({cx, cy, r, id: 'user', style, cb: this.handleClick })}
        <circle cx={cx -10} cy={cy -10} r={2} fill='black'/>

        <text x={cx} y={cy + 50}>

            {resourceName}

        </text>

      </g>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModeledResource: (resource) => {
      dispatch(actions.default.setModeledResource(resource))
    }
  }
}

const WiredResourceGraphic = connect(null, mapDispatchToProps)(ResourceGraphic);

export default WiredResourceGraphic;
