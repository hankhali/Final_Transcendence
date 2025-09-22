// @ts-ignore
import { PongGame, create1v1Game, createAIGame, Player } from './pongGame.js';
/// <reference path="./services/api.d.ts" />
// Game Page Component - Handles the actual game interface
import { PongGame, create1v1Game, createAIGame, Player } from './pongGame.js';

export class GamePage {
  // hanieh added: Store tournament aliases
  private tournamentAliases: { [playerId: string]: string } = {};


  // hanieh added: Reset aliases and show modal for new tournament
  public renderTournamentGame(): void {
    this.tournamentAliases = {};
    this.gameMode = 'tournament';
    this.renderGameInterface();
  window.requestAnimationFrame(() => this.showTournamentAliasModal());
  }
  // Helper to get tournamentId from context (replace with your logic)
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

  // hanieh added: Show tournament alias modal and store alias
  private showTournamentAliasModal(): void {
    const modal = document.getElementById('tournament-alias-modal') as HTMLElement;
    const input = document.getElementById('tournament-alias-input') as HTMLInputElement;
    const submitBtn = document.getElementById('submit-tournament-alias-btn') as HTMLButtonElement;
    const errorDiv = document.getElementById('tournament-alias-error') as HTMLElement;
    if (modal && input && submitBtn && errorDiv) {
      modal.style.display = 'flex';
      input.value = '';
      errorDiv.style.display = 'none';
      submitBtn.onclick = () => {
        const alias = input.value.trim();
        if (!alias) {
          errorDiv.textContent = 'You must enter an alias to play in this tournament!';
          errorDiv.style.display = 'block';
          return;
        }
        // For demo, use a static playerId. Replace with actual player/user id logic.
        const playerId = 'player1';
        this.tournamentAliases[playerId] = alias;
        modal.style.display = 'none';
        this.initializeGame();
      };
    }
  }


  public render1v1Game(): void {
    this.gameMode = '1v1';
    this.renderGameInterface();
  window.requestAnimationFrame(() => this.initializeGame()); // hanieh added: ensure canvas exists
  }

  public renderAIGame(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
    this.gameMode = 'ai';
    this.renderGameInterface();
  window.requestAnimationFrame(() => this.initializeAIGame(difficulty)); // hanieh added: ensure canvas exists
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
                ${this.gameMode === '1v1' ? '1v1 Battle' : this.gameMode === 'tournament' ? 'Tournament' : 'AI Challenge'}
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

        <!-- Custom modal for opponent username input (1v1) -->
        <div id="username-modal" class="modal" style="display:none;">
          <div class="modal-content">
            <span class="close" id="close-username-modal">&times;</span>
            <h2>Enter opponent username for 1v1 match</h2>
            <input type="text" id="opponent-username-input" placeholder="Opponent username" />
            <button id="submit-username-btn" class="game-btn primary">Start Match</button>
            <div id="username-error" class="error-message" style="display:none;"></div>
          </div>
        </div>

        <!-- Tournament alias modal -->
        <div id="tournament-alias-modal" class="modal" style="display:none;">
          <div class="modal-content">
            <h2>Enter your alias for this tournament</h2>
            <input type="text" id="tournament-alias-input" placeholder="Your alias" />
            <button id="submit-tournament-alias-btn" class="game-btn primary">Save Alias</button>
            <div id="tournament-alias-error" class="error-message" style="display:none;"></div>
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

    if (this.gameMode === 'tournament') {
      const tournamentId = this.getTournamentIdFromContext();
      // Tournament game logic (replace with actual API call if needed)
      this.game = create1v1Game(this.gameCanvas);
      this.game.matchId = 0; // Replace with actual matchId from backend if needed
      this.game.tournamentId = tournamentId;
      this.setupGameCallbacks();
      console.log('[hanieh added] Tournament game created with tournamentId:', tournamentId);
    } else if (this.gameMode === '1v1') {
      // hanieh added: Show custom modal for opponent username
      const modal = document.getElementById('username-modal') as HTMLElement;
      const input = document.getElementById('opponent-username-input') as HTMLInputElement;
      const submitBtn = document.getElementById('submit-username-btn') as HTMLButtonElement;
      const errorDiv = document.getElementById('username-error') as HTMLElement;
      const closeBtn = document.getElementById('close-username-modal') as HTMLElement;
      if (modal && input && submitBtn && errorDiv && closeBtn) {
        modal.style.display = 'flex';
        input.value = '';
        errorDiv.style.display = 'none';
        submitBtn.onclick = () => {
          const opponentUsername = input.value.trim();
          if (!opponentUsername) {
            errorDiv.textContent = 'You must enter a valid username for your opponent!';
            errorDiv.style.display = 'block';
            return;
          }
          modal.style.display = 'none';
          import('./services/api.js').then(({ onevone }) => {
            onevone.start(opponentUsername).then((response: { data?: { matchId?: number }, error?: any }) => {
              const { data, error } = response;
              if (error) {
                errorDiv.textContent = 'Could not start 1v1 match: ' + error;
                errorDiv.style.display = 'block';
                modal.style.display = 'flex';
                return;
              }
              const matchId = data?.matchId;
              if (!matchId) {
                errorDiv.textContent = 'Could not start 1v1 game: No valid matchId from backend.';
                errorDiv.style.display = 'block';
                modal.style.display = 'flex';
                return;
              }
              if (this.gameCanvas) {
                this.game = create1v1Game(this.gameCanvas);
                this.game.matchId = matchId;
                this.game.tournamentId = undefined;
                this.setupGameCallbacks();
                console.log('[hanieh added] 1v1 game created with matchId:', this.game.matchId);
              } else {
                errorDiv.textContent = 'Game canvas not found.';
                errorDiv.style.display = 'block';
                modal.style.display = 'flex';
              }
            });
          });
        };
        closeBtn.onclick = () => {
          modal.style.display = 'none';
        };
      }
    } else {
      // Non-tournament game (demo/AI)
      this.game = create1v1Game(this.gameCanvas);
      this.game.matchId = 0;
      this.game.tournamentId = 1;
      this.setupGameCallbacks();
      console.log('Game created:', this.game);
    }
  }

