var React = require('react');
var LoginActions = require('../actions/login-actions');

var LoginComponent = React.createClass({
  login: function () {
    LoginActions.requestLogin();
  },

  render: function() {
    return (
      <button onClick={this.login}>Login</button>
    );
  }
});

module.exports = LoginComponent;
