userApp.factory('dataService', function($http, $window, $location, $q, localStorageService, ROUTES){
    return {
        getUserList: function() {
            const deferred = $q.defer();
            $http({method: 'GET', url: 'statics/users.json'}).
            then (function success(response) {
                    deferred.resolve(response.data);
                }, function error(response) {
                    deferred.reject(response.status);
                }
            );

            return deferred.promise;
        },

        createUser: function (data) {
            const userList = localStorageService.get('usersData');
            if(!userList || !data) return;
            userList.push(data);
            localStorageService.set('usersData', userList);
        },

        editUser: function (data) {
            const userList = localStorageService.get('usersData');
            if(!userList || !data) return;
            const existedUserIndex = userList.findIndex((user) => user.id === data.id)
            if (existedUserIndex === -1) return;
            userList[existedUserIndex] = data;
            localStorageService.set('usersData', userList);
        },

        deleteUser: function (id) {
            const userList = localStorageService.get('usersData');
            const updatedList = userList.filter((user) => user.id !== id)
            localStorageService.set('usersData', updatedList);
            $location.path(ROUTES.Users);
            $location.search('deleted', 'true');
        }
    }
})
