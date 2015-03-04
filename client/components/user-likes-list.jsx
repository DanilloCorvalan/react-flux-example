var React = require('react');
var UserLikesActions = require('../actions/user-likes-actions');
var UserLikesStore = require('../stores/user-likes-store');

var LoginComponent = require('./login-component');
var UserLikeListItem = require('./user-like-list-item');

var UserLikesList = React.createClass({
  getInitialState: function() {
    return UserLikesStore.getState();
  },

  componentDidMount: function() {
    UserLikesStore.addChangeListener(this._onChange);
    UserLikesActions.requestUserLikes();
  },

  _onChange: function () {
    this.setState(UserLikesStore.getState());
  },

  render: function() {
    return (
      <section id="user-likes">
        {this.state.loading && <LoginComponent />}
        {!this.state.loading && this.state.list.length &&
          <ul>
            {this.state.list.map(function (item) { return <UserLikeListItem data={item} />; })}
          </ul>
        }
      </section>
    );
  }

});

module.exports = UserLikesList;
