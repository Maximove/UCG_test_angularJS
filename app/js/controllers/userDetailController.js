userApp.controller('UserDetailController',
    function UserDetailController($scope, $http, $window, $location, debounce, $routeParams, localStorageService, ROUTES) {
        $scope.notificationModal = null;
        $scope.user = null;
        $scope.userData = null;
        const userList = localStorageService.get('usersData');

        if (!userList || !userList.length || !$routeParams.id) {
            $location.path(ROUTES.Users);
            return
        }

        $scope.user = userList.find((user) => user.id === $routeParams.id);

        if (!$scope.user || !$routeParams.id) {
            $location.path(ROUTES.Users);
        }

        $scope.openModal = function (type) {
            $scope.userData = $scope.user;
            $scope.showModal = !$scope.showModal;
            $scope.modalType = type;
        }

        const closeListener = $scope.$on('closeModalEvent', function() {
            $scope.userData = null;
            $scope.showModal = false;
            $scope.modalType = '';
        });

        const showNotification = $scope.$on('showNotification', function (data) {
            $scope.notificationModal = data.targetScope.notificationModal;
        });

        $scope.$watch('notificationModal', function() {
            const newValues = localStorageService.get('usersData');
            $scope.user = newValues.find((user) => user.id === $routeParams.id);
        });

        $scope.$watch('notificationModal', debounce(function() {
            $scope.notificationModal = null;
        }, 2000), true);

        $scope.$on('$destroy', function() {
            closeListener();
            showNotification();
        });
    }
)
