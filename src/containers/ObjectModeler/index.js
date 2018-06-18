import React, { Component } from 'react';
import style from './style.css';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import Breadcrumb from '../../components/Breadcrumb';
import SignUpForm from '../SignUpForm';
import { connect } from 'react-redux';

class ObjectModeler extends Component {
  state = {
    lookUp: []
  }

  handleNavClick = (e) => {
    console.log(e);
  }

  renderResourceModel = () => {
    const { modeledResource } = this.props;
    if (!modeledResource) { return }
    console.log(modeledResource.props)
    const { resourceName, database, props } = modeledResource;
    const header = (
      <div key='objheader' className='resource-model-header'>
        <h2>{resourceName}</h2>
      </div>
    )


    const body = (
      <div key='objbody'>
        {props.map((p) => {
          <div onClick={null} key={p._id}>{p.propName} {p.type}</div>
        })}
      </div>
    )



    return (
      <div>
        {header}
        {body}
      </div>
    )
  }

  render() {
    const { modeledResource } = this.props;





    return (
      <div className='object-modeler'>

        <div className='object-modeler-container'>
          <BreadcrumbNav
            resourceName={modeledResource ? modeledResource.resourceName : ''}
            lookUp={this.state.lookUp}
            onBreadcrumbClick={this.handleNavClick}/>
          {this.renderResourceModel()}


        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    modeledResource: state.uiReducer.modeledResource
  }
}

const WiredObjectModeler = connect(mapStateToProps)(ObjectModeler)

export default WiredObjectModeler;
