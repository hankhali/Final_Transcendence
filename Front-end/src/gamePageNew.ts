// Game Page Component - Handles the actual game interface
import { PongGame, create1v1Game, createAIGame, Player } from './pongGame.js';

export class GamePage {
  private container: HTMLElement;
  private game: PongGame | null = null;
  private gameCanvas: HTMLCanvasElement | null = null;
  private gameMode: '1v1' | 'ai' | 'tournament' = '1v1';
  private isFullscreen = false;
  private onNavigateBack?: () => void;

  constructor(container: HTMLElement, onNavigateBack?: () => void) {
    this.container = container;
    this.onNavigateBack = onNavigateBack;
  }

  public render1v1Game(): void {
    this.gameMode = '1v1';
    this.renderGameInterface();
    this.initializeGame();
  }

  public renderAIGame(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
    this.gameMode = 'ai';
    this.renderGameInterface();
    this.initializeAIGame(difficulty);
  }

  private renderGameInterface(): void {
    this.container.innerHTML = `
      <div class="game-page">
        <!-- Game Header -->
        <div class="game-header">
          <div class="game-controls">
            <button id="back-btn" class="game-btn secondary">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
            <div class="game-info">
              <h2 class="game-title">
                ${this.gameMode === '1v1' ? '1v1 Battle' : 'AI Challenge'}
              </h2>
              <div class="game-status" id="game-status">Ready to Play</div>
            </div>
            <button id="fullscreen-btn" class="game-btn secondary">
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>

        <!-- Game Container -->
        <div class="game-container" id="game-container">
          <div class="game-canvas-wrapper">
            <canvas id="game-canvas" class="game-canvas" tabindex="0"></canvas>
            
            <!-- Game Overlay -->
            <div class="game-overlay" id="game-overlay">
              <div class="game-overlay-content">
                <div class="game-logo">
                  <i class="fas fa-gamepad"></i>
                </div>
                <h3>Ready to Play!</h3>
                <p class="controls-info">
                  <strong>Player 1:</strong> W/S or Arrow Keys<br>
                  ${this.gameMode === '1v1' ? '<strong>Player 2:</strong> I/K or Mouse' : '<strong>AI:</strong> Automated'}
                </p>
                <button id="start-game-btn" class="game-btn primary">
                  <i class="fas fa-play"></i>
                  Start Game
                </button>
              </div>
            </div>
          </div>

          <!-- Game Stats -->
          <div class="game-stats" id="game-stats">
            <div class="stat-card">
              <div class="stat-label">Player 1</div>
              <div class="stat-value" id="player1-score">0</div>
              <div class="stat-name" id="player1-name">Player 1</div>
            </div>
            
            <div class="stat-card center">
              <div class="stat-label">Time</div>
              <div class="stat-value" id="game-time">00:00</div>
              <div class="game-actions">
                <button id="pause-btn" class="game-btn small" title="Pause (Space)">
                  <i class="fas fa-pause"></i>
                </button>
                <button id="reset-btn" class="game-btn small" title="Reset (R)">
                  <i class="fas fa-redo"></i>
                </button>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-label">${this.gameMode === '1v1' ? 'Player 2' : 'AI'}</div>
              <div class="stat-value" id="player2-score">0</div>
              <div class="stat-name" id="player2-name">${this.gameMode === '1v1' ? 'Player 2' : 'AI Opponent'}</div>
            </div>
          </div>
        </div>

        <!-- Game End Modal -->
        <div class="game-end-modal" id="game-end-modal">
          <div class="modal-content">
            <div class="modal-header">
              <i class="fas fa-trophy"></i>
              <h3 id="winner-title">Game Over!</h3>
            </div>
            <div class="modal-body">
              <div class="winner-info">
                <div class="winner-avatar">
                  <i class="fas fa-crown"></i>
                </div>
                <div class="winner-details">
                  <h4 id="winner-name">Winner</h4>
                  <p id="game-summary">Great game!</p>
                </div>
              </div>
              <div class="game-stats-final">
                <div class="final-stat">
                  <span class="label">Final Score:</span>
                  <span class="value" id="final-score">0 - 0</span>
                </div>
                <div class="final-stat">
                  <span class="label">Game Time:</span>
                  <span class="value" id="final-time">00:00</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button id="play-again-btn" class="game-btn primary">
                <i class="fas fa-redo"></i>
                Play Again
              </button>
              <button id="back-to-games-btn" class="game-btn secondary">
                <i class="fas fa-arrow-left"></i>
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private initializeGame(): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

    // Create 1v1 game
    this.game = create1v1Game(this.gameCanvas);
    this.setupGameCallbacks();
  }

  private initializeAIGame(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

    // Create AI game
    this.game = createAIGame(this.gameCanvas, difficulty);
    this.setupGameCallbacks();
  }

  private setupGameCallbacks(): void {
    if (!this.game) return;

    // Score update callback
    this.game.onScoreUpdateCallback((player1Score, player2Score) => {
      this.updateScores(player1Score, player2Score);
    });

    // Game end callback
    this.game.onGameEndCallback((winner, gameTime) => {
      this.showGameEndModal(winner, gameTime);
    });
  }

  private setupEventListeners(): void {
    // Back button
    const backBtn = document.getElementById('back-btn');
    backBtn?.addEventListener('click', () => {
      this.cleanup();
      if (this.onNavigateBack) {
        this.onNavigateBack();
      }
    });

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn?.addEventListener('click', () => {
      this.toggleFullscreen();
    });

    // Start game button
    const startBtn = document.getElementById('start-game-btn');
    startBtn?.addEventListener('click', () => {
      this.startGame();
    });

    // Game control buttons
    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn?.addEventListener('click', () => {
      this.game?.pauseGame();
    });

    const resetBtn = document.getElementById('reset-btn');
    resetBtn?.addEventListener('click', () => {
      this.game?.resetGame();
      this.hideGameEndModal();
      this.showGameOverlay();
    });

    // Game end modal buttons
    const playAgainBtn = document.getElementById('play-again-btn');
    playAgainBtn?.addEventListener('click', () => {
      this.game?.resetGame();
      this.hideGameEndModal();
      this.showGameOverlay();
    });

    const backToGamesBtn = document.getElementById('back-to-games-btn');
    backToGamesBtn?.addEventListener('click', () => {
      this.cleanup();
      if (this.onNavigateBack) {
        this.onNavigateBack();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isFullscreen) {
          this.exitFullscreen();
        } else {
          this.cleanup();
          if (this.onNavigateBack) {
            this.onNavigateBack();
          }
        }
      }
    });
  }

  private startGame(): void {
    this.game?.startGame();
    this.hideGameOverlay();
    this.startGameTimer();
    this.updateGameStatus('Playing...');
  }

  private updateScores(player1Score: number, player2Score: number): void {
    const player1ScoreEl = document.getElementById('player1-score');
    const player2ScoreEl = document.getElementById('player2-score');
    
    if (player1ScoreEl) player1ScoreEl.textContent = player1Score.toString();
    if (player2ScoreEl) player2ScoreEl.textContent = player2Score.toString();
  }

  private startGameTimer(): void {
    const gameTimeEl = document.getElementById('game-time');
    let startTime = Date.now();
    
    const updateTimer = () => {
      if (!this.game) return;
      
      const gameState = this.game.getGameState();
      if (!gameState.isPlaying && !gameState.isPaused) return;
      
      const elapsed = Date.now() - startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      
      if (gameTimeEl) {
        gameTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      
      if (gameState.isPlaying || gameState.isPaused) {
        requestAnimationFrame(updateTimer);
      }
    };
    
    updateTimer();
  }

  private showGameEndModal(winner: Player, gameTime: number): void {
    const modal = document.getElementById('game-end-modal');
    const winnerTitle = document.getElementById('winner-title');
    const winnerName = document.getElementById('winner-name');
    const gameSummary = document.getElementById('game-summary');
    const finalScore = document.getElementById('final-score');
    const finalTime = document.getElementById('final-time');

    if (!modal) return;

    const players = this.game?.getPlayers();
    if (!players) return;

    const gameTimeMinutes = Math.floor(gameTime / 60000);
    const gameTimeSeconds = Math.floor((gameTime % 60000) / 1000);

    if (winnerTitle) winnerTitle.textContent = `🏆 ${winner.name} Wins!`;
    if (winnerName) winnerName.textContent = winner.name;
    if (gameSummary) {
      gameSummary.textContent = winner.id === 'player1' ? 
        'Congratulations! You defeated your opponent!' : 
        'Good game! Better luck next time!';
    }
    if (finalScore) {
      finalScore.textContent = `${players.player1.score} - ${players.player2.score}`;
    }
    if (finalTime) {
      finalTime.textContent = `${gameTimeMinutes.toString().padStart(2, '0')}:${gameTimeSeconds.toString().padStart(2, '0')}`;
    }

    modal.style.display = 'flex';
    this.updateGameStatus('Game Over');
  }

  private hideGameEndModal(): void {
    const modal = document.getElementById('game-end-modal');
    if (modal) modal.style.display = 'none';
  }

  private showGameOverlay(): void {
    const overlay = document.getElementById('game-overlay');
    if (overlay) overlay.style.display = 'flex';
    this.updateGameStatus('Ready to Play');
  }

  private hideGameOverlay(): void {
    const overlay = document.getElementById('game-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  private updateGameStatus(status: string): void {
    const statusEl = document.getElementById('game-status');
    if (statusEl) statusEl.textContent = status;
  }

  private toggleFullscreen(): void {
    const gameContainer = document.getElementById('game-container');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    if (!gameContainer || !fullscreenBtn) return;

    if (!this.isFullscreen) {
      if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
      }
      this.isFullscreen = true;
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      this.exitFullscreen();
    }
  }

  private exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    this.isFullscreen = false;
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  }

  public cleanup(): void {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
    
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
  }
}

// Export factory functions for easy integration
export function create1v1GamePage(container: HTMLElement, onNavigateBack?: () => void): GamePage {
  const gamePage = new GamePage(container, onNavigateBack);
  gamePage.render1v1Game();
  return gamePage;
}

export function createAIGamePage(container: HTMLElement, difficulty: 'easy' | 'medium' | 'hard' = 'medium', onNavigateBack?: () => void): GamePage {
  const gamePage = new GamePage(container, onNavigateBack);
  gamePage.renderAIGame(difficulty);
  return gamePage;
}
