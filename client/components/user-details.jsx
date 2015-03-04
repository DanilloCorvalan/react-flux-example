var React = require('react');

var UserDetails = React.createClass({

  render: function() {
    var user = this.props.user || {};

    return (
      <div className="user-details">
        <span className="user-name">{user.name}</span>
        {' - '}
        <span className="user-location">{user.location && user.location.name}</span>
        {' | '}
        <a href="#" onClick={this.props.onLogout}>Logout</a>
      </div>
    );
  }

});

module.exports = UserDetails;
