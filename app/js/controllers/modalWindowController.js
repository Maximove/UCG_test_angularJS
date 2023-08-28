userApp.controller('ModalWindowController', function($scope) {
    $scope.closeModal = function() {
        $scope.$emit('closeModalEvent');
    }

    const closeListener = $scope.$on('closeModal', function() {
        $scope.closeModal()
    });

    $scope.$on('$destroy', closeListener);

    if (!$scope.user) return

    $scope.fullName = `${$scope.user.firstName} ${$scope.user.lastName}`
});
