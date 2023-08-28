userApp.controller('UserFormController', function($scope, uuid, dataService, localStorageService) {
    $scope.notificationModal = null;
    $scope.types = [
        {id: 1, name: "Admin"},
        {id: 2, name: "Driver"},
    ]

    const userType = $scope.userData ?
        $scope.types.find((option) => option.name === $scope.userData.type)
        : ''

    $scope.user = {
        username: $scope.userData ? $scope.userData.username : '',
        firstName: $scope.userData ? $scope.userData.firstName : '',
        lastName: $scope.userData ? $scope.userData.lastName : '',
        email: $scope.userData ? $scope.userData.email : '',
        password: $scope.userData ? $scope.userData.password : '',
        passwordRepeat: $scope.userData ? $scope.userData.password : '',
        type: userType
    };

    $scope.errorMessages = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        type: ''
    };

    $scope.createUser = function() {
        validateForm();

        if (Object.values($scope.errorMessages).some(msg => msg !== '')) return

        const user = {
            ...$scope.user,
            username: $scope.user.username.trim(),
            firstName: $scope.user.firstName.trim(),
            lastName: $scope.user.lastName.trim(),
            type: $scope.user.type.name,
            id: uuid.v4()
        }
        const notUnique = isUnique($scope.user.username.trim(), false);
        if (notUnique) {
            $scope.notificationModal = {
                show: true,
                message: 'Error: Username must be unique value!',
                type: 'error'
            }
            $scope.$emit('showNotification');
            return;
        }
        dataService.createUser(user);
        $scope.$emit('closeModal');
        $scope.notificationModal = {
            show: true,
            message: 'Success: User created!',
            type: 'success'
        }
        $scope.$emit('showNotification');
    };

    $scope.editUser = function () {
        const user = {
            ...$scope.user,
            username: $scope.user.username.trim(),
            firstName: $scope.user.firstName.trim(),
            lastName: $scope.user.lastName.trim(),
            id: $scope.userData.id,
            type: $scope.user.type.name,
        }
        validateForm();
        if (Object.values($scope.errorMessages).some(msg => msg !== '')) return
        const notUnique = isUnique($scope.userData.username.trim(), true);
        if (notUnique) {
            $scope.notificationModal = {
                show: true,
                message: 'Error: Username must be unique value!',
                type: 'error'
            }
            $scope.$emit('showNotification');
            return;
        }
        dataService.editUser(user);
        $scope.$emit('closeModal');
        $scope.notificationModal = {
            show: true,
            message: 'Success: User updated!',
            type: 'success'
        }
        $scope.$emit('showNotification');
    }

    $scope.deleteCurrentUser = function () {
        dataService.deleteUser($scope.userData.id);
    }

    $scope.checkPasswordMatch = function() {
        if ($scope.user.password !== $scope.user.passwordRepeat) {
            $scope.errorMessages.passwordRepeat = 'Passwords do not match.';
        } else {
            $scope.errorMessages.passwordRepeat = '';
        }
    };

    $scope.clearError = function(fieldName) {
        $scope.errorMessages[fieldName] = '';
    };

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function isValidPassword(password) {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordPattern.test(password);
    }

    function validateForm() {
        $scope.errorMessages = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordRepeat: '',
            type: ''
        };

        if (!$scope.user.username) {
            $scope.errorMessages.username = 'Username is required.';
        }

        if (!$scope.user.firstName) {
            $scope.errorMessages.firstName = 'First Name is required.';
        }

        if (!$scope.user.lastName) {
            $scope.errorMessages.lastName = 'Last Name is required.';
        }

        if (!$scope.user.type) {
            $scope.errorMessages.type = 'User Type is required.';
        }

        if (!$scope.user.email) {
            $scope.errorMessages.email = 'Email is required.';
        } else if (!isValidEmail($scope.user.email)) {
            $scope.errorMessages.email = 'Invalid email address.';
        }

        if (!$scope.user.password) {
            $scope.errorMessages.password = 'Password is required.';
        } else if (!isValidPassword($scope.user.password)) {
            $scope.errorMessages.password = 'Invalid password. It should be at least 8 characters long and contain at least one number and one letter.';
        }

        if (!$scope.user.passwordRepeat) {
            $scope.errorMessages.passwordRepeat = 'Please confirm your password.';
        } else if ($scope.user.password !== $scope.user.passwordRepeat) {
            $scope.errorMessages.passwordRepeat = 'Passwords do not match.';
        }
    }

    function isUnique(username, isEdit) {
        const users = localStorageService.get('usersData');
        if (isEdit) {
            const filteredUsers = users.filter((user) => user.username !== username);
            return filteredUsers.some((user) => user.username === username);
        }
        return users.some((user) => user.username === username);
    }
});
