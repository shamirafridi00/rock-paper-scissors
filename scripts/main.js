// Main game module
import { GameSettings, GameState } from './modules/gameState.js';
import { initializeModeSelection } from './modules/gameModes.js';
import { initializeSeriesSelection } from './modules/seriesSelection.js';

// Initialize game setup
function initGame() {
    initializeModeSelection();
    initializeSeriesSelection();
}

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);