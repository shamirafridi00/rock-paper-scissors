// scripts/modules/gameLogic.js
import { GameSettings, GameState } from './gameState.js';

// Game elements
let player1ChoiceButtons;
let player2ChoiceButtons;
let roundResultElement;
let nextRoundButton;
let finishGameButton;
let player1ScoreElement;
let player2ScoreElement;
let currentRoundElement;
let timerContainer;
let timerBar;
let timerText;
let timerInterval;

let player1Choice = null;
let player2Choice = null;

export function initializeGame() {
    // Get DOM elements
    player1ChoiceButtons = document.querySelectorAll('#player1-choice .choice-btn');
    player2ChoiceButtons = document.querySelectorAll('#player2-choice .choice-btn');
    roundResultElement = document.getElementById('round-result');
    nextRoundButton = document.getElementById('next-round-btn');
    finishGameButton = document.getElementById('finish-game-btn');
    player1ScoreElement = document.getElementById('player1-score');
    player2ScoreElement = document.getElementById('player2-score');
    currentRoundElement = document.getElementById('current-round');
    timerContainer = document.getElementById('timer-container');
    timerBar = document.getElementById('timer-bar');
    timerText = document.getElementById('timer-text');
    
    // Setup game state display
    updateGameStateDisplay();
    
    // Set up event listeners
    setupEventListeners();
    
    // Configure game based on mode
    configureGameMode();
    
    // Start the game
    GameState.gameActive = true;
    
    // Start timer if in time attack mode
    if (GameSettings.timeAttack) {
        timerContainer.style.display = 'block';
        startTimer();
    } else {
        timerContainer.style.display = 'none';
    }
}

function setupEventListeners() {
    // Player 1 choice buttons
    player1ChoiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!GameState.gameActive) return;
            makeChoice('player1', button.dataset.choice);
        });
    });
    
    // Player 2 choice buttons (only in HvH mode)
    if (GameSettings.gameMode === 'hvh') {
        player2ChoiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!GameState.gameActive) return;
                makeChoice('player2', button.dataset.choice);
            });
        });
    } else {
        // Hide player 2 choice buttons in HvC mode
        document.getElementById('player2-choice').querySelector('.choice-icons').style.display = 'none';
    }
    
    // Next round button
    nextRoundButton.addEventListener('click', startNextRound);
    
    // Finish game button
    finishGameButton.addEventListener('click', finishGame);
}

function configureGameMode() {
    if (GameSettings.gameMode === 'hvh') {
        // Human vs Human setup
        document.getElementById('player2-choice').querySelector('h3').textContent = `${GameSettings.player2Name}'s Choice`;
    } else {
        // Human vs Computer setup
        document.getElementById('player2-choice').querySelector('h3').textContent = 'Computer\'s Choice';
    }
}

function makeChoice(player, choice) {
    if (player === 'player1') {
        player1Choice = choice;
        highlightChoice(player1ChoiceButtons, choice);
        
        if (GameSettings.gameMode === 'hvc') {
            // Computer makes a choice automatically
            makeComputerChoice();
        }
    } else {
        player2Choice = choice;
        highlightChoice(player2ChoiceButtons, choice);
    }
    
    // Check if both players have made choices
    if (player1Choice && player2Choice) {
        // Stop timer if it's running
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        // Determine round winner
        determineRoundWinner();
    }
}

function makeComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    player2Choice = randomChoice;
    
    // Show computer's choice
    const computerChoiceElement = document.getElementById('player2-choice');
    const choiceSpan = document.createElement('div');
    choiceSpan.className = 'computer-choice';
    
    // Map choice to emoji
    const choiceEmoji = {
        'rock': '✊',
        'paper': '✋',
        'scissors': '✌️'
    };
    
    choiceSpan.textContent = choiceEmoji[randomChoice];
    
    // Remove any previous choice display
    const prevChoice = computerChoiceElement.querySelector('.computer-choice');
    if (prevChoice) {
        prevChoice.remove();
    }
    
    computerChoiceElement.appendChild(choiceSpan);
}

function highlightChoice(buttons, selectedChoice) {
    // Remove selection from all buttons
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to chosen button
    const selectedButton = Array.from(buttons).find(btn => btn.dataset.choice === selectedChoice);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

function determineRoundWinner() {
    let result;
    let roundWinner;
    
    if (player1Choice === player2Choice) {
        result = "It's a tie!";
        roundWinner = null;
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        result = `${GameSettings.player1Name} wins this round!`;
        roundWinner = 'player1';
        GameState.player1Score++;
    } else {
        result = `${GameSettings.player2Name} wins this round!`;
        roundWinner = 'player2';
        GameState.player2Score++;
    }
    
    // Display result
    roundResultElement.textContent = result;
    
    // Update scores
    updateGameStateDisplay();
    
    // Check if series is over
    if (
        GameState.player1Score >= GameState.requiredWins ||
        GameState.player2Score >= GameState.requiredWins
    ) {
        // Series is over
        nextRoundButton.disabled = true;
        finishGameButton.disabled = false;
    } else {
        // Series continues
        nextRoundButton.disabled = false;
    }
    
    // Temporarily disable choice buttons
    GameState.gameActive = false;
}

function startNextRound() {
    // Reset choices
    player1Choice = null;
    player2Choice = null;
    
    // Clear highlights
    player1ChoiceButtons.forEach(btn => btn.classList.remove('selected'));
    player2ChoiceButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Clear computer choice display if in HvC mode
    if (GameSettings.gameMode === 'hvc') {
        const computerChoiceElement = document.getElementById('player2-choice');
        const prevChoice = computerChoiceElement.querySelector('.computer-choice');
        if (prevChoice) {
            prevChoice.remove();
        }
    }
    
    // Clear result
    roundResultElement.textContent = '';
    
    // Increment round
    GameState.currentRound++;
    updateGameStateDisplay();
    
    // Re-enable game
    GameState.gameActive = true;
    
    // Disable next round button until this round is complete
    nextRoundButton.disabled = true;
    
    // Start timer if in time attack mode
    if (GameSettings.timeAttack) {
        startTimer();
    }
}

function updateGameStateDisplay() {
    player1ScoreElement.textContent = GameState.player1Score;
    player2ScoreElement.textContent = GameState.player2Score;
    currentRoundElement.textContent = GameState.currentRound;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    let timeLeft = 5; // 5 seconds
    timerText.textContent = timeLeft;
    timerBar.style.width = '100%';
    
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerText.textContent = timeLeft;
        timerBar.style.width = `${(timeLeft / 5) * 100}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    // Handle time expiration based on game mode
    if (GameSettings.gameMode === 'hvh') {
        // In HvH mode, whoever hasn't made a choice loses the round
        if (!player1Choice && !player2Choice) {
            // Both players didn't choose - it's a tie
            player1Choice = 'timeout';
            player2Choice = 'timeout';
            roundResultElement.textContent = "Time's up! Both players skipped - it's a tie.";
        } else if (!player1Choice) {
            // Player 1 didn't choose, player 2 wins
            player1Choice = 'timeout';
            roundResultElement.textContent = `Time's up! ${GameSettings.player2Name} wins this round!`;
            GameState.player2Score++;
        } else if (!player2Choice) {
            // Player 2 didn't choose, player 1 wins
            player2Choice = 'timeout';
            roundResultElement.textContent = `Time's up! ${GameSettings.player1Name} wins this round!`;
            GameState.player1Score++;
        }
    } else {
        // In HvC mode, if player hasn't chosen, they lose
        if (!player1Choice) {
            player1Choice = 'timeout';
            makeComputerChoice();
            roundResultElement.textContent = "Time's up! Computer wins this round!";
            GameState.player2Score++;
        }
    }
    
    // Update game state
    updateGameStateDisplay();
    GameState.gameActive = false;
    
    // Enable next round button
    nextRoundButton.disabled = false;
    
    // Check if series is over
    if (
        GameState.player1Score >= GameState.requiredWins ||
        GameState.player2Score >= GameState.requiredWins
    ) {
        // Series is over
        nextRoundButton.disabled = true;
        finishGameButton.disabled = false;
    }
}

function finishGame() {
    // Determine series winner
    let seriesWinner;
    
    if (GameState.player1Score > GameState.player2Score) {
        seriesWinner = GameSettings.player1Name;
    } else {
        seriesWinner = GameSettings.player2Name;
    }
    
    // Update results screen
    document.getElementById('game-winner').textContent = `${seriesWinner} Wins!`;
    document.getElementById('final-score').textContent = 
        `${GameSettings.player1Name} ${GameState.player1Score} - ${GameState.player2Score} ${GameSettings.player2Name}`;
    
    // Save to leaderboard
    updateLeaderboard(seriesWinner);
    
    // Hide game screen and show results screen
    document.querySelector('.game-screen').style.display = 'none';
    document.querySelector('.results-screen').style.display = 'flex';
    
    // Add event listeners for result screen buttons
    document.getElementById('play-again-btn').addEventListener('click', resetGame);
    document.getElementById('view-leaderboard-btn').addEventListener('click', showLeaderboard);
}

