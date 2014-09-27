/**
 * Created by alexander on 9/27/2014.
 */
app.filter('gameStateMessage', ['identity', function (identity) {
    return function (game) {
        var user,
            redLoggedIn;
        if (!game){
            return;
        }
        if (identity.isAuthenticated()) {
            user = identity.getCurrentUser().userName;
            redLoggedIn = game.Red == user;
        }
        switch (game.GameState) {
            case "WaitingForOpponent":
                return "Waiting for opponent";
                break;
            case "RedInTurn":
                if (redLoggedIn) {
                    game.inTurn = true;
                    return 'Your turn';
                }
                else {
                    return 'Opponent turn';
                }
                break;
            case "BlueInTurn":
                if (redLoggedIn) {
                    return 'Opponent turn';
                }
                else {
                    game.inTurn = true;
                    return 'Your turn';
                }
                break;
            case "GameOver":
                return 'Game over';
                break;
        }
    }
}]);