/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.controller('PlayGameCtrl', ['$scope', '$routeParams', '$interval','notifier', 'createGame', 'gamesInfo', 'identity', 'makeGuess', 'notifications',
    function GamesCtrl($scope, $routeParams,$interval, notifier, createGame, gamesInfo, identity, makeGuess,notifications) {
        if (!identity.isAuthenticated()) {
            window.location = '#/home';
        }
        notifications.subscribe($scope);
        $scope.isAuthenticated = identity.isAuthenticated;
        $scope.getCurrentUser = identity.getCurrentUser;
        $scope.guess = guess;
        var gameId = $routeParams.gameId;
        $scope.gameId = gameId;
        getGameDetails(gameId);
        $scope.secretNumberShowButtonText = 'Show';
        $scope.secretNumberIsVisible = false;
        $scope.secretNumberText = '****';
        $scope.toggleSecretNumberButton = toggleSecretNumberButtonFunc;

        var refreshGame = $interval(getGameDetails,2000);
        $scope.$on('$destroy', function () {
            $interval.cancel(refreshGame);
        });

        function toggleSecretNumberButtonFunc() {
            if ($scope.secretNumberText === '****') {
                $scope.secretNumberShowButtonText = 'Hide';
                $scope.secretNumberText = $scope.currentGame.YourNumber;
            }
            else {
                $scope.secretNumberShowButtonText = 'Show';
                $scope.secretNumberText = '****';
            }
        }

        function getGameDetails() {
            gamesInfo.getGameDetails($scope.gameId)
                .then(function (data) {
                    $scope.currentGame = data;
                }, function (error) {
                    if (error.status == '403') {
                        window.location = '#/scores';
                    }
                    else {
                        notifier.error(error.data.Message);
                    }
                });
        }

        function guess(gameId, number) {
            makeGuess.guess(gameId, number).then(function (data) {
                getGameDetails(gameId);
            }, function (error) {
                notifier.error(error.data.Message);
            })
        }


    }]);