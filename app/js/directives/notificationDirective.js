userApp.directive('notification', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/templates/notification.html',
        controller: 'NotificationController'
    };
});
