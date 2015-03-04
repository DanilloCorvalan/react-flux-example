var AppDispatcher = require('../dispatcher/app-dispatcher');
var Constants = require('../constants/action-types');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  loading: false,
  list: [],
  error: null
};

var UserLikesStore = assign({}, EventEmitter.prototype, {
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

UserLikesStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.REQUEST_USER_LIKES:
      _state.loading = true;
      _state.error = null;

      break;

    case Constants.REQUEST_USER_LIKES_SUCCESS:
      _state.loading = false;
      _state.list = action.data;
      _state.error = null;

      break;

    case Constants.REQUEST_USER_LIKES_ERROR:
      _state.loading = false;
      _state.list = [];
      _state.error = action.error;

      break;

    default:
      return;
  }

  UserLikesStore.emitChange();
});

module.exports = UserLikesStore;
