'use strict';

exports.ref = 'todoListModelFactory';
exports.inject = ['AbstractModelFactory', 'TodoListModel'];
exports.bootstrap = function (AbstractModelFactory, TodoListModel) {

    class TodoListModelFactory extends AbstractModelFactory {

        constructor () {
            super();
        }

        createModel (attrs) {
            var todoListModel = new TodoListModel();
            return todoListModel.setAttrs(attrs || {});
        }

    }

    return TodoListModelFactory;

};