function updateLeaderboard(winner) {
    // Get existing leaderboard or create new one
    let leaderboard = JSON.parse(localStorage.getItem('rpsLeaderboard')) || {
        players: [],
        recentGames: []
    };
    
    // Update player stats
    [GameSettings.player1Name, GameSettings.player2Name].forEach(playerName => {
        // Skip computer
        if (playerName === 'Computer') return;
        
        // Check if player exists
        let player = leaderboard.players.find(p => p.name === playerName);
        
        if (!player) {
            // Create new player entry
            player = {
                name: playerName,
                wins: 0,
                totalGames: 0,
                winRate: 0
            };
            leaderboard.players.push(player);
        }
        
        // Update stats
        player.totalGames++;
        if (playerName === winner) {
            player.wins++;
        }
        player.winRate = (player.wins / player.totalGames * 100).toFixed(1);
    });
    
    // Add game to recent games
    leaderboard.recentGames.push({
        winner: winner,
        loser: winner === GameSettings.player1Name ? GameSettings.player2Name : GameSettings.player1Name,
        mode: GameSettings.gameMode,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 games
    if (leaderboard.recentGames.length > 10) {
        leaderboard.recentGames = leaderboard.recentGames.slice(-10);
    }
    
    // Sort players by win rate
    leaderboard.players.sort((a, b) => b.winRate - a.winRate);
    
    // Save to localStorage
    localStorage.setItem('rpsLeaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
    // Hide results screen
    document.querySelector('.results-screen').style.display = 'none';
    
    // Get leaderboard data
    const leaderboard = JSON.parse(localStorage.getItem('rpsLeaderboard')) || {
        players: [],
        recentGames: []
    };
    
    // Build leaderboard HTML
    let leaderboardHtml = `
        <div class="leaderboard-table">
            <h2>Top Players</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Wins</th>
                        <th>Games</th>
                        <th>Win Rate</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add player rows
    if (leaderboard.players.length === 0) {
        leaderboardHtml += `
            <tr>
                <td colspan="5">No games played yet</td>
            </tr>
        `;
    } else {
        leaderboard.players.forEach((player, index) => {
            leaderboardHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.wins}</td>
                    <td>${player.totalGames}</td>
                    <td>${player.winRate}%</td>
                </tr>
            `;
        });
    }
    
    leaderboardHtml += `
                </tbody>
            </table>
        </div>
        
        <div class="recent-games">
            <h2>Recent Games</h2>
            <ul>
    `;
    
    // Add recent games
    if (leaderboard.recentGames.length === 0) {
        leaderboardHtml += `<li>No games played yet</li>`;
    } else {
        leaderboard.recentGames.forEach(game => {
            const date = new Date(game.timestamp).toLocaleDateString();
            leaderboardHtml += `
                <li>${game.winner} defeated ${game.loser} in ${game.mode === 'hvh' ? 'Human vs Human' : 'Human vs Computer'} mode on ${date}</li>
            `;
        });
    }
    
    leaderboardHtml += `
            </ul>
        </div>
    `;
    
    // Update and show leaderboard
    document.getElementById('leaderboard-content').innerHTML = leaderboardHtml;
    document.querySelector('.leaderboard-screen').style.display = 'flex';
    
    // Add back button event listener
    document.getElementById('back-to-menu-btn').addEventListener('click', resetGame);
}

function resetGame() {
    // Reset game state
    GameState.player1Score = 0;
    GameState.player2Score = 0;
    GameState.currentRound = 1;
    GameState.gameActive = false;
    
    // Reset choices
    player1Choice = null;
    player2Choice = null;
    
    // Hide current screens
    document.querySelector('.game-screen').style.display = 'none';
    document.querySelector('.results-screen').style.display = 'none';
    document.querySelector('.leaderboard-screen').style.display = 'none';
    
    // Show mode selection screen
    document.querySelector('[data-screen="mode"]').classList.add('active');
}