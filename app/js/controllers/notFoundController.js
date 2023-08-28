userApp.controller('NotFoundController', function($scope, $location, ROUTES) {
    $scope.goToMain = function () {
        $location.path(ROUTES.Users);
    }
});
