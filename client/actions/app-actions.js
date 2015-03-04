var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var Constants = require('../constants/action-types.js');

var AppActions = {
  requestFacebookSDK: function () {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '784445024959168',
        xfbml      : false,
        version    : 'v2.2',
        status     : true
      });

      AppDispatcher.handleServerAction({
        type: Constants.REQUEST_FACEBOOK_SDK_SUCCESS
      });
    }.bind(this);

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "http://connect.facebook.net/en_US/sdk/debug.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    AppDispatcher.handleViewAction({
      type: Constants.REQUEST_FACEBOOK_SDK
    });
  }
};

module.exports = AppActions;
