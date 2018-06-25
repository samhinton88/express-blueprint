import React, { Component } from 'react';
import Canvas               from '../../containers/Canvas';
import TabNav               from '../../containers/TabNav';
import FrameTab             from '../FrameTab';
import ObjectModeler        from '../../containers/ObjectModeler';
import CommandLine          from '../../containers/CommandLine';
import Footer               from '../Footer';
import SignUpForm           from '../../containers/SignUpForm';
import Signup               from '../../containers/Signup'
import LeftNav              from '../../containers/LeftNav'
import * as actions         from '../../actions/action_creators';
import { connect }          from 'react-redux';
import axios                from 'axios';

import style                from './style.css';

class App extends Component {
  state = {
    user: null,
    timer: 0
  }
  async componentDidMount() {
    const user = await axios.get('http://localhost:5000/api/users/5b1efedc4ac47082a45920cb');
    this.props.setActiveUser(user.data);

    this.props.getBlueprints(user.data._id)
    this.props.setActiveBlueprint(user.data.blueprints[0]._id);

    this.setState({user: user.data})

    this.timer = setInterval(() => this.setState({timer: this.state.timer + 0.1}), 90)
  }

  renderStyle = () => {
    const { timer } = this.state;
    return {backgroundImage: `linear-gradient(${timer * 2}deg, rgba(200, 10, 10, 0.6), rgba(50, 50, 200, 0.4), white)`}
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div
          style={
            {
              background: 'rgba(250, 250, 250, 1) linear-gradient(rgba(220, 220, 220, 0.7) 1%, rgba(100, 100, 100, 0.2), rgba(200, 200, 200, 0.7) 98%)',
              zIndex: '90',
              position: 'fixed',
              top: '0',
              width:'100%',
              height: '60px',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(10, 10, 10, 0.4)'
        }}></div>
        <div
          className='global-container'
          style={false ? this.renderStyle() : null}
        >
          <LeftNav />
          <div className='editor-container'>
            <div className='app'>
              <TabNav />
              <Canvas />
              {false ? <Signup handleSignup={this.props.handleSignup}/>:<ObjectModeler />}
              <CommandLine />
              {/*<Footer />*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    setActiveBlueprint: (blueprint) => {
      dispatch(actions.default.setActiveBlueprint(blueprint))
    },
    handleSignup: (data) => {
      dispatch(actions.default.signupUser(data))
    },
    setActiveUser: (user) => {
      dispatch(actions.default.setUser(user))
    },
    getBlueprints: (userId) => {
      dispatch(actions.default.getBlueprints(userId))
    }

  }
}

const WiredApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default WiredApp;
