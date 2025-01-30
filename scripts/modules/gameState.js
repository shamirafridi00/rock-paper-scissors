// Game state management module
// Add series type to GameSettings
export const GameSettings = {
    gameMode: null,
    seriesType: null,  // Will store 3, 5, or 7
    timeAttack: false,
    player1Name: 'Player 1',
    player2Name: 'Player 2'
};

export const GameState = {
    player1Score: 0,
    player2Score: 0,
    currentRound: 1,
    requiredWins: 2,  // Default to BO3
    gameActive: false
};

// Add series configuration
export const SeriesConfig = {
    3: { requiredWins: 2 },
    5: { requiredWins: 3 },
    7: { requiredWins: 4 }
};