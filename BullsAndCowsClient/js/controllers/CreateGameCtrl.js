'use strict';

app.controller('CreateGameCtrl', ['$scope', 'notifier', 'createGame', 'notifications', function GamesCtrl($scope, notifier, createGame,notifications) {

    $scope.createGame = createGameFunc;
    notifications.subscribe($scope);

    function createGameFunc(game) {
        createGame.createGame(game).then(function (data) {
            notifier.success('Game created successfully!');
            window.location = '#/games';
            },
            function (error) {
                if (error.status === '401') {
                    notifier.error('You must be logged in to create a game!');
                }
                else if (error.data.Message) {
                    notifier.error(error.data.Message);
                }
                else {
                    notifier.error('Sorry! Could not create a game! Try again later!');
                }
            })
    }
}]);