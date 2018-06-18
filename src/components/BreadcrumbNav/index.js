import React, { Component } from 'react';
import style from './style.css';

import Breadcrumb from '../Breadcrumb';

class BreadcrumbNav extends Component {

  renderBreadcrumbs = () => {
    const { lookUp, onBreadcrumbClick } = this.props;

    return lookUp.map((lu) => {
      return <Breadcrumb onClick={onBreadcrumbClick} lookupName={lu}/>
    })
  }

  render() {


    return (
      <div className='breadcrumb-nav'>
        {this.props.resourceName}

        {this.renderBreadcrumbs()}

      </div>
    )
  }
}

export default BreadcrumbNav;
