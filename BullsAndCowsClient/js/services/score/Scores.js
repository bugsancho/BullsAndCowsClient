/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.factory('scores', ['$http', '$q', 'authorization', 'baseServiceUrl', function GamesInfo($http, $q, authorization, baseServiceUrl) {

    var scoresUrl = baseServiceUrl + '/api/scores';

    return {

        getScores: function getScores() {
            var deferred = $q.defer();
            $http.get(scoresUrl)
                .then(function (data, status, headers, config) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
}]);