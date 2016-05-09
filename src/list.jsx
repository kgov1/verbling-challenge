var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
	render: function() {
		return <div className="container-list">
			{this.renderList()}
		</div>
	},

	renderList: function() {
		if (this.props.items && Object.keys(this.props.items).length === 0) {
			return <h4>
				Join the conversation. Add a message.
			</h4>
		} else {
			var children = [];

			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = key;

				children.push(
					<ListItem
						openAll={this.props.openAll}
						toggleAll={this.props.toggleAll}
						selectedItems={this.props.selectedItems}
						onSelectMessage={this.props.onSelectMessage}
						item={item}
						key={key} >
					</ListItem>
				)
			}
			
			children.splice(-1, 1);

			return children;
		}
	}
});