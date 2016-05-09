var React = require('react');
var update = require('react-addons-update');

var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://kgov1-verbling.firebaseio.com/';
var AddComment = require('./add-comment');
var List = require('./list');

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
  	return {
  		items: {},
  		loaded: false,
  		selectedItems: [],
      toggleAll: true,
      openAll: false
  	}
  },
  componentWillMount: function() {
    console.log('items....' + this.state.selectedItems);
  	fb = new Firebase(rootUrl + 'items/');
  	this.bindAsObject(fb, 'items');
  	fb.on('value', this.handleDataLoaded);
  },

  duplicate: function(k) {
    var selected = this.state.selectedItems;

    if (selected.length === 0 || Object.keys(selected).length === 0) {
      console.log('new');
      return true;      
    } else {
      for(i=0; i < selected.length; i++){
        if( selected[i] === k ){
          console.log('duplicate');
          this.setState({ 
            selectedItems: selected.splice(k, i, i+1)
          });
          return false;
        }
      }
    }
    
    console.log('new');
    return true;
  },

  onSelectMessage: function (id) {
    var selected = this.state.selectedItems;

    if (this.duplicate(id)) {
      this.setState({ 
        selectedItems: selected.concat(id),
        openAll: false,
        toggleAll: true
      })
    } 

    onChange();
  },

  render: function() { 
    console.log(this.state.selectedItems);

    return (
        <div className="container-app">
            <div className="row panel panel-default">
              	<div className="col-md-8 col-md-offset-2">
                		<h1 className="text-center">
                			  VERBLING CHALLENGE
                		</h1>
                		<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
              	    		<List 
                          openAll={this.state.openAll}
                          toggleAll={this.state.toggleAll}
                          items={this.state.items} 
                          selectedItems={this.state.selectedItems}
                          onSelectMessage={this.onSelectMessage} />
                		</div>

                    <button 
                    	type="button"
                    	onClick={this.onOpenDidClick}
                    	className="btn btn-default">Show All</button>
                    <button 
                    	type="button"
                    	onClick={this.onCloseDidClick}
                    	className="btn btn-default">Hide All
                    </button>
                    <button 
                    	type="button"
                    	onClick={this.onToggleDidClick}
                    	className="btn btn-default">Toggle All
                    </button>
              	</div>
                <br />
                <div className="col-md-8 col-md-offset-2">
                    <AddComment itemsStore={this.firebaseRefs.items} />
                </div>
            </div>
        </div>
      )
  },

  onOpenDidClick: function() {
      console.log('open all...');
      this.setState({ 
        openAll: true,
        toggleAll: true        
      });

      onChange();
  },
  onCloseDidClick: function() {
      console.log('close all...');
      this.setState({ 
        openAll: false,
        toggleAll: false
      });

      onChange();
  },
  onToggleDidClick: function() {
      console.log('toggle all...');
      this.setState({ 
        openAll: false,
        toggleAll: true
      });

      onChange();
  },

  handleDataLoaded: function() {
  	this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});

var onChange = function () {
	ReactDOM.render(element, document.querySelector('.container'));
};

onChange();