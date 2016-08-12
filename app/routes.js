app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    // Now set up the states
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'user/login.html',
            controller: 'UserController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'user/signup.html',
            controller: 'UserController'
        })
});
