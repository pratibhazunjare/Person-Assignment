var React = require('react')
var {PropTypes} = React

var FormField = require('./FormField')

var TextInput = React.createClass({
  propTypes: {
    field: PropTypes.object.isRequired
  },
  shouldComponentUpdate: FormField.shouldFormFieldUpdate,
  render() {
    var {field,  label, onChange, ...inputProps} = this.props
    return <FormField field={field}  inputProps={inputProps} label={label}>
      <input
        {...inputProps}
        className="form-control"
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChange && field.onChange}
      />
    </FormField>
  }
})

module.exports = TextInput
