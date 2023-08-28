angular.module('app.routes', [])
    .constant('ROUTES', {
        Users: '/',
        UsersDetail: '/user-detail/:id',
        NotFound: '/page-not-found'
    });
