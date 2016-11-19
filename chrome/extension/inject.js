import { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  handleOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>
          Open
        </button>
        <Dock
          defaultSize={0.4}
          dimMode="transparent"
          isVisible={this.state.isVisible}
          position="right"
        >
          <iframe
            allowTransparency="true"
            frameBorder={0}
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');

  injectDOM.className = 'inject-react-example'; // eslint-disable-line
  injectDOM.style.textAlign = 'center'; // eslint-disable-line
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});
