app.directive('showMessage', [function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/showMessage.html',
        scope: {
            formControl: '=',
            fieldLabel: '@'
        }
    }
}]);
