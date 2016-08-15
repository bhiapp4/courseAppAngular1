app.controller('UserController', ['UserService', '$scope', '$cookies', '$state', function (UserService, $scope, $cookies, $state) {
    $scope.value = 'Hello User';
    $scope.regex = "((?=.*\\d)(?=.*[a-z])(?=.*[@#$%]).{6,10})";
    $scope.user = {
        userName: '',
        password: '',
        fName: '',
        lName: '',
        mName: '',
        phoneNumber: '',
        dob: null
    };

    $scope.login = {
        userName: '',
        password: ''
    };

    $scope.signup = function () {
        UserService.createUser($scope.user).$promise.then(function (savedUser) {
            console.log(savedUser);
            $scope.resetForm();
            $state.go('login');
        }, function (error) {
            console.log(error);
        });;
    };

    $scope.loginToApp = function () {
        UserService.login($scope.login).$promise.then(function (user) {
            $cookies.put('loggedInUser', JSON.stringify(user));
            $state.go('courses');
        }, function (error) {
            console.log(error);
        });
    };

    $scope.resetForm = function () {
        $scope.user = {
            userName: '',
            password: '',
            fName: '',
            lName: '',
            mName: '',
            phoneNumber: '',
            dob: null
        };
        $scope.signupForm.$setPristine();
        $scope.signupForm.$setUntouched();
    };
}]);
