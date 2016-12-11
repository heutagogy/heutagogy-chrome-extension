import { PropTypes, Component } from 'react';
import { ONE } from '../constants/Constants'

const inlineStyles = {
  options: {
    display: 'block',
    margin: 10,
  },
};

class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
  }

  constructor() {
    super();
    this.getPlaceholder = this.getPlaceholder.bind(this);
    this.getType = this.getType.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  getPlaceholder() {
    if (this.props.type === 'password') {
      return Array(this.props.placeholder.length + ONE).join('•');
    }

    return this.props.placeholder;
  }

  getType() {
    return this.props.type ? this.props.type : 'text';
  }

  handleOnBlur() {
    const elem = document.getElementById(this.props.id);

    if (elem.value === '') {
       elem.style.border = '1px solid red'; //eslint-disable-line
    }
  }

  handleOnFocus() {
    const elem = document.getElementById(this.props.id);

    elem.style.border = ''; //eslint-disable-line
  }

  render() {
    return (
      <div>
        <label
          htmlFor={this.props.id}
          style={inlineStyles.options}
        >
          {this.props.label}
        </label>
        <input
          id={this.props.id}
          placeholder={this.getPlaceholder()}
          style={inlineStyles.options}
          type={this.getType()}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
        />
      </div>
    );
  }
}

export default TextInput;
