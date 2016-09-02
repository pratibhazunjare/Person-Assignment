var classNames = require('classnames')
var Col = require('react-bootstrap/lib/Col')
var React = require('react')
var Row = require('react-bootstrap/lib/Row')
var {PropTypes} = React

function shouldFormFieldUpdate(nextProps) {
  var keys = Object.keys(this.props)
  var nextKeys = Object.keys(nextProps)
  if (keys.length !== nextKeys.length) return true
  var nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    
  }
  return false
}


var FormField = React.createClass({
  statics: {
    shouldFormFieldUpdate
  },
  propTypes: {
    field: PropTypes.object,
    inputClass: PropTypes.string,
    inputProps: PropTypes.object,
    label: PropTypes.string,
  },
  getDefaultProps() {
    return {
      field: {},
      inputProps: {}
    }
  },
  render() {
    var {field,  inputClass, inputProps, label} = this.props
    var error = field.touched && field.error
    return <Col sm={6}>
      <Row className={classNames('form-group', {'has-error': error})}>
        <Col sm={4} className="control-label">
         <label htmlFor={inputProps.id}>{label}</label>

        </Col>
        <Col sm={8} className={inputClass}>
          {this.props.children}
          {error && <p className="help-block" style={{marginBottom: 0}}>{error}</p>}
        </Col>
      </Row>
    </Col>
  }
})

module.exports = FormField
