var AppDispatcher = require('../dispatcher/app-dispatcher');
var Constants = require('../constants/action-types');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  loading: false,
  isSdkLoaded: false,
  loggedIn: false,
  isSubscribedToLoginChanges: false,

  error: null
};

var AppStore = assign({}, EventEmitter.prototype, {
  getState: function () {
    return _state;
  },

  emitChange: function (argument) {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.REQUEST_FACEBOOK_SDK:
      _state.loading = true;

      AppStore.emitChange();
      break;

    case Constants.REQUEST_FACEBOOK_SDK_SUCCESS:
      _state.loading = false;
      _state.isSdkLoaded = true;

      AppStore.emitChange();
      break;

    case Constants.AUTH_STATUS_CHANGED:
      _state.loggedIn = action.response.status === 'connected';

      AppStore.emitChange();
      break;

    case Constants.SUBSCRIBE_AUTH_STATUS_CHANGED:
      _state.isSubscribedToLoginChanges = true;

      AppStore.emitChange();
      break;

    default:
      //no op
  }
});

module.exports = AppStore;
