userApp.directive('userForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/templates/user-form.html',
        controller: 'UserFormController',
    };
});
