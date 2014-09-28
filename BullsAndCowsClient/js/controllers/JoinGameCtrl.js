/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.controller('JoinGameCtrl', ['$scope', '$routeParams', 'notifier', 'joinGame', 'notifications', function GamesCtrl($scope, $routeParams, notifier, joinGame, notifications) {
    var gameId = $routeParams.gameId;
    $scope.gameId = gameId;

    $scope.joinGame = joinGameFunc;
    notifications.subscribe($scope);

    function joinGameFunc(id, number) {
        joinGame.joinGame(id, number)
            .then(function (data) {
                window.location = '#/play/' + data.Id;
                notifier.success('Game joined successfully');
            }, function (error) {
                if (error.status == '401') {
                    notifier.error('You must be logged in to join a game!');
                }
                else {
                    notifier.error(error.data.Message);
                }
            })
    }

}]);
