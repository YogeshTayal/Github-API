'use strict';

/**
 * @ngdoc overview
 * @name assignmentAppApp
 * @description
 * # assignmentAppApp
 *
 * Main module of the application.
 */
angular
    .module('assignmentAppApp', [
        'ngResource',
        'ngRoute',
        'ngSanitize'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    });