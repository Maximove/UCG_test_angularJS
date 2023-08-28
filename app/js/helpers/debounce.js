userApp.factory('debounce', function($timeout) {
    return function(callback, interval) {
        let timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function () {
                callback.apply(this);
            }, interval);
        };
    };
});
