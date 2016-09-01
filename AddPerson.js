var React = require('react')
var {connect} = require('react-redux')
var {reduxForm} = require('redux-form')
var FormField = require('./FormField')
var TextInput = require('./TextInput')
var http=require('http')

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
		    document.getElementById("id2").innerHTML = "";  
    //var jsonObject = JSON.stringify({ name: "pr", age: "sample" }, null, 4)
	var json1 = JSON.stringify(this.props.values, null, 2)
var post_options = {
    hostname: 'localhost',
    port    : '8080',
    path    : '/person/save',
    method  : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': json1.length,
        'Access-Control-Allow-Origin':'GET,POST'
    }
};

var post_req = http.request(post_options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
        if(res.statusCode==200){
        	document.getElementById("id2").appendChild(document.createTextNode("Saved")); }
        
    });
});
post_req.withCredentials = false;
post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
post_req.write(json1);
post_req.end();
 			
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
			<div id="id2"/>
				
      </form>
      
    </div>
	
  }
  
})

module.exports = connect(mapStateToProps)(form(AddPerson))
