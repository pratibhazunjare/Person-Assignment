var React = require('react')
var {connect} = require('react-redux')
var {reduxForm} = require('redux-form')
var FormField = require('./FormField')
var TextInput = require('./TextInput')
var Client = require('node-rest-client').Client;

var mapStateToProps = state => state

var form = reduxForm({
  form: 'addPerson',
  fields: [ 'name', 'age'],
  validate(person) {
    var errors = {}
    if (!person.name) errors.name = 'Please enter name.'
    if (!person.age) errors.age = 'Please enter age.'
    return errors
  }
})

var AddPerson = React.createClass({
  getInitialState() {
    return {
      fakeSaving: false,
      fakeSubmitted: null
    }
  },
  componentWillMount() {
    this.props.initializeForm({
      name: '',
      age: ''
     })
  },

  
  handleSubmit(data) {
    this.setState({fakeSaving: true, fakeSubmitted: data})

    //var jsonObject = JSON.stringify({ name: "pr", age: "sample" }, null, 4)
	var json1 = JSON.stringify(this.props.values, null, 2)

		var headers ={}		
		var client = new Client();
		var args = {  data: { json1 },
    					  headers: { "Content-Type": "application/json" }
						};
 		client.post("http://localhost:8080/person/save", args, function (data, response) {
			
   	 var objToJson = { };
			objToJson.response = response;
			   console.log(response);
			});
 			
  },

  render() {
    var {fields} = this.props
    var {fakeSaving, fakeSubmitted} = this.state
    return <div className="container">

      <h1>Save Information</h1>
      <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        
        <div>
          <TextInput
            disabled={fakeSaving}
            field={fields.name}
            id="name"
            label="Name:"
          /><br/>
          <TextInput
            disabled={fakeSaving}
            field={fields.age}
            label="Age:"
            id="age"
          />
        </div>
				<br/><br/>

            <button type="submit">Save</button>
            
            <br/><br/>

        {fakeSubmitted && <pre><code>{JSON.stringify(fakeSubmitted, null, 2)}</code></pre>}
      </form>
      
    </div>
	
  }
  
})

module.exports = connect(mapStateToProps)(form(AddPerson))
