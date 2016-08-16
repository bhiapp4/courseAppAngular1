app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    // Now set up the states
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/user/login.html',
            controller: 'UserController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'src/user/signup.html',
            controller: 'UserController'
        })
        .state('courses', {
            url: '/courses',
            templateUrl: 'src/course/course-list.html',
            controller: 'CourseController'
        })
        .state('courseAdd', {
            url: '/addCourse',
            templateUrl: 'src/course/course-add.html',
            controller: 'CourseController'
        })
        .state('courseEdit', {
            url: '/editCourse/:courseId',
            templateUrl: 'src/course/course-add.html',
            controller: 'CourseController'
        })
        .state('courseTopics', {
            url: '/courseTopics/:courseId',
            templateUrl: 'src/course/course-topics.html',
            controller: 'TopicsController'
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
