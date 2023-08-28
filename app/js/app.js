const userApp = angular.module('userApp', ["app.routes", "ngRoute", "angular-uuid"])
    .config(function($routeProvider, ROUTES){
        $routeProvider.when(ROUTES.Users,
            {
                templateUrl:'../views/pages/user-list.html',
                controller:'UserListController',
                reloadOnSearch: false
            });
        $routeProvider.when(ROUTES.UsersDetail,
            {
                templateUrl:'views/pages/user-detail.html',
                controller:'UserDetailController'
            });
        $routeProvider.when(ROUTES.NotFound,
            {
                templateUrl:'views/pages/404.html',
                controller:'NotFoundController'
            });
        $routeProvider.otherwise(ROUTES.NotFound);
    });
