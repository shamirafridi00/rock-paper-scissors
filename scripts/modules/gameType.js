import { GameSettings } from './gameState.js';

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
    
    // Proceed to next step (temporary console log)
    console.log('Game Type Selected:', GameSettings.timeAttack);
    console.log('Current Settings:', GameSettings);
    
    // Next step: Player setup (to be implemented later)
    // For now, just hide the type selection
    document.querySelector('[data-screen="type"]').classList.remove('active');
}