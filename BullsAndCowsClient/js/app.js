'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/partials/home.html'
            })
            .when('/register', {
                templateUrl: '../views/partials/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/games', {
                templateUrl: '../views/partials/games.html',
                controller: 'GamesCtrl'
            })
            .when('/create', {
                templateUrl: '../views/partials/create-game.html',
                controller: 'CreateGameCtrl'
            })
            .when('/play/:gameId', {
                templateUrl: '../views/partials/play-game.html',
                controller: 'PlayGameCtrl'
            })
            .when('/join/:gameId', {
                templateUrl: '../views/partials/join-game.html',
                controller: 'JoinGameCtrl'
            })
            .when('/scores', {
                templateUrl: '../views/partials/scores.html',
                controller: 'ScoresCtrl'
            })
           .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://bullsandcowswebapi.apphb.com');