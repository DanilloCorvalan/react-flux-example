var React = require('react');
var AppActions = require('../actions/app-actions');
var LoginActions = require('../actions/login-actions');
var AppStore = require('../stores/app-store');

var Loading = require('./loading');
var LoginComponent = require('./login-component');
var Header = require('./header');
var UserLikesList = require('./user-likes-list');

var Main = React.createClass({

  getInitialState: function() {
    return AppStore.getState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.requestFacebookSDK();
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.isSdkLoaded && !nextState.isSubscribedToLoginChanges) {
      LoginActions.subscribeToLoginChanges();
    }
  },

  _onChange: function () {
    var state = AppStore.getState();
    this.setState(state);
  },

  render: function() {
    return (
      <section id="app-section">
        {this.state.loading && <Loading />}
        {this.state.isSdkLoaded && !this.state.loggedIn &&
          <LoginComponent />
        }
        {this.state.isSdkLoaded && this.state.loggedIn &&
          <div>
            <Header />
            <UserLikesList />
          </div>
        }
      </section>
    );
  }

});

module.exports = Main;
