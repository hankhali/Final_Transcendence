// Game Page Component - Handles the actual game interface
import { PongGame, create1v1Game, createAIGame, Player } from './pongGame.js';

export class GamePage {
  private container: HTMLElement;
  public game: PongGame | null = null;
  public setPlayerNames(player1Name: string, player2Name: string): void {
    if (this.game) {
      this.game.setPlayerNames(player1Name, player2Name);
    }
  }
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
            <div style="display:flex; gap:.5rem;">
              <button id="fullscreen-btn" class="game-btn secondary">
                <i class="fas fa-expand"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Game Container -->
        <div class="game-container" id="game-container">
          <div class="game-canvas-wrapper">
            <canvas id="game-canvas" class="game-canvas"></canvas>
            <!-- Game Overlay -->
            <div class="game-overlay" id="game-overlay">
              <div class="game-overlay-content">
                <div class="game-logo">
                  <i class="fas fa-gamepad"></i>
                </div>
                <h3>Ready to Play!</h3>
                <p class="controls-info">
                  <strong>Player 1:</strong> W/S<br>
                  ${this.gameMode === '1v1' ? '<strong>Player 2:</strong> Arrow Keys' : '<strong>AI:</strong> Automated'}
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
        <!-- Game End Modal REMOVED -->
      </div>
    `;

    this.setupEventListeners();
  }

  private initializeGame(): void {
    console.log('Initializing game...');
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    console.log('Canvas found:', this.gameCanvas);
    if (!this.gameCanvas) {
      console.error('Canvas not found!');
      return;
    }

  // Always basic Pong, no overrides
  this.game = create1v1Game(this.gameCanvas);
    // [ADDED] Set matchId and tournamentId for backend integration
    if (this.game) {
      // You may want to generate or fetch these IDs from your backend or game context
      // For demo, we'll use dummy values. Replace with real logic as needed.
      this.game.matchId = Date.now(); // Example: use timestamp as dummy matchId
      this.game.tournamentId = 1; // Example: hardcoded tournamentId
    }
    console.log('Game created:', this.game);
    this.setupGameCallbacks();
  }

  private initializeAIGame(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

  // Always basic Pong, no overrides
  this.game = createAIGame(this.gameCanvas, difficulty);
    // [ADDED] Set matchId and tournamentId for backend integration
    if (this.game) {
      this.game.matchId = Date.now(); // Example: use timestamp as dummy matchId
      this.game.tournamentId = 1; // Example: hardcoded tournamentId
    }
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

  private openSettingsModal(): void {
    // Settings modal removed
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

  // Settings button removed

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

    // Game end modal buttons REMOVED

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
    console.log('Starting game...', this.game);
    if (!this.game) {
      console.error('Game not initialized!');
      return;
    }
    this.hideGameOverlay();
    // Force overlay to hide in case of CSS issues
    const overlay = document.getElementById('game-overlay');
    if (overlay) overlay.style.display = 'none';
    // Ensure canvas is visible and sized correctly
    if (this.gameCanvas) {
      this.gameCanvas.style.display = 'block';
      this.gameCanvas.width = 800;
      this.gameCanvas.height = 400;
    }
    this.game.startGame();
    this.startGameTimer();
    this.updateGameStatus('Playing...');
    console.log('Game started successfully');
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
    // [ADDED BY HANIEH] Send match result to backend for game history
    // This is required for game history and stats to work!
    // Replace these with your actual matchId, tournamentId, and scores
    const matchId = this.game?.matchId; // You need to set this when creating the game
    const tournamentId = this.game?.tournamentId; // You need to set this when creating the game
    const player1Score = this.game?.getPlayers().player1.score;
    const player2Score = this.game?.getPlayers().player2.score;
    if (matchId && tournamentId && typeof player1Score === 'number' && typeof player2Score === 'number') {
      // Use the shared API service for match result submission
        // Use the shared API service for match result submission
        import('./services/api.js').then(({ apiService }) => {
          apiService.tournaments.submitMatchResult(tournamentId, matchId, player1Score, player2Score)
            .then(({ data, error }) => {
              if (error) {
                console.error('[ADDED] Error sending match result:', error);
              } else {
                console.log('[ADDED] Match result sent to backend:', data);
              }
            })
            .catch(err => {
              console.error('[ADDED] Error sending match result:', err);
            });
        });
    } else {
      console.warn('[ADDED] Missing matchId/tournamentId or scores, cannot send match result to backend');
    }
  // Game End Modal logic REMOVED
  }

  private hideGameEndModal(): void {
  // Game End Modal hide logic REMOVED
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
