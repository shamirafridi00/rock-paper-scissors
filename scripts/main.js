// Main game module
import { GameSettings, GameState } from './modules/gameState.js';
import { initializeModeSelection } from './modules/gameModes.js';
import { initializeSeriesSelection } from './modules/seriesSelection.js';
import { initializeGameTypeSelection } from './modules/gameType.js';

// Initialize game setup
function initGame() {
    try {
        console.log("Initializing game...");
        
        // Check if all required elements exist
        checkRequiredElements();
        
        // Initialize game modules
        initializeModeSelection();
        initializeSeriesSelection();
        initializeGameTypeSelection();
        
        // Additional setup for CSS
        setupAdditionalCSS();
        
        console.log("Game initialization complete!");
    } catch (error) {
        console.error("Error during game initialization:", error);
    }
}

function checkRequiredElements() {
    const requiredSelectors = [
        '[data-screen="mode"]',
        '[data-screen="series"]',
        '[data-screen="type"]',
        '.mode-btn',
        '.series-btn',
        '.type-btn'
    ];
    
    const missingElements = [];
    
    requiredSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            missingElements.push(selector);
        }
    });
    
    if (missingElements.length > 0) {
        console.warn("Missing required elements:", missingElements);
    } else {
        console.log("All required elements found!");
    }
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

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// Export function to initialize player setup
export function initializePlayerSetup() {
    try {
        // Dynamically import the player setup module
        import('./modules/playerSetup.js')
            .then(module => {
                module.initializePlayerSetup();
            })
            .catch(err => {
                console.error("Error loading player setup module:", err);
                // Fallback to show an error message
                const gameContainer = document.querySelector('.game-container');
                if (gameContainer) {
                    gameContainer.innerHTML = `
                        <div class="error-message">
                            <h2>Oops! Something went wrong.</h2>
                            <p>There was an error loading the game. Please refresh the page and try again.</p>
                            <button onclick="location.reload()">Refresh</button>
                        </div>
                    `;
                }
            });
    } catch (error) {
        console.error("Error initializing player setup:", error);
    }
}