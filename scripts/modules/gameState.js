// Game state management module
export const GameSettings = {
    gameMode: null,
    seriesType: null,
    timeAttack: false,
    player1Name: 'Player 1',
    player2Name: 'Player 2'
};

export const GameState = {
    player1Score: 0,
    player2Score: 0,
    currentRound: 1,
    requiredWins: 2,
    gameActive: false
};