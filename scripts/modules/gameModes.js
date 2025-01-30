import { GameSettings } from './gameState.js';  // Add this import

export function initializeModeSelection() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedMode = e.target.dataset.mode;
            handleModeSelection(selectedMode);
        });
    });
}

function handleModeSelection(mode) {
    GameSettings.gameMode = mode;
    
    // Hide mode selection and show series selection
    document.querySelector('[data-screen="mode"]').classList.remove('active');
    document.querySelector('[data-screen="series"]').classList.add('active');
}