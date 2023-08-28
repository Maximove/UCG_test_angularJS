userApp.controller('UserListController',
    function UserListController($scope, $window, $location, $routeParams, dataService, debounce, localStorageService) {
        $scope.showModal = false;
        $scope.modalType = '';

        const deletedQueryParam = $routeParams.deleted;

        if (deletedQueryParam) {
            $scope.notificationModal = {
                show: true,
                message: 'Success: User deleted!',
                type: 'success'
            };
        }

        const setUsers = () => {
            return localStorageService.get('usersData');
        }

        const userPromise = dataService.getUserList();
        userPromise.then(function(value) {
            $scope.columns = value.columns;
            const users = setUsers();
            if (users) {
                $scope.users = users;
                return
            }
            localStorageService.set('usersData', value.users);
            $scope.users = setUsers()
        });

        $scope.goToUserDetail = function(id) {
            $location.path(`/user-detail/${id}`);
        }

        $scope.openModal = function (type) {
            $scope.showModal = !$scope.showModal;
            $scope.modalType = type;
        }

        const closeListener = $scope.$on('closeModalEvent', function() {
            $scope.showModal = false;
            $scope.modalType = '';
        });

        const showNotification = $scope.$on('showNotification', function (data) {
            $scope.notificationModal = data.targetScope.notificationModal;
        })

        $scope.$watch('notificationModal', function() {
            $scope.users = localStorageService.get('usersData');
        });

        $scope.$watch('notificationModal', debounce(function() {
            $scope.notificationModal = null;

            if (deletedQueryParam) {
                $location.search('deleted', null);
            }
        }, 2000), true);

        $scope.$on('$destroy', function() {
            closeListener();
            showNotification();
        });
    })
