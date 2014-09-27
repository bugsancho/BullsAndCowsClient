/**
 * Created by alexander on 9/26/2014.
 */
'use strict';

app.factory('gamesInfo', ['$http', '$q', 'authorization', 'baseServiceUrl', 'notifier', function GamesInfo($http, $q, authorization, baseServiceUrl, notifier) {

    var gamesUrl = baseServiceUrl + '/api/games';

    return {
        getAvailableGames: function getAvailableGames() {
            var deferred = $q.defer();
            var header = authorization.getAuthorizationHeader();
            $http.get(gamesUrl, {headers: header}).then(function (data, status, headers, config) {
                deferred.resolve(data.data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },


        getGameDetails : function getGameDetails(id) {
            var deferred = $q.defer();
            var header = authorization.getAuthorizationHeader();
            $http.get(gamesUrl + '/' + id, {headers: header}).then(function (data, status, headers, config) {
                deferred.resolve(data.data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}]);