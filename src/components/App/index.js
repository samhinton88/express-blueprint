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
    user: null
  }
  async componentDidMount() {
    const user = await axios.get('http://localhost:5000/api/users/5b1efedc4ac47082a45920cb');
    this.props.setActiveUser(user.data);

    this.props.getBlueprints(user.data._id)
    this.props.setActiveBlueprint(user.data.blueprints[0]._id);

    this.setState({user: user.data})
  }

  render() {
    const { user } = this.props;

    return (
      <div
        className='global-container'

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
