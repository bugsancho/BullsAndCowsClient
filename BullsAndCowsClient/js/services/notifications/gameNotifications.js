/**
 * Created by alexander on 9/27/2014.
 */
'use strict';

app.factory('notifications', ['$http', '$q','$resource','authorization', 'identity', 'baseServiceUrl', 'notifier', '$interval', function GamesInfo($http, $q,$resource, authorization, identity, baseServiceUrl, notifier, $interval) {

    var notificationsUrl = baseServiceUrl + '/api/notifications';
    $http.defaults.headers.common = authorization.getAuthorizationHeader();

    var NotificationsResource = $resource(notificationsUrl,{},{
        'public': {  method: 'GET', isArray: true}
    });

    function getNotifications() {
        var deferred = $q.defer();
        var header = authorization.getAuthorizationHeader();
        $http.get(notificationsUrl, {headers: header})
            .then(function (data, status, headers, config) {
                deferred.resolve(data.data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getNextNotification() {
        var deferred = $q.defer();
        var header = authorization.getAuthorizationHeader();
        $http.get(notificationsUrl + '/next')
            .then(function (data, status, headers, config) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getNextNotificationAndShowMessage() {

        getNextNotification().then(function (data) {
            if(data.Type !== 'GameLost'){
                notifier.success(data.data.Message);
            }
            else {
                notifier.error(data.data.Message);
            }
        });
    }
    return {

        getNotifications: NotificationsResource.query,

        getNextNotification: getNextNotification,

        subscribe: function subscribe($scope) {
            if (identity.isAuthenticated()) {
                var refreshNotifications = $interval(getNextNotificationAndShowMessage, 2000);

                $scope.$on('$destroy', function () {
                    $interval.cancel(refreshNotifications);
                });
            }
        }
    }
}]);
