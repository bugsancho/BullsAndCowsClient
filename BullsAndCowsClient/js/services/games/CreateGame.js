/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.factory('createGame', ['$http', '$q', 'authorization', 'baseServiceUrl',  function GamesInfo($http, $q, authorization, baseServiceUrl) {

    var gamesUrl = baseServiceUrl + '/api/games';

    return {

        createGame: function createGame(game) {
            var deferred = $q.defer();
            var header = authorization.getAuthorizationHeader();
            var body = {
                number: game.number,
                name: game.name
            };
            $http.post(gamesUrl,body, {headers: header})
                .then(function (data, status, headers, config) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
}]);