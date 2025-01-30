// script.js
class RockPaperScissors {
    constructor() {
        this.gameSettings = {
            gameMode: null,
            seriesType: null,
            timeAttack: false,
            timeLimit: 5000,
            player1Name: '',
            player2Name: ''
        };
        
        this.initializeGame();
    }

    initializeGame() {
        // Add event listeners for mode selection
        const modeButtons = document.querySelectorAll('[data-mode]');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => this.handleModeSelection(button.dataset.mode));
        });
    }

    handleModeSelection(mode) {
        this.gameSettings.gameMode = mode;
        // Hide mode selection and show settings screen
        document.getElementById('setupScreen').classList.add('hidden');
        document.getElementById('settingsScreen').classList.remove('hidden');
        
        // Add event listeners for series selection
        this.initializeSeriesSelection();
    }

    initializeSeriesSelection() {
        const seriesButtons = document.querySelectorAll('[data-series]');
        seriesButtons.forEach(button => {
            button.addEventListener('click', () => this.handleSeriesSelection(button.dataset.series));
        });
    }

    handleSeriesSelection(series) {
        this.gameSettings.seriesType = parseInt(series);
        // Continue with game setup...
        console.log('Game Settings:', this.gameSettings);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new RockPaperScissors();
});
