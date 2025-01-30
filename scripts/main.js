// Main game module
import { GameSettings, GameState } from './modules/gameState.js';
import { initializeModeSelection } from './modules/gameModes.js';
import { initializeSeriesSelection } from './modules/seriesSelection.js';
import { initializeGameTypeSelection } from './modules/gameType.js';

// Initialize game setup
function initGame() {
    initializeModeSelection();
    initializeSeriesSelection();
    initializeGameTypeSelection();
}

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);