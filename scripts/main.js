// Main game module
import { GameSettings, GameState } from './modules/gameState.js';
import { initializeModeSelection } from './modules/gameModes.js';
import { initializeSeriesSelection } from './modules/seriesSelection.js';
import { initializeGameTypeSelection } from './modules/gameType.js';
import { initializePlayerSetup } from './modules/playerSetup.js';

// Initialize game setup
function initGame() {
    initializeModeSelection();
    initializeSeriesSelection();
    initializeGameTypeSelection();
    
    // Additional setup for CSS
    setupAdditionalCSS();
    
    // Setup result screen buttons
    setupResultButtons();
}

function setupAdditionalCSS() {
    // Add CSS for leaderboard
    const leaderboardStyle = document.createElement('style');
    leaderboardStyle.textContent = `
        .leaderboard-table table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
        }
        
        .leaderboard-table th, .leaderboard-table td {
            padding: 0.8rem;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .leaderboard-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        
        .recent-games ul {
            list-style-type: none;
            padding: 0;
        }
        
        .recent-games li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .computer-choice {
            font-size: 3rem;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(leaderboardStyle);
}

function setupResultButtons() {
    // These buttons will be properly initialized when needed, 
    // but we'll set up their event listeners here for future use
    const playAgainBtn = document.getElementById('play-again-btn');
    const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            // Reset game state and return to first screen
            location.reload();
        });
    }
    
    if (viewLeaderboardBtn) {
        viewLeaderboardBtn.addEventListener('click', () => {
            document.querySelector('.results-screen').style.display = 'none';
            document.querySelector('.leaderboard-screen').style.display = 'flex';
        });
    }
    
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', () => {
            location.reload();
        });
    }
}

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// Export a function to move to player setup
export function goToPlayerSetup() {
    initializePlayerSetup();
}