'use strict';

exports.ref = 'TodoListModel';
exports.inject = ['PersistenceRelationalModel'];
exports.bootstrap = function (PersistenceRelationalModel) {

    class TodoListModel extends PersistenceRelationalModel {

        constructor () {
            super();
        }

    }

    return TodoListModel;

};
