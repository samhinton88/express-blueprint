import React, { Component } from 'react';
import style from './style.css';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import Breadcrumb from '../../components/Breadcrumb';
import PropNameTab from '../../components/PropNameTab';
import SignUpForm from '../SignUpForm';
import { lookupProps } from './helpers';
import { connect } from 'react-redux';

class ObjectModeler extends Component {
  state = {
    lookUp: []
  }

  componentWillReceiveProps() {
    this.setState({lookUp: []})
  }

  handleNavClick = (breadcrumbIndex) => {

    this.setState({lookUp: this.state.lookUp.slice(0, breadcrumbIndex)});
  }

  renderResourceModel = () => {
    const { modeledResource } = this.props;

    if (!modeledResource) { return }

    const { resourceName, database, props } = modeledResource;

    console.log(lookupProps(modeledResource, this.state.lookUp))



    const header = (
      <div key='objheader' className='resource-model-header'>
        <h2>{resourceName}</h2>
      </div>
    )

    const propsAtLookup = lookupProps(modeledResource, this.state.lookUp);



    const body = (
      <div key='objbody'>
        {Array.isArray(propsAtLookup) ? propsAtLookup.map((p) => {
          return (
            <PropNameTab
              name={p.propName}
              onClick={() => this.setState({lookUp: [...this.state.lookUp, p.propName]})}
            />
          )
        })
        :
        JSON.stringify(propsAtLookup)
      }
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
      <div className='object-modeler' style={{background: 'transparent'}}>

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
