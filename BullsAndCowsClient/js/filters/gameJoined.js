/**
 * Created by alexander on 9/26/2014.
 */
app.filter('gameJoined', function() {
    return function(input) {
        switch (input) {
            case "WaitingForOpponent": return false; break;
            case "RedInTurn":
            case "BlueInTurn":
            case "GameOver": return true; break;
        }
    }
});