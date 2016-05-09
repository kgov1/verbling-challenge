var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://kgov1-verbling.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function() {
		return {
			text: this.props.item.text,
			done: false,
			open: false
		}
	},
	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key)
	},
	render: function() {
		var firstWords = [];
		var words = [];
		if (this.state.text.length < 58) {
			var words = this.state.text.match(/(.{1,10})/g);
		} else {
			var words = this.state.text.match(/(.{1,58})/g);
		}

		firstWords.push(words[0]);

		return (
			<div className="container-list-item">
				<div className="input-group">
					<div type="text"
						className={"form-control " + (this.checkSelected(this.props.item.key) ? 'selected-item-container text-center' : '')}
						onClick={this.props.onSelectMessage.bind(null, this.props.item.key)} >
						{this.checkSelected(this.props.item.key) ? words.map(function(word) { return <div>{word}</div> }) : (firstWords + '...')}
					</div>
					<span className={"input-group-addon " + (this.checkSelected(this.props.item.key) ? 'selected-item-addon' : '')} >
						{this.checkSelected(this.props.item.key) ? 'opened' : 'closed'}
					</span>
				</div>
			</div>
		)
	},
	handleDoneChange: function() {
		this.setState({done: !this.state.done})
	},
	checkSelected: function(k) {
		if (this.props.openAll && this.props.toggleAll) {
			return true;
		} else if (!this.props.openAll && !this.props.toggleAll) {
			return false;
		} else if (!this.props.openAll && this.props.toggleAll) {
		    var selected = this.props.selectedItems;
		    for(var i=0; i < selected.length; i++){
		        if( selected[i] === k ){
		            return true;
		        }
		    }
	    }

	    return false;
  	},
})