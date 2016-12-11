import { PropTypes, Component } from 'react';

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
    this.getType = this.getType.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
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
          placeholder={this.props.placeholder}
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
