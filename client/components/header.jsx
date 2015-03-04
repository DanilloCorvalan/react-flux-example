var React = require('react');
var LoginActions = require('../actions/login-actions');
var LoginStore = require('../stores/login-store');
var AppStore = require('../stores/app-store');

var Loading = require('./loading');
var UserDetails = require('./user-details');

var Header = React.createClass({
  getInitialState: function () {
    return LoginStore.getState();
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
    LoginActions.requestUserDetails();
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    var state = LoginStore.getState();
    this.setState(state);
  },

  handleLogout: function () {
    LoginActions.requestLogout();
  },

  render: function() {
    return (
      <section id="header">
        <h1>My Awesome Application</h1>

        {this.state.loading &&
          <Loading />}

        {!this.state.loading &&
          <UserDetails user={this.state.userDetails} onLogout={this.handleLogout} />}
      </section>
    );
  }

});

module.exports = Header;
