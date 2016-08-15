app.service('CourseService', function ($resource) {
    var courseApi = $resource('http://localhost:8080/course', {}, {
        getAll: {
            method: 'GET',
            isArray: true
        },
        getAllForUser: {
            method: 'GET',
            isArray: true,
            params: {
                userId: '@userId'
            },
            url: 'http://localhost:8080/course/user/:userId'

        }
    });

    this.getAllCourses = function () {
        return courseApi.getAll();
    };

    this.getAllRegisteredCourses = function (userIdPassed) {
        console.log(userIdPassed);
        return courseApi.getAllForUser({
            userId: userIdPassed
        });
    };

});
