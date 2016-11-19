import { Component } from 'react';

import DevTools from './DevTools.js';
import RootBase from './Root.prod.js';

class Root extends Component {
  render() {
    return (
      <RootBase {...this.props}>
        <DevTools />
      </RootBase>
    );
  }
}

export default Root;
