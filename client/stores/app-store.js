var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var Constants = require('../constants/action-types.js');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  loading: false,
  loaded: false,
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

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case Constants.REQUEST_FACEBOOK_SDK:
      _state.loading = true;
      _state.loaded = false;
      _state.error = null;

      break;

    case Constants.REQUEST_FACEBOOK_SDK_SUCCESS:
      _state.loaded = true;
      _state.loading = false;
      _state.error = null;

      AppStore.emitChange();
      break;

    case Constants.REQUEST_FACEBOOK_SDK_ERROR:
      _state.loaded = false;
      _state.loading = false;
      _state.error = action.error;

      AppStore.emitChange();
      break;

    default:
      //no op
  }
});

module.exports = AppStore;
