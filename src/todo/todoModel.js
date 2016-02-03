'use strict';

exports.ref = 'TodoModel';
exports.inject = ['PersistenceRelationalModel'];
exports.bootstrap = function (PersistenceRelationalModel) {

    class TodoModel extends PersistenceRelationalModel {

        constructor () {
            super();
        }

    }

    return TodoModel;

};
