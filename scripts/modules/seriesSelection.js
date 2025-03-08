import { GameSettings, GameState, SeriesConfig } from './gameState.js';

export function initializeSeriesSelection() {
    const seriesButtons = document.querySelectorAll('.series-btn');
    
    seriesButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedSeries = parseInt(e.target.dataset.series);
            handleSeriesSelection(selectedSeries);
        });
    });
}

function handleSeriesSelection(seriesLength) {
    // Update game settings and state
    GameSettings.seriesType = seriesLength;
    GameState.requiredWins = SeriesConfig[seriesLength].requiredWins;
    
    // Proceed to next setup step
    navigateToNextSetupStep();
}

function navigateToNextSetupStep() {
    // Hide series selection
    const seriesScreen = document.querySelector('[data-screen="series"]');
    const typeScreen = document.querySelector('[data-screen="type"]');
    
    // Add safety check to prevent errors
    if (seriesScreen) {
        seriesScreen.classList.remove('active');
    } else {
        console.error("Could not find series screen element");
    }
    
    if (typeScreen) {
        typeScreen.classList.add('active');
    } else {
        console.error("Could not find type screen element");
        
        // Fallback: Check if the player setup screen exists and show that instead
        const playerSetupScreen = document.querySelector('[data-screen="player-setup"]');
        if (playerSetupScreen) {
            console.log("Falling back to player setup screen");
            playerSetupScreen.classList.add('active');
        } else {
            console.error("Could not find player setup screen either");
        }
    }
    
    // Log the progress
    console.log('Game Settings:', GameSettings);
    console.log('Game State:', GameState);
}