import { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    floatingLabelText={label}
    hintText={label}
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};
