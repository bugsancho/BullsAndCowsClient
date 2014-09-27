/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.factory('makeGuess', ['$http', '$q', 'authorization', 'baseServiceUrl', function GamesInfo($http, $q, authorization, baseServiceUrl) {

    var gamesUrl = baseServiceUrl + '/api/games';

    return {

        guess: function guess(gameId,number) {
            var deferred = $q.defer();
            var header = authorization.getAuthorizationHeader();
            var url = gamesUrl + '/' + gameId + '/guess';
            var body = {
                number: number
            };
            $http.post(url, number, {headers: header})
                .then(function (data, status, headers, config) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
}]);