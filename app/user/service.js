app.service('UserService', function ($resource) {
    var userApi = $resource('http://localhost:8080/user', {}, {
        create: {
            method: 'POST'
        }
    });

    this.createUser = function (user) {
        return userApi.create(user);
    }
});
