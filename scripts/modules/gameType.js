import { GameSettings } from './gameState.js';
import { initializePlayerSetup } from '../main.js';

export function initializeGameTypeSelection() {
    const typeButtons = document.querySelectorAll('.type-btn');
    
    if (typeButtons.length === 0) {
        console.error("No type buttons found in the DOM");
        return;
    }
    
    console.log(`Found ${typeButtons.length} type buttons`);
    
    typeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const gameType = e.target.dataset.type;
            handleGameTypeSelection(gameType);
        });
    });
}

function handleGameTypeSelection(gameType) {
    // Update game settings
    GameSettings.timeAttack = (gameType === 'time');
    
    // Log current settings
    console.log('Game Type Selected:', gameType);
    console.log('Time Attack Mode:', GameSettings.timeAttack);
    console.log('Current Settings:', GameSettings);
    
    // Hide the type selection screen
    const typeScreen = document.querySelector('[data-screen="type"]');
    if (typeScreen) {
        typeScreen.classList.remove('active');
    } else {
        console.error("Could not find type screen element to hide");
    }
    
    // Proceed to player setup
    try {
        initializePlayerSetup();
    } catch (error) {
        console.error("Error initializing player setup:", error);
        alert("There was an error setting up the game. Please refresh the page and try again.");
    }
}