import React, { Component } from 'react';

import Canvas from '../../containers/Canvas';
import ObjectModeler from '../../containers/ObjectModeler';
import CommandLine from '../../containers/CommandLine';
import LeftNav from '../../containers/LeftNav';
import Footer from '../Footer';

import Style from './style.css';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <div className='canvas-frame'>
          CanvasFrame
        </div>
        <Canvas />
        <ObjectModeler />
        <CommandLine />
        {/*<Footer />*/}
      </div>
    )
  }
}

export default App;
