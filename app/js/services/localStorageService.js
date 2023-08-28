userApp.factory('localStorageService', function($window) {
    return {
        get: function(key) {
            return JSON.parse($window.localStorage.getItem(key));
        },
        set: function (key, data) {
            return $window.localStorage.setItem(key, JSON.stringify(data));
        }
    }
})
