'use strict';

app.controller('GamesCtrl', ['$scope', '$interval', 'notifier', 'gamesInfo', 'gameJoinedFilter', 'identity', 'notifications',
    function GamesCtrl($scope, $interval, notifier, gamesInfo, gameJoinedFilter, identity,notifications) {
        $scope.isAuthenticated = identity.isAuthenticated;
        $scope.getCurrentUser = identity.getCurrentUser;

        notifications.subscribe($scope);
        getAvailableGames();
        var refreshGames = $interval(getAvailableGames, 5000);

        $scope.$on('$destroy', function () {
            $interval.cancel(refreshGames);
        });

        function getAvailableGames() {
            gamesInfo.getAvailableGames().then(function (games) {
                    $scope.games = games;
                    $scope.gameJoined = gameJoinedFilter;
                    filterGames(games);
                },
                function (error) {
                    if (error.data.Message) {
                        notifier.error(error.data.Message);
                    }
                    else {
                        notifier.error('Sorry! Could not load games! Please try again later!');
                    }
                });
        }


        function filterGames(games) {
            $scope.availableGames = [];
            $scope.playableGames = [];
            for (var i = 0; i < games.length; i += 1) {
                var currentGameState = games[i].GameState;
                if (currentGameState == "WaitingForOpponent") {
                    if (identity.isAuthenticated() && games[i].Red == identity.getCurrentUser().userName) {
                        $scope.playableGames.push(games[i]);
                    }
                    else {
                        $scope.availableGames.push(games[i]);
                    }
                }
                else if (currentGameState == "RedInTurn") {
                    $scope.playableGames.push(games[i]);
                }
                else if (currentGameState == "BlueInTurn") {
                    $scope.playableGames.push(games[i]);
                }

            }

        }

    }
])
;