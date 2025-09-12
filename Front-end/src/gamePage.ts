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

  private getCustomization(): { mode: 'basic' | 'custom'; theme: 'neon' | 'retro' | 'dark'; powerUpsEnabled: boolean; powerUpTypes?: string[]; player1PowerUps?: { [key: string]: number }; player2PowerUps?: { [key: string]: number } } {
    try {
      const raw = localStorage.getItem('gameCustomization');
      if (raw) return JSON.parse(raw);
    } catch {}
    return { mode: 'basic', theme: 'neon', powerUpsEnabled: false, powerUpTypes: ['paddle_size', 'ball_speed'] };
  }

  private saveCustomization(data: { mode: 'basic' | 'custom'; theme: 'neon' | 'retro' | 'dark'; powerUpsEnabled: boolean; powerUpTypes?: string[] }) {
    localStorage.setItem('gameCustomization', JSON.stringify(data));
  }

  private getOverridesFromCustomization(): Partial<import('./pongGame.js').GameConfig> | undefined {
    const c = this.getCustomization();
    if (c.mode === 'basic') {
      return { theme: 'neon', powerUpsEnabled: false };
    }
    return { 
      theme: c.theme, 
      powerUpsEnabled: c.powerUpsEnabled, 
      powerUpTypes: c.powerUpTypes as any,
      player1PowerUps: c.player1PowerUps,
      player2PowerUps: c.player2PowerUps
    };
  }

  private openPowerUpSelection(): void {
    const modal = document.getElementById('powerup-selection-modal') as HTMLElement;
    if (!modal) return;
    
    modal.style.display = 'flex';
    this.renderPowerUpSelection();
  }

  private renderPowerUpSelection(): void {
    const content = document.getElementById('powerup-selection-content');
    if (!content) return;

    const powerUpTypes = [
      { id: 'paddle_size', name: 'Paddle Size Boost', emoji: '🟢', description: 'Makes paddle 50% larger' },
      { id: 'ball_speed', name: 'Ball Speed Boost', emoji: '🟠', description: 'Increases ball speed by 30%' },
      { id: 'slow_opponent', name: 'Slow Opponent', emoji: '🔵', description: 'Slows opponent\'s paddle speed' },
      { id: 'shrink_opponent', name: 'Shrink Opponent', emoji: '🟣', description: 'Makes opponent\'s paddle smaller' },
      { id: 'curve_ball', name: 'Curve Ball', emoji: '🔮', description: 'Adds extra spin to next hit' },
      { id: 'multi_ball', name: 'Multi-Ball', emoji: '🟠', description: 'Spawns 2 additional balls' },
      { id: 'reverse_controls', name: 'Reverse Controls', emoji: '🔄', description: 'Reverses opponent\'s controls' },
      { id: 'shield', name: 'Shield', emoji: '🛡️', description: 'Deflects ball with extra power' },
      { id: 'magnet', name: 'Magnet', emoji: '🧲', description: 'Attracts ball towards your paddle' }
    ];

    content.innerHTML = `
      <div class="powerup-selection-container">
        <div class="player-selection" id="player1-selection">
          <h4>Player 1 - Choose Your Power-ups (2-3)</h4>
          <div class="powerup-grid">
            ${powerUpTypes.map(pu => `
              <div class="powerup-selection-option" data-type="${pu.id}">
                <input type="checkbox" id="p1-${pu.id}" value="${pu.id}">
                <label for="p1-${pu.id}">
                  <span class="powerup-emoji">${pu.emoji}</span>
                  <span class="powerup-name">${pu.name}</span>
                  <span class="powerup-description">${pu.description}</span>
                </label>
              </div>
            `).join('')}
          </div>
          <div class="selection-status">Selected: <span id="p1-count">0</span>/3</div>
        </div>
        
        <div class="player-selection" id="player2-selection" style="display:none;">
          <h4>Player 2 - Choose Your Power-ups (2-3)</h4>
          <div class="powerup-grid">
            ${powerUpTypes.map(pu => `
              <div class="powerup-selection-option" data-type="${pu.id}">
                <input type="checkbox" id="p2-${pu.id}" value="${pu.id}">
                <label for="p2-${pu.id}">
                  <span class="powerup-emoji">${pu.emoji}</span>
                  <span class="powerup-name">${pu.name}</span>
                  <span class="powerup-description">${pu.description}</span>
                </label>
              </div>
            `).join('')}
          </div>
          <div class="selection-status">Selected: <span id="p2-count">0</span>/3</div>
        </div>
      </div>
    `;

    this.setupPowerUpSelectionListeners();
  }

  private setupPowerUpSelectionListeners(): void {
    const p1Checkboxes = document.querySelectorAll('#player1-selection input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const p2Checkboxes = document.querySelectorAll('#player2-selection input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const p1Count = document.getElementById('p1-count');
    const p2Count = document.getElementById('p2-count');
    const p2Selection = document.getElementById('player2-selection');
    const startBtn = document.getElementById('powerup-selection-start') as HTMLButtonElement;
    const backBtn = document.getElementById('powerup-selection-back');

    let p1Selections: string[] = [];
    let p2Selections: string[] = [];

    const updateCount = (player: number) => {
      const count = player === 1 ? p1Selections.length : p2Selections.length;
      const countElement = player === 1 ? p1Count : p2Count;
      if (countElement) countElement.textContent = count.toString();
      
      // Enable/disable checkboxes based on selection limit
      const checkboxes = player === 1 ? p1Checkboxes : p2Checkboxes;
      checkboxes.forEach(cb => {
        const isSelected = (player === 1 ? p1Selections : p2Selections).includes(cb.value);
        cb.disabled = !isSelected && count >= 3;
      });

      // Show next player or enable start button
      if (player === 1 && count >= 2) {
        if (p2Selection) p2Selection.style.display = 'block';
      } else if (player === 2 && count >= 2) {
        if (startBtn) {
          startBtn.disabled = false;
          startBtn.textContent = 'Start Game';
        }
      }
    };

    p1Checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) {
          p1Selections.push(cb.value);
        } else {
          p1Selections = p1Selections.filter(s => s !== cb.value);
        }
        updateCount(1);
      });
    });

    p2Checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) {
          p2Selections.push(cb.value);
        } else {
          p2Selections = p2Selections.filter(s => s !== cb.value);
        }
        updateCount(2);
      });
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (p1Selections.length >= 2 && p2Selections.length >= 2) {
          this.savePowerUpSelections(p1Selections, p2Selections);
          this.closePowerUpSelection();
          this.startGameWithPowerUps();
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.closePowerUpSelection();
        this.openSettingsModal();
      });
    }
  }

  private savePowerUpSelections(p1Selections: string[], p2Selections: string[]): void {
    const p1PowerUps: { [key: string]: number } = {};
    const p2PowerUps: { [key: string]: number } = {};

    p1Selections.forEach(pu => p1PowerUps[pu] = 3);
    p2Selections.forEach(pu => p2PowerUps[pu] = 3);

    const customization = this.getCustomization();
    customization.player1PowerUps = p1PowerUps;
    customization.player2PowerUps = p2PowerUps;
    this.saveCustomization(customization);
  }

  private closePowerUpSelection(): void {
    const modal = document.getElementById('powerup-selection-modal') as HTMLElement;
    if (modal) modal.style.display = 'none';
  }

  private startGameWithPowerUps(): void {
    // Start the game with the selected power-ups
    if (this.gameMode === '1v1') {
      this.initializeGame();
    } else {
      this.initializeAIGame('medium');
    }
  }

  private closeSettingsModal(): void {
    const modal = document.getElementById('settings-modal') as HTMLElement;
    if (modal) modal.style.display = 'none';
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
    const customization = this.getCustomization();
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
              <button id="settings-btn" class="game-btn secondary" title="Game Settings" style="font-size: 1.1rem; padding: 12px 20px; font-weight: 600;">
                <i class="fas fa-sliders-h"></i> Customize
              </button>
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

        <!-- Power-up Selection Modal -->
        <div class="game-end-modal" id="powerup-selection-modal" style="display:none;">
          <div class="modal-content">
            <div class="modal-header">
              <i class="fas fa-rocket"></i>
              <h3>Power-up Selection</h3>
            </div>
            <div class="modal-body">
              <div id="powerup-selection-content">
                <!-- Content will be dynamically generated -->
              </div>
            </div>
            <div class="modal-footer">
              <button id="powerup-selection-back" class="game-btn secondary">Back to Settings</button>
              <button id="powerup-selection-start" class="game-btn primary" disabled>Start Game</button>
            </div>
          </div>
        </div>

        <!-- Settings Modal -->
        <div class="game-end-modal" id="settings-modal" style="display:none;">
          <div class="modal-content">
            <div class="modal-header">
              <i class="fas fa-sliders-h"></i>
              <h3>Game Customization</h3>
            </div>
            <div class="modal-body">
              <div class="settings-grid">
                <div class="setting-group">
                  <h4>Game Mode</h4>
                  <div style="margin-top:1rem;">
                    <label style="display:block; margin:1rem 0; padding:0.75rem; background:rgba(0,0,0,0.2); border-radius:8px; cursor:pointer; transition:all 0.3s ease; border:1px solid rgba(0,255,255,0.2);">
                      <input type="radio" name="mode" value="basic" ${customization.mode === 'basic' ? 'checked' : ''} style="margin-right:0.75rem;">
                      <span style="font-weight:600; color:#00ffff;">Basic Game</span>
                      <div style="font-size:0.8rem; color:#aaa; margin-top:0.25rem;">Simple, classic Pong experience</div>
                    </label>
                    <label style="display:block; margin:1rem 0; padding:0.75rem; background:rgba(0,0,0,0.2); border-radius:8px; cursor:pointer; transition:all 0.3s ease; border:1px solid rgba(0,255,255,0.2);">
                      <input type="radio" name="mode" value="custom" ${customization.mode === 'custom' ? 'checked' : ''} style="margin-right:0.75rem;">
                      <span style="font-weight:600; color:#00ffff;">Custom Game</span>
                      <div style="font-size:0.8rem; color:#aaa; margin-top:0.25rem;">Full customization with power-ups & themes</div>
                    </label>
                  </div>
                </div>
                <div class="setting-group">
                  <h4>Visual Theme</h4>
                  <label>Choose your preferred visual style</label>
                  <select id="theme-select" style="margin-top:0.5rem;">
                    <option value="neon" ${customization.theme === 'neon' ? 'selected' : ''}>🌟 Neon - Futuristic glow effects</option>
                    <option value="retro" ${customization.theme === 'retro' ? 'selected' : ''}>🎮 Retro - Classic arcade style</option>
                    <option value="dark" ${customization.theme === 'dark' ? 'selected' : ''}>🌙 Dark - Sleek modern interface</option>
                  </select>
                </div>
                <div class="setting-group" style="grid-column: 1 / -1;">
                  <h4>Power-Up System</h4>
                  <label style="display:flex; align-items:center; margin-bottom:1rem; padding:0.75rem; background:rgba(0,0,0,0.2); border-radius:8px; cursor:pointer; transition:all 0.3s ease;">
                    <input id="powerups-toggle" type="checkbox" ${customization.powerUpsEnabled ? 'checked' : ''} style="margin-right:0.75rem; width:18px; height:18px; accent-color:#00ffff;">
                    <span style="font-weight:600; color:#00ffff;">Enable Power-Up System</span>
                    <div style="font-size:0.8rem; color:#aaa; margin-left:auto;">Each player chooses 2-3 power-ups (3 uses each)</div>
                  </label>
                  <button id="select-powerups-btn" class="game-btn primary" style="width:100%; margin-top:1rem; padding:0.75rem; font-size:0.9rem;" ${!customization.powerUpsEnabled ? 'disabled' : ''}>
                    <i class="fas fa-rocket"></i> Select Power-ups
                  </button>
                  <div id="powerup-options" class="powerup-grid" style="display:${customization.powerUpsEnabled ? 'grid' : 'none'};">
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="paddle_size" ${customization.powerUpTypes?.includes('paddle_size') ? 'checked' : ''}>
                      <label>🟢 Paddle Size Boost</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="ball_speed" ${customization.powerUpTypes?.includes('ball_speed') ? 'checked' : ''}>
                      <label>🟠 Ball Speed Boost</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="slow_opponent" ${customization.powerUpTypes?.includes('slow_opponent') ? 'checked' : ''}>
                      <label>🔵 Slow Opponent</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="shrink_opponent" ${customization.powerUpTypes?.includes('shrink_opponent') ? 'checked' : ''}>
                      <label>🟣 Shrink Opponent</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="curve_ball" ${customization.powerUpTypes?.includes('curve_ball') ? 'checked' : ''}>
                      <label>🔮 Curve Ball</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="multi_ball" ${customization.powerUpTypes?.includes('multi_ball') ? 'checked' : ''}>
                      <label>🟠 Multi-Ball</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="reverse_controls" ${customization.powerUpTypes?.includes('reverse_controls') ? 'checked' : ''}>
                      <label>🔄 Reverse Controls</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="shield" ${customization.powerUpTypes?.includes('shield') ? 'checked' : ''}>
                      <label>🛡️ Shield</label>
                    </div>
                    <div class="powerup-option">
                      <input type="checkbox" name="powerup" value="magnet" ${customization.powerUpTypes?.includes('magnet') ? 'checked' : ''}>
                      <label>🧲 Magnet</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button id="settings-cancel" class="game-btn secondary">Cancel</button>
              <button id="settings-save" class="game-btn primary">Save Settings</button>
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

    // Create 1v1 game with customization overrides
    const overrides = this.getOverridesFromCustomization();
    this.game = create1v1Game(this.gameCanvas, overrides);
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

    // Create AI game with customization overrides
    const overrides = this.getOverridesFromCustomization();
    this.game = createAIGame(this.gameCanvas, difficulty, overrides);
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
    const modal = document.getElementById('settings-modal') as HTMLElement;
    if (!modal) return;
    modal.style.display = 'flex';

    const cancelBtn = document.getElementById('settings-cancel');
    const saveBtn = document.getElementById('settings-save');
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    const powerupsToggle = document.getElementById('powerups-toggle') as HTMLInputElement;
    const powerupOptions = document.getElementById('powerup-options') as HTMLElement;

    // Toggle power-up options visibility
    powerupsToggle?.addEventListener('change', () => {
      if (powerupOptions) {
        powerupOptions.style.display = powerupsToggle.checked ? 'block' : 'none';
      }
      const selectBtn = document.getElementById('select-powerups-btn') as HTMLButtonElement;
      if (selectBtn) {
        selectBtn.disabled = !powerupsToggle?.checked;
      }
    });

    // Power-up selection button
    const selectPowerupsBtn = document.getElementById('select-powerups-btn');
    selectPowerupsBtn?.addEventListener('click', () => {
      this.closeSettingsModal();
      this.openPowerUpSelection();
    });

    const close = () => { modal.style.display = 'none'; };

    cancelBtn?.addEventListener('click', close, { once: true });
    saveBtn?.addEventListener('click', () => {
      const selectedMode = (document.querySelector('input[name="mode"]:checked') as HTMLInputElement)?.value as 'basic' | 'custom';
      
      // Collect selected power-ups
      const selectedPowerUps: string[] = [];
      if (powerupsToggle?.checked) {
        const powerupCheckboxes = document.querySelectorAll('input[name="powerup"]:checked') as NodeListOf<HTMLInputElement>;
        powerupCheckboxes.forEach(cb => selectedPowerUps.push(cb.value));
      }
      
      const next = {
        mode: selectedMode || 'basic',
        theme: (themeSelect?.value as any) || 'neon',
        powerUpsEnabled: !!powerupsToggle?.checked,
        powerUpTypes: selectedPowerUps as any[]
      } as { mode: 'basic' | 'custom'; theme: 'neon' | 'retro' | 'dark'; powerUpsEnabled: boolean; powerUpTypes: string[] };
      this.saveCustomization(next);
      close();
      // Optionally re-initialize current game to apply immediately
      if (this.gameCanvas) {
        if (this.gameMode === 'ai') {
          // Default to medium if AI game; we don't track chosen difficulty here
          this.game?.destroy();
          this.game = null;
          this.initializeAIGame('medium');
        } else {
          this.game?.destroy();
          this.game = null;
          this.initializeGame();
        }
      }
    }, { once: true });

    // close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    }, { once: true });
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

    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    settingsBtn?.addEventListener('click', () => this.openSettingsModal());

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
    // [ADDED BY HANIEH & COPILOT] Send match result to backend for game history
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
