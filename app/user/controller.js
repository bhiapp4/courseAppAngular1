app.controller('UserController', function (UserService, $scope) {
    $scope.value = 'Hello User';
    $scope.user = {
        userName: '',
        password: '',
        fName: '',
        lName: '',
        mName: '',
        phoneNumber: '',
        dob: ''
    };

    $scope.signup = function () {

    };
});
