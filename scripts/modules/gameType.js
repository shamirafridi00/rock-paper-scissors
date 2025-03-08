import { GameSettings } from './gameState.js';
import { goToPlayerSetup } from '../main.js';

export function initializeGameTypeSelection() {
    const typeButtons = document.querySelectorAll('.type-btn');
    
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
    console.log('Game Type Selected:', GameSettings.timeAttack);
    console.log('Current Settings:', GameSettings);
    
    // Hide the type selection
    document.querySelector('[data-screen="type"]').classList.remove('active');
    
    // Proceed to player setup
    goToPlayerSetup();
}