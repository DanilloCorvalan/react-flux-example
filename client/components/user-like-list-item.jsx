var React = require('react');
var _ = require('lodash');

var UserLikeListItem = React.createClass({
  render: function() {
    var item = this.props.data || {};

    return (
      <li>
        <h1>{item.name}</h1>
        <img src={item.picture.data.url} />
      </li>
    );
  }

});

module.exports = UserLikeListItem;
