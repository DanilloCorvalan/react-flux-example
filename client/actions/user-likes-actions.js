var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var Constants = require('../constants/action-types.js');

var UserLikesActions = {
  requestUserLikes: function () {
    FB.api('/me/likes', { fields: 'category,name,picture.type(normal)' }, function (response) {
      if (!response.error) {
        AppDispatcher.handleServerAction({
          type: Constants.REQUEST_USER_LIKES_SUCCESS,
          data: response.data
        });

      } else {
        AppDispatcher.handleServerAction({
          type: Constants.REQUEST_USER_LIKES_ERROR,
          error: response.error
        });
      }
    });

    AppDispatcher.handleViewAction({
      type: Constants.REQUEST_USER_LIKES
    });
  }
};

module.exports = UserLikesActions;
