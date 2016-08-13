app.controller('UserController', function (UserService, $scope) {
    $scope.value = 'Hello User';
    $scope.user = {
        userName: '',
        password: '',
        fName: '',
        lName: '',
        mName: '',
        phoneNumber: '',
        dob: null
    };

    $scope.signup = function () {
        UserService.createUser($scope.user).$promise.then(function (savedUser) {
            console.log(savedUser);
            $scope.resetForm();
        }, function (error) {
            console.log(error);
        });;
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
    }
});
