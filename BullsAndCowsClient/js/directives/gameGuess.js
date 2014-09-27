/**
 * Created by alexander on 9/27/2014.
 */
app.directive('gameGuess', function () {
    return {
        scope: {
            guessInfo: '=guess'
        },
        templateUrl : 'views/directives/game-guess.html'
    };
});