var Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function (action) {
    console.log('server action', action);

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }


    setImmediate(function () {
      this.dispatch({
        source: 'ServerAction',
        action: action
      });
    }.bind(this));
  },

  handleViewAction: function (action) {
    console.log('view action', action);

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    setImmediate(function () {
      this.dispatch({
        source: 'ViewAction',
        action: action
      });
    }.bind(this));
  }
});

module.exports = AppDispatcher;
