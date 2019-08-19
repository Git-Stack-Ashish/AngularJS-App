/// <reference path="angular.min.js" />
var app = angular.module('myApp', []);

app.config(function ($provide) {
    $provide.provider('serviceProvider', function () {
        this.$get = function () {
            var factory = {};
            factory.add = function (a, b) {
                return a + b;
            }

            return factory;
        }
    });
});

//Directive with transclusion
app.directive('transcludedText', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'close': '&onClose'
        },
        link: function (scope) {
            scope.name = 'adam';
        },
        templateUrl: 'child.html'
    }
});


app.directive("customDir", function () {
    return {
        restrict: 'E',
        scope: {
            nameNe: '=',
            count: '@'
        },
        //scope:true,
        template: `<div> name is shared : {{nameNe}}</div> <input type='text' ng-model='nameNe'> 
                    <div>count is isolated : {{count}} </div> <input type='text' ng-model='count'>`,
        controller: 'employeesCtrl',
        controllerAs: 'ctrl'

    }

});

//custom filter
app.filter('genderCustomFilter', function () {
    return function (gender, filterParam) {
        switch (gender) {
            case 1:
                return filterParam + ' male';
            case 2:
                return filterParam + ' female';
            default:
                return filterParam + ' unknown'
        }
    };

});

app.controller('employeesCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    var ctrl = $scope;

    //for transclude
    ctrl.nameNew = 'ashish';
    ctrl.isHidden = false;
    ctrl.count = 5;

    ctrl.hideDialog = function (msg) {
        ctrl.message = msg;
        ctrl.isHidden = true;

        $timeout(function () {
            ctrl.message = '';
            ctrl.isHidden = false;
        }, 5000);
    };

    ctrl.employees = [{ name: 'ashish', age: 21, salary: 1000, gender: 1 },
    { name: 'amol', age: 22, salary: 2000, gender: 1 },
    { name: 'nisha', age: 23, salary: 3000, gender: 2 },
    { name: 'shalu', age: 24, salary: 4000, gender: 2 }];

    $scope.search = function (item) {
        if (!ctrl.searchText)
            return true;
        else {
            if (item.name.indexOf(ctrl.searchText) != -1 || item.gender.indexOf(ctrl.searchText) != -1)
                return true;
        }

        return false;
    };
}]);