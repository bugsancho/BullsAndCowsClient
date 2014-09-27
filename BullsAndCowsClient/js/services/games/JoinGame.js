/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.factory('joinGame', ['$http', '$q', 'authorization', 'baseServiceUrl', function GamesInfo($http, $q, authorization, baseServiceUrl) {

    var gamesUrl = baseServiceUrl + '/api/games';

    return {

        joinGame: function joinGame(id,number) {
            var deferred = $q.defer();
            var url = gamesUrl + '/' + id;
            var header = authorization.getAuthorizationHeader();
            $http.post(url,number, {headers: header})
                .then(function (data, status, headers, config) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
    }
}]);