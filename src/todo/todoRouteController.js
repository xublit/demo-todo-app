'use strict';

exports.ref = 'TodoRouteController';
exports.inject = ['$query', '$persistence', 'RestServerRouteController', 'TodoModel', 'todoModelFactory'];
exports.bootstrap = function ($query, $persistence, RestServerRouteController, TodoModel, todoModelFactory) {

    class TodoRouteController extends RestServerRouteController {

        constructor () {
            super();
        }

        create (apiCall) {

            var attrs = apiCall.buildObjectUsing({
                requestParams: {
                    required: [
                        'list',
                        'summary',
                    ],
                },
            });

            todoModelFactory
                .createModel(attrs)
                .tap($persistence.persistModel)
                .then(function (todoModel) {
                    apiCall.respondWith(todoModel);
                })
                .done();

        }

        getOneById (apiCall) {

            var todoId = apiCall.getPathParam('todoId');

            fetchTodoModelById(todoId)
                .then(function (todoModel) {
                    apiCall.respondWith(todoModel);
                })
                .done();

        }

        search (apiCall) {

            var criteria = apiCall.buildObjectFrom({
                requestParams: {
                    optional: [
                        'list',
                    ],
                },
            });

            var pagination = apiCall.buildObjectFrom({
                requestParams: {
                    optional: [
                        'limit',
                        'skip',
                        'orderBy',
                        'order',
                        'filter',
                    ],
                },
            });

            $query
                .fetchMany(TodoModel)
                .where(criteria)
                .limit(pagination.limit || 50)
                .skip(pagination.skip || 0)
                .sortBy(pagination.orderBy || 'created')
                .sortOrder(pagination.order || 'descending')
                .exec()
                .then(function (todoModels) {
                    apiCall.respondWith(todoModels);
                })
                .done();

        }

    }

    return TodoRouteController;

    function fetchTodoModelById (todoId) {

        return $query
            .fetchOne(TodoModel)
            .where({
                id: todoId,
            })
            .exec();

    }

}