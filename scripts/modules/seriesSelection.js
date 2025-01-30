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
    document.querySelector('[data-screen="series"]').classList.remove('active');
    document.querySelector('[data-screen="type"]').classList.add('active');
    
    // For now, just log the progress
    console.log('Game Settings:', GameSettings);
    console.log('Game State:', GameState);
    
    // Next step (to be implemented in next phase)
    // This will be either game type selection or player setup
}