import React, { Component } from 'react';
import FrameTab from '../../components/FrameTab';
import style from './style.css';
import { connect } from 'react-redux';
import  * as actions  from '../../actions/action_creators';


class TabNav extends Component {

  renderTabs = () => {
    const { blueprints, handleSelect, activeBlueprint } = this.props;
    console.log('props in rendertabs', this.props)

    const theme = {};
    theme.frameTab = {};
    theme.frameTab.active = { background: 'rgba(254, 254, 254, 1)'};
    theme.frameTab.inactive = { background: 'darkgrey', color: 'grey'}

    if(!blueprints || !activeBlueprint) { return }
    return blueprints.map((b) => {
      const { _id, blueprintName } = b;

      if (_id === activeBlueprint) {
        return (
          <FrameTab
            key={_id}
            blueprintName={blueprintName}
            onClick={() => handleSelect(_id)}
            theme={theme}
            isActive
            resourceCount={b.resources ? b.resources.length : 0}
          />
        )

      } else {
        return (
          <FrameTab
            key={_id}
            blueprintName={blueprintName}
            onClick={() => handleSelect(_id)}
            theme={theme}
            resourceCount={b.resources ? b.resources.length : 0}
          />
        )
      }

    })


  }

  render() {

    return (
      <div className='tab-nav'>
        {this.renderTabs()}
        <button onClick={(e) => {
          e.preventDefault()
          this.props.handleNewBlueprint(this.props.user._id)
        }}>new</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('redux state in tab nav', state)
  return {
    blueprints: state.blueprintReducer.blueprints,
    activeBlueprint: state.uiReducer.activeBlueprint,
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelect: (blueprintId) => {
      dispatch(actions.default.setActiveBlueprint(blueprintId))
    },
    handleNewBlueprint: (userId) => {
      dispatch(actions.default.addBlueprint(userId))
    }
  }
}

const WiredTabNav = connect(mapStateToProps, mapDispatchToProps)(TabNav)

export default WiredTabNav;
