import { PongGame, create1v1Game, createAIGame } from './pongGame.js';
// Game Page Component - Handles the actual game interface

export class GamePage {
  private container: HTMLElement;
  // Bracket match state: 0 = not started, 1 = in progress, 2 = finished
  private matches = [0, 0]; // [match1, match2]
  private game: PongGame | null = null;
  private gameCanvas: HTMLCanvasElement | null = null;
  private gameMode: '1v1' | 'ai' = '1v1';
  private isFullscreen = false;
  private onNavigateBack?: () => void;

  constructor(container: HTMLElement, onNavigateBack?: () => void) {
    this.container = container;
    this.onNavigateBack = onNavigateBack;
  }

  // Customization removed: always basic Pong

  public render1v1Game(): void {
    this.gameMode = '1v1';
    this.renderBracketInterface();
    this.hideGameEndModal(); // Ensure modal is hidden on new game
    this.initializeGame();
  }

  public renderAIGame(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
  this.gameMode = 'ai';
  this.renderGameInterface();
  this.hideGameEndModal(); // Ensure modal is hidden on new game
  this.initializeAIGame(difficulty);
  }

  private renderGameInterface(): void {
    this.container.innerHTML = '';
    // ...existing code...
    this.renderBracketInterface();
    this.setupEventListeners();
    const modal = document.getElementById('game-end-modal');
    if (modal) modal.style.display = 'none';
    this.hideGameEndModal();
  // Render a simple bracket UI with two matches and lock logic
  private renderBracketInterface(): void {
    this.container.innerHTML = `
      <div class="bracket-section" style="margin-bottom:2rem;">
        <h2>Tournament Bracket</h2>
        <div style="display:flex; gap:2rem;">
          <div>
            <h3>Match 1</h3>
            <button id="start-match1-btn" class="game-btn primary" ${this.matches[0] === 1 ? 'disabled' : ''}>
              ${this.matches[0] === 0 ? 'Start Match 1' : this.matches[0] === 1 ? 'Match 1 In Progress' : 'Match 1 Finished'}
            </button>
          </div>
          <div>
            <h3>Match 2</h3>
            <button id="start-match2-btn" class="game-btn primary" ${this.matches[0] !== 2 ? 'disabled' : ''}>
              ${this.matches[1] === 0 ? 'Start Match 2' : this.matches[1] === 1 ? 'Match 2 In Progress' : 'Match 2 Finished'}
            </button>
            <div style="color:#888; font-size:0.9em; margin-top:.5em;">
              ${this.matches[0] !== 2 ? 'Locked until Match 1 is finished' : ''}
            </div>
          </div>
        </div>
      </div>
      <div id="game-interface"></div>
    `;
    this.setupBracketEventListeners();
  }

  // Setup event listeners for bracket buttons
  private setupBracketEventListeners(): void {
    const match1Btn = document.getElementById('start-match1-btn');
    const match2Btn = document.getElementById('start-match2-btn');
    if (match1Btn) {
      match1Btn.addEventListener('click', () => {
        this.matches[0] = 1; // Match 1 in progress
        this.renderBracketInterface();
        // Optionally render the game for match 1
        this.renderGameInterfaceInBracket(1);
      });
    }
    if (match2Btn) {
      match2Btn.addEventListener('click', () => {
        this.matches[1] = 1; // Match 2 in progress
        this.renderBracketInterface();
        this.renderGameInterfaceInBracket(2);
      });
    }
  }

  // Render the game interface inside the bracket section
  private renderGameInterfaceInBracket(matchNum: number): void {
    const gameDiv = document.getElementById('game-interface');
    if (!gameDiv) return;
    gameDiv.innerHTML = `
      <div class="game-header">
        <h3>Playing Match ${matchNum}</h3>
        <button id="end-match-btn" class="game-btn secondary">End Match</button>
      </div>
      <div style="margin-top:1rem;">Game UI would go here.</div>
    `;
    const endBtn = document.getElementById('end-match-btn');
    if (endBtn) {
      endBtn.addEventListener('click', () => {
        this.matches[matchNum-1] = 2; // Mark match as finished
        gameDiv.innerHTML = '';
        this.renderBracketInterface();
      });
    }
  }
  }

  private initializeGame(): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

  // Always basic Pong, no overrides
  this.game = create1v1Game(this.gameCanvas);
  this.setupGameCallbacks();
  }

  private initializeAIGame(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!this.gameCanvas) return;

  // Always basic Pong, no overrides
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
    this.game.onGameEndCallback(() => {
      this.showGameEndModal();
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
  this.hideGameEndModal(); // Hide modal when starting game
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

  private showGameEndModal(): void {
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
