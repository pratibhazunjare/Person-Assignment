var React = require('react')
var {connect} = require('react-redux')
var {reduxForm} = require('redux-form')
var FormField = require('./FormField')
var arrayToTable = require('array-to-table')
var TextInput = require('./TextInput')
var http =require('http')


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

 var post_options = {
    hostname: 'localhost',
    port    : '8080',
    path    : '/person/find/'+searchname,
    method  : 'GET',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': myJSONObject.length,
        'Access-Control-Allow-Origin':'GET,POST'
    }
};

var post_req = http.request(post_options, function (res) {
	//document.MyForm.reset();  
	    document.getElementById("id1").innerHTML = "";  
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
			var para = document.createElement("P");         
        if(res.statusCode==200){ 

        			var j = JSON.parse(chunk); 
       			 for(var i=0; i< j.length; i++)
       			 {console.log(j[i])
						
					var t = document.createTextNode(j[i].id+"           "+j[i].name+"            "+j[i].age);      
					para.appendChild(document.createElement("BR"));					
					para.appendChild(t);                                          
					}
					if(j.length==0){	para.appendChild(document.createTextNode("Not found"));}

					document.getElementById("id1").appendChild(para); 
        			  }
        
    });
     
});
post_req.withCredentials = false;
post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

post_req.end();
  },

  render() {
    var {fields} = this.props
    var {fakeSaving, fakeSubmitted} = this.state
    return <div id="container1">
		 
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

            <button type="submit" name="action" value="Refresh">Search</button>
					<div id="id1"/>
      </form>

    </div>
	
  }
})

module.exports = connect(mapStateToProps)(form(SearchPerson))
