var React = require('react')
var {connect} = require('react-redux')
var {reduxForm} = require('redux-form')
var FormField = require('./FormField')

var TextInput = require('./TextInput')

var Client = require('node-rest-client').Client;

var mapStateToProps = state => state

var form = reduxForm({
  form: 'searchPerson',
  fields: [ 'name'],
  validate(person) {
    var errors = {}
    if (isNaN(Number(person.age))) errors.age = 'Please enter number age.'
    return errors
  }
})

var SearchPerson = React.createClass({
  getInitialState() {
    return {
      fakeSaving: false,
      fakeSubmitted: null
    }
  },
   
  componentWillMount() {
    this.props.initializeForm({
      name: '',
       })
  },

  
  handleSubmit(data) {
    this.setState({fakeSaving: true, fakeSubmitted: data})
   	var myJSONObject = JSON.stringify(this.props.values, null, 2)

	  var searchname= this.props.values.name

		var client = new Client();
		var args = {
    					data: { myJONObject },
    					headers: { "Content-Type": "application/json" }
					  };

		client.post("http://localhost:8080/person/search/"+searchname, args, function (data, response) {
    			 console.log(data);
    			console.log(response);
						});
 			
  },

	
  render() {
    var {fields} = this.props
    var {fakeSaving, fakeSubmitted} = this.state
    return <div className="container1">
		 
      <h1>Search Person </h1>
      <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
    		<div>
           <TextInput
            disabled={fakeSaving}
            field={fields.name}
            label="Name:"
            id="name"
          />
        </div>
				<br/><br/>

            <button type="submit">Search</button>

        {fakeSubmitted && <pre><code>{JSON.stringify(fakeSubmitted, null, 2)}</code></pre>}
      </form>
    </div>

  }
})

module.exports = connect(mapStateToProps)(form(SearchPerson))
