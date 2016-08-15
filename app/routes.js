app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
        .state('courses', {
            url: '/courses',
            templateUrl: 'course/course-list.html',
            controller: 'CourseController'
        })
        .state('courseAdd', {
            url: '/addCourse',
            templateUrl: 'course/course-add.html',
            controller: 'CourseController'
        })
}]);

app.run(['$rootScope', '$cookies', '$location', function ($rootScope, $cookies, $location) {
    $rootScope.logOut = function () {
        $cookies.remove('loggedInUser');
        $location.path('/login');
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
        var loggedInUser = $cookies.get('loggedInUser');
        $rootScope.showLogout = true;
        if (toState.name === 'login' || toState.name === 'signup') {
            $rootScope.showLogout = false;
        } else {
            if (loggedInUser === undefined) {
                event.preventDefault();
                $rootScope.showLogout = false;
                $location.path('/login');
            }
        }

    });

}]);
