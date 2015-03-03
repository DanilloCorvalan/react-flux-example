var React = require('react');
var AppActions = require('../actions/app-actions');
var AppStore = require('../stores/app-store');

var Main = React.createClass({

  getInitialState: function() {
    return AppStore.getState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.requestFacebookSDK();
  },

  componentWillUnmount: function() {
    AppStore.removeChaneListener(this._onChange);
  },

  _onChange: function () {

    this.setState(AppStore.getState());
  },

  render: function() {
    console.log('the state', this.state);
    
    var component;
    if (this.state.loading) {
      component = <h1>Loading...</h1>;
    } else if (this.state.loaded) {
      component = <h1>Loaded Facebook SDK!</h1>;
    } else {
      component = <span>Rahh!</span>;
    }

    return component;
  }

});

module.exports = Main;
