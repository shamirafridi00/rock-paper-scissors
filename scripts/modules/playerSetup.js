// scripts/modules/playerSetup.js
import { GameSettings } from './gameState.js';

export function initializePlayerSetup() {
    console.log("Initializing player setup...");
    
    const playerSetupScreen = document.querySelector('[data-screen="player-setup"]');
    if (!playerSetupScreen) {
        console.error("Player setup screen not found!");
        return;
    }
    
    const player2Container = document.getElementById('player2-container');
    const startGameBtn = document.getElementById('start-game-btn');
    
    if (!startGameBtn) {
        console.error("Start game button not found!");
        return;
    }
    
    // Show player setup screen
    playerSetupScreen.classList.add('active');
    
    // If Computer mode, hide player 2 input
    if (GameSettings.gameMode === 'hvc' && player2Container) {
        player2Container.style.display = 'none';
        GameSettings.player2Name = 'Computer';
    }
    
    // Handle start game button
    startGameBtn.addEventListener('click', handleStartGame);
    console.log("Player setup initialized successfully!");
}

function handleStartGame() {
    console.log("Starting game...");
    
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    // Update player names
    if (player1Input && player1Input.value.trim() !== '') {
        GameSettings.player1Name = player1Input.value.trim();
    }
    
    if (GameSettings.gameMode === 'hvh' && player2Input && player2Input.value.trim() !== '') {
        GameSettings.player2Name = player2Input.value.trim();
    }
    
    console.log("Player names set:", GameSettings.player1Name, GameSettings.player2Name);
    
    // Hide setup screen
    const playerSetupScreen = document.querySelector('[data-screen="player-setup"]');
    if (playerSetupScreen) {
        playerSetupScreen.classList.remove('active');
    } else {
        console.error("Could not find player setup screen to hide");
    }
    
    // Start the game
    startGame();
}

function startGame() {
    console.log("Initializing game UI...");
    
    try {
        // Update player name displays
        const player1NameElement = document.getElementById('player1-name');
        const player2NameElement = document.getElementById('player2-name');
        
        if (player1NameElement) {
            player1NameElement.textContent = GameSettings.player1Name;
        } else {
            console.warn("Player 1 name element not found");
        }
        
        if (player2NameElement) {
            player2NameElement.textContent = GameSettings.player2Name;
        } else {
            console.warn("Player 2 name element not found");
        }
        
        // Hide all setup screens
        const setupScreens = document.querySelectorAll('.setup-screen');
        setupScreens.forEach(screen => {
            if (screen) {
                screen.style.display = 'none';
            }
        });
        
        // Show game screen
        const gameScreen = document.querySelector('.game-screen');
        if (gameScreen) {
            gameScreen.style.display = 'flex';
        } else {
            console.error("Game screen element not found!");
            throw new Error("Game screen element not found");
        }
        
        console.log("Game UI initialized, loading game logic...");
        
        // Initialize game logic module
        import('./gameLogic.js')
            .then(module => {
                console.log("Game logic loaded successfully");
                module.initializeGame();
            })
            .catch(err => {
                console.error('Error loading game logic:', err);
                alert("There was an error starting the game. Please refresh the page and try again.");
            });
    } catch (error) {
        console.error("Error starting game:", error);
        
        // Display error message to user
        const container = document.querySelector('.game-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem;">
                    <h2>Something went wrong!</h2>
                    <p>There was an error starting the game: ${error.message}</p>
                    <button onclick="location.reload()">Restart Game</button>
                </div>
            `;
        }
    }
}