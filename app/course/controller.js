app.controller('CourseController', ['CourseService', '$scope', '$cookies', function (CourseService, $scope, $cookies) {
    $scope.courses = null;
    $scope.registeredCourses = null;
    var createNewTopic = function () {
        return {
            name: '',
            duration: ''
        }
    };
    $scope.course = {
        name: '',
        author: '',
        level: '',
        description: '',
        prereqs: '',
        fee: '',
        endGoal: '',
        type: 'Free'
    };
    $scope.topics = [createNewTopic(), createNewTopic()];
    var loggedInUserString = $cookies.get('loggedInUser');
    var loggedInUser;
    if (loggedInUserString != undefined) {
        loggedInUser = JSON.parse(loggedInUserString);
    }
    CourseService.getAllRegisteredCourses(loggedInUser.userId).$promise.then(function (courses) {
        $scope.registeredCourses = courses;
    });

    CourseService.getAllCourses().$promise.then(function (courses) {
        $scope.courses = courses;
    });

    $scope.addNewTopic = function () {
        $scope.topics.push(createNewTopic());
    }

    $scope.removeTopic = function (topic) {
        $scope.topics.pop(topic);
    }

    $scope.saveCourse = function () {

    }


}]);
