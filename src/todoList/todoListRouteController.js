'use strict';

exports.ref = 'TodoListRouteController';
exports.inject = ['$query', '$persistence', 'RestServerRouteController', 'TodoListModel', 'todoListModelFactory'];
exports.bootstrap = function ($query, $persistence, RestServerRouteController, TodoListModel, todoListModelFactory) {

    class TodoListRouteController extends RestServerRouteController {

        constructor () {
            super();
        }

        create (apiCall) {

            var attrs = apiCall.buildObjectUsing({
                requestParams: {
                    required: [
                        'title',
                    ],
                    optional: [
                        'description',
                    ],
                },
            });

            todoListModelFactory
                .createModel(attrs)
                .tap($persistence.persistModel)
                .then(function (todoListModel) {
                    apiCall.respondWith(todoListModel);
                })
                .done();

        }

        getOneById (apiCall) {

            var todoListId = apiCall.getPathParam('todoListId');

            fetchTodoListModelById(todoListId)
                .then(function (todoListModel) {
                    apiCall.respondWith(todoListModel);
                })
                .done();

        }

        search (apiCall) {

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
                .fetchMany(TodoListModel)
                .where({})
                .limit(pagination.limit || 50)
                .skip(pagination.skip || 0)
                .sortBy(pagination.orderBy || 'created')
                .sortOrder(pagination.order || 'descending')
                .exec()
                .then(function (todoListModels) {
                    apiCall.respondWith(todoListModels);
                })
                .done();

        }

    }

    return TodoListRouteController;

    function fetchTodoListModelById (todoListId) {

        return $query
            .fetchOne(TodoListModel)
            .where({
                id: todoListId,
            })
            .includeRelated([
                'todos',
            ])
            .exec();

    }

}