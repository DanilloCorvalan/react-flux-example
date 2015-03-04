var React = require('react');
var _ = require('lodash');

var UserLikeListItem = React.createClass({
  render: function() {
    var item = this.props.data || {};

    return (
      <li>
        <img src={item.picture.data.url} />
        <span>{item.name}</span>
      </li>
    );
  }

});

module.exports = UserLikeListItem;
