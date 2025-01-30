// Main game module
import { GameSettings, GameState } from './modules/gameState.js';
import { initializeModeSelection } from './modules/gameModes.js';

// Initialize game setup
function initGame() {
    initializeModeSelection();
}

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);