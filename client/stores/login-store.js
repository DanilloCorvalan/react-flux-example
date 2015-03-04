var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var Constants = require('../constants/action-types.js');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  loading: false,
  userDetails: null,
  error: null
};

var LoginStore = assign({}, EventEmitter.prototype, {
  getState: function () {
    return _state;
  },

  isAuthHandled: function () {
    return _isAuthHandled;
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

LoginStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.REQUEST_USER_DETAILS:
      _state.loading = true;
      _state.userDetails = null;
      _state.error = null;

      LoginStore.emitChange();
      break;

    case Constants.REQUEST_USER_DETAILS_SUCCESS:
      _state.loading = false;
      _state.userDetails = action.data;
      _state.error = null;

      LoginStore.emitChange();
      break;

    case Constants.REQUEST_USER_DETAILS_ERROR:
      _state.loading = false;
      _state.userDetails = null;
      _state.error = action.error;

      LoginStore.emitChange();
      break;

    default:
      //no op
  }
});

module.exports = LoginStore;
