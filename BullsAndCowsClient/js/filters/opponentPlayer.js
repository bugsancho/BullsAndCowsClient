/**
 * Created by alexander on 9/27/2014.
 */
app.filter('opponentPlayer',['identity', function (identity) {
    return function (game) {
        var user;
        if(identity.isAuthenticated()) {
            user = identity.getCurrentUser().userName;
        }
        if (!game){
            return;
        }
        return  (game.Red == user) ? game.Blue : game.Red;
    }
}]);
