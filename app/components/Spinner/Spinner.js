import { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './Spinner.less';

class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
  }

  render() {
    return (
      <div
        className={`${styles.spinner} ${this.props.className}`}
      >
        <CircularProgress
          size={this.props.size}
        />
      </div>
    );
  }
}

export default Spinner;
