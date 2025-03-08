// Game state management module
export const GameSettings = {
    gameMode: null,         // 'hvh' or 'hvc'
    seriesType: null,       // 3, 5, or 7
    timeAttack: false,      // true or false
    timeLimit: 5000,        // milliseconds for time attack
    player1Name: 'Player 1',
    player2Name: 'Player 2'
};

export const GameState = {
    player1Score: 0,
    player2Score: 0,
    currentRound: 1,
    requiredWins: 2,        // Default to BO3
    currentPlayer: 1,       // 1 or 2
    gameActive: false,
    roundActive: false
};

// Add series configuration
export const SeriesConfig = {
    3: { requiredWins: 2 },
    5: { requiredWins: 3 },
    7: { requiredWins: 4 }
};