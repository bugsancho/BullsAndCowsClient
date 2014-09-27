/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.controller('ScoresCtrl', ['$scope', 'notifier', 'scores','notifications', function ($scope, notifier, scores,notifications) {
    notifications.subscribe($scope);
    $scope.getScores = getScores;
    getScores();

    function getScores() {
        scores.getScores().then(function (data) {
            $scope.scores = data;
        }, function (error) {
            notifier.error(error.data.Message);
        })
    }


}]);