var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			text: '',
			warning: ''
		}
	},

	render: function() {
		return <div className="input-group container-header">
			<input 
				value={this.state.text}
				onChange={this.handleInputChange}
				type="text" className="form-control" />
			<span className="input-group-btn">
				<button id="input-add-btn" onClick={this.handleClick}
				className="btn btn-default" type="button">
					ADD
				</button>
			</span>
			<span className="warning-message">{this.state.warning}</span>
		</div>
	},

	handleClick: function(event) {		
		if (this.state.text.length < 10 || this.state.text.length > 160) {
			this.setState({warning: '10-160 Maximum --- Currently: ' + this.state.text.length});
		} else if (this.state.text.length >= 10 && this.state.text.length <= 160) {
			this.setState({warning: ''});
			this.props.itemsStore.push({
				text: this.state.text
			});
		}
    },
    handleInputChange: function(event) {
    	this.setState({text: event.target.value});
    }
});