// scripts/modules/playerSetup.js
import { GameSettings } from './gameState.js';

export function initializePlayerSetup() {
    const playerSetupScreen = document.querySelector('[data-screen="player-setup"]');
    const player2Container = document.getElementById('player2-container');
    const startGameBtn = document.getElementById('start-game-btn');
    
    // Show player setup screen
    playerSetupScreen.classList.add('active');
    
    // If Computer mode, hide player 2 input
    if (GameSettings.gameMode === 'hvc') {
        player2Container.style.display = 'none';
        GameSettings.player2Name = 'Computer';
    }
    
    // Handle start game button
    startGameBtn.addEventListener('click', handleStartGame);
}

function handleStartGame() {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    // Update player names
    if (player1Input.value.trim() !== '') {
        GameSettings.player1Name = player1Input.value.trim();
    }
    
    if (GameSettings.gameMode === 'hvh' && player2Input.value.trim() !== '') {
        GameSettings.player2Name = player2Input.value.trim();
    }
    
    // Hide setup screen
    document.querySelector('[data-screen="player-setup"]').classList.remove('active');
    
    // Start the game
    startGame();
}

function startGame() {
    // Update player name displays
    document.getElementById('player1-name').textContent = GameSettings.player1Name;
    document.getElementById('player2-name').textContent = GameSettings.player2Name;
    
    // Hide all setup screens and show game screen
    const setupScreens = document.querySelectorAll('.setup-screen');
    setupScreens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    document.querySelector('.game-screen').style.display = 'flex';
    
    // Initialize game logic module
    import('./gameLogic.js')
        .then(module => {
            module.initializeGame();
        })
        .catch(err => console.error('Error loading game logic:', err));
}