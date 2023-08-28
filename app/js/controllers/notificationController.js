userApp.controller('NotificationController', function($scope) {
    $scope.notificationData = null;

    if ($scope.notificationModal) {
        $scope.notificationData = $scope.notificationModal;
    }
});
