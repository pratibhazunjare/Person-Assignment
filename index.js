var React = require('react')
var {Provider} = require('react-redux')
var AddPerson = require('./AddPerson')
var SearchPerson = require('./searchPerson')
var configureStore = require('./configureStore')
 var { Router, Route,hashHistory, IndexRoute, Link } =require( 'react-router')
var render =require('react-dom')

var store = configureStore()

 var App = React.createClass({
	 shouldComponentUpdate: function(nextProps, nextState) {
  return true;
},

 	getInitialState() {
    return {
      save: false,
     search1: false
    }},
    switch :function (word) {
		console.log(this.state)		
		var save ,search1;
		if (word=="save") { save=true;search1=false}
		else {save=false;search1=true}
		this.shouldComponentUpdate;
		return this.setState({search1:search1,save:save})
			
    },
   render: function() {
   			var self=this
   			var {save, search1} = this.state
   	
			 return (
			<div>
			<h1>Person Information</h1><br/><br/>
          		<div id="buttons">
            		<button id="SavePerson" onClick={self.switch.bind(null,"save")}>Save</button><br/><br/>
            		<button id="SearchPerson" onClick={self.switch.bind(null,"search") }>Search</button>
			 </div>
            
				{this.state.save?<AddPerson/> : null}
				{this.state.search1?<SearchPerson/>:null}
	                 </div>
			)
		     }
    });


React.render(<Provider store={store}>{() => <App/>}</Provider>, document.querySelector('#app'))


