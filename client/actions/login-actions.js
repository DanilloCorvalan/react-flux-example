var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var Constants = require('../constants/action-types.js');

var LoginActions = {
  subscribeToLoginChanges: function () {
    FB.Event.subscribe('auth.statusChange', function (response) {
      AppDispatcher.handleServerAction({
        type: Constants.AUTH_STATUS_CHANGED,
        response: response
      });
    });

    AppDispatcher.handleViewAction({
      type: Constants.SUBSCRIBE_AUTH_STATUS_CHANGED
    });
  },

  requestUserDetails: function () {
    FB.api('/me', function (response) {
      if (!response.error) {
        AppDispatcher.handleServerAction({
          type: Constants.REQUEST_USER_DETAILS_SUCCESS,
          data: response
        });

      } else {
        AppDispatcher.handleServerAction({
          type: Constants.REQUEST_USER_DETAILS_ERROR,
          error: response.error
        });
      }
    });

    AppDispatcher.handleViewAction({
      type: Constants.REQUEST_USER_DETAILS
    });
  },

  requestLogin: function () {
    FB.login(null, { scope: 'user_location,user_likes' });
  },

  requestLogout: function () {
    FB.logout();
  },
};

module.exports = LoginActions;
