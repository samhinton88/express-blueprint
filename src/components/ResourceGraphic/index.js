import React, { Component } from 'react';
import {circleToPath} from './svg_helper';
import { connect } from 'react-redux';
import * as actions from '../../actions/action_creators';
import style from './style.css';

class ResourceGraphic extends Component {
  state = {
    timer: 0,
    isFocused: false,
    randomNums: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
  }

  componentDidMount() {

    const animationTimer = setInterval(() => {
      const { timer } = this.state;




      this.setState({timer: this.state.timer +  0.03})
    }, 17);
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

  renderTimer = () => {
    return 5 + Math.sin(this.state.timer) * 5;
  }

  renderPlayfulSpots = () => {
    const { geometry: {cx, cy} } = this.props;


    return [1,2,3,4,5,6,7,8,9].map((i, ind) => {
      return <circle
        style={{animationName: 'pop', animationDelay: `${i/ 5}s`, animationDuration: '0.1s', animationFillMode: 'both'}}
        cx={cx + Math.tan(1 / i) * 20}
        cy={cy + Math.tan(1 / i) * 20}
        r={2}
        fill='rgba(249,38,114, 1)'/>
    })
  }

  render() {
    const { data: { resourceName, props }, geometry: { cx, cy, r }, modeledResource } = this.props;

    const isModeled = modeledResource && modeledResource.resourceName === resourceName;

    const style = {};
    style.fill = 'rgba(249,38,114, 1)'
    style.stroke = isModeled
                  ? 'red'
                  :
                  'none'
    return(
      <g>
        {circleToPath({cx, cy, r, id: 'user', style, cb: this.handleClick })}
        <circle cx={cx} cy={cy } r={7} fill='white'/>
        <circle cx={cx +5} cy={cy +5} r={3} fill='white'/>
        <circle cx={cx +10} cy={cy +10} r={2} fill='white'/>
        <circle cx={cx} cy={cy} r={15} fill='transparent' stroke='white'/>
        {isModeled ? <circle cx={cx} cy={cy} r={r + this.renderTimer()} fill='transparent' stroke='rgba(249,38,114, 1)'/> : ''}

        <text x={cx + r + 2} y={cy }>

            {resourceName}

        </text>

      </g>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modeledResource: state.uiReducer.modeledResource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModeledResource: (resource) => {
      dispatch(actions.default.setModeledResource(resource))
    }
  }
}

const WiredResourceGraphic = connect(mapStateToProps, mapDispatchToProps)(ResourceGraphic);

export default WiredResourceGraphic;