  private initializeAIGame(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

    // For AI games, use demo IDs (or adapt for tournament if needed)
    this.game = createAIGame(this.gameCanvas, difficulty);
    this.game.matchId = Date.now();
    this.game.tournamentId = 1;
    this.setupGameCallbacks();
    // ...existing code...
  }

  // Helper to get tournamentId from context (replace with your logic)
  private getTournamentIdFromContext(): number {
    // TODO: Replace with actual logic to get tournamentId (e.g., from route, state, or user selection)
    return 1;
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

    // hanieh added: openSettingsModal is not used, but kept for future settings modal logic
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

    // hanieh added: showGameEndModal is not used, but kept for future modal logic
  private showGameEndModal(winner: Player, gameTime: number): void {
    // hanieh added: Send match result to backend for game history
    const matchId = this.game?.matchId;
    const tournamentId = this.game?.tournamentId;
    const player1Score = this.game?.getPlayers().player1.score;
    const player2Score = this.game?.getPlayers().player2.score;
    console.log('[DEBUG] Preparing to submit match result:', {
      matchId,
      tournamentId,
      player1Score,
      player2Score,
      game: this.game
    });
    if (typeof matchId === 'number' && typeof player1Score === 'number' && typeof player2Score === 'number') {
      if (this.gameMode === '1v1') {
        // hanieh added: Use onevone.submitResult for standalone 1v1
        import('./services/api.js').then(({ onevone }) => {
          onevone.submitResult(matchId, player1Score, player2Score)
            .then(({ data, error }) => {
              if (error) {
                console.error('[hanieh added] Error sending 1v1 match result:', error);
              } else {
                console.log('[hanieh added] 1v1 match result sent to backend:', data);
                window.dispatchEvent(new Event('reloadDashboardStats'));
              }
            })
            .catch((err: unknown) => {
              console.error('[hanieh added] Error sending 1v1 match result:', err);
            });
        });
      } else if (this.gameMode === 'tournament' && typeof tournamentId === 'number') {
        import('./services/api.js').then(({ apiService }) => {
          apiService.tournaments.submitMatchResult(tournamentId, matchId, player1Score, player2Score)
            .then(({ data, error }) => {
              if (error) {
                console.error('[ADDED] Error sending tournament match result:', error);
              } else {
                console.log('[ADDED] Tournament match result sent to backend:', data);
                window.dispatchEvent(new Event('reloadDashboardStats'));
              }
            })
            .catch((err: unknown) => {
              console.error('[ADDED] Error sending tournament match result:', err);
            });
        });
      } else {
        console.warn('[ADDED] Missing tournamentId for tournament match result', {
          matchId,
          tournamentId,
          player1Score,
          player2Score,
          game: this.game
        });
      }
    } else {
      console.warn('[ADDED] Missing matchId or scores, cannot send match result to backend', {
        matchId,
        tournamentId,
        player1Score,
        player2Score,
        game: this.game
      });
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
