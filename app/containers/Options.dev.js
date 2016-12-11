import { Component } from 'react';

import DevTools from './DevTools.js';
import OptionBase from './Options.prod.js';

class Options extends Component {
  render() {
    return (
      <OptionBase {...this.props}>
        <DevTools />
      </OptionBase>
    );
  }
}

export default Options;
