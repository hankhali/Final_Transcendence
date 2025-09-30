// Game Customization System
// Provides unified customization options for all game modes (AI, 1v1, tournaments)

export interface GameCustomizationOptions {
  // Game Mode
  gameMode: 'default' | 'custom';
  
  // Visual Themes
  theme: 'neon' | 'retro' | 'dark' | 'space' | 'classic';
  
  // Power-ups
  powerUpsEnabled: boolean;
  availablePowerUps: PowerUpType[];
  
  // Attacks/Special Abilities
  attacksEnabled: boolean;
  availableAttacks: AttackType[];
  
  // Game Physics
  ballSpeed: 'slow' | 'normal' | 'fast' | 'extreme';
  paddleSpeed: 'slow' | 'normal' | 'fast';
  ballSize: 'small' | 'normal' | 'large';
  paddleSize: 'small' | 'normal' | 'large';
  
  // Game Rules
  maxScore: 3 | 5 | 7 | 11 | 21;
  winCondition: 'first_to_score' | 'best_of_sets';
  
  // Map/Arena
  mapType: 'classic' | 'obstacles' | 'moving_walls' | 'portals';
  
  // Special Effects
  particleEffects: boolean;
  screenShake: boolean;
  soundEffects: boolean;
}

export type PowerUpType = 
  | 'paddle_size_boost' 
  | 'paddle_speed_boost'
  | 'ball_speed_slow'
  | 'ball_speed_fast'
  | 'shrink_opponent'
  | 'curve_ball'
  | 'multi_ball'
  | 'reverse_controls'
  | 'shield'
  | 'magnet'
  | 'freeze_opponent'
  | 'invisible_ball';

export type AttackType = 
  | 'lightning_strike'
  | 'paddle_slam'
  | 'ball_explosion'
  | 'screen_distortion'
  | 'gravity_flip'
  | 'time_slow'
  | 'paddle_lock'
  | 'ball_redirect';

export class GameCustomizationManager {
  private static instance: GameCustomizationManager;
  private currentSettings: GameCustomizationOptions;
  
  private constructor() {
    this.currentSettings = this.getDefaultSettings();
    this.loadUserSettings();
  }
  
  public static getInstance(): GameCustomizationManager {
    if (!GameCustomizationManager.instance) {
      GameCustomizationManager.instance = new GameCustomizationManager();
    }
    return GameCustomizationManager.instance;
  }
  
  private getDefaultSettings(): GameCustomizationOptions {
    return {
      gameMode: 'default',
      theme: 'neon',
      powerUpsEnabled: false,
      availablePowerUps: [],
      attacksEnabled: false,
      availableAttacks: [],
      ballSpeed: 'normal',
      paddleSpeed: 'normal',
      ballSize: 'normal',
      paddleSize: 'normal',
      maxScore: 5,
      winCondition: 'first_to_score',
      mapType: 'classic',
      particleEffects: true,
      screenShake: true,
      soundEffects: true
    };
  }
  
  private loadUserSettings(): void {
    const saved = localStorage.getItem('gameCustomizationSettings');
    if (saved) {
      try {
        this.currentSettings = { ...this.getDefaultSettings(), ...JSON.parse(saved) };
      } catch (error) {
        console.warn('Failed to load game customization settings:', error);
      }
    }
  }
  
  public saveUserSettings(): void {
    localStorage.setItem('gameCustomizationSettings', JSON.stringify(this.currentSettings));
  }
  
  public getCurrentSettings(): GameCustomizationOptions {
    return { ...this.currentSettings };
  }
  
  public updateSettings(newSettings: Partial<GameCustomizationOptions>): void {
    this.currentSettings = { ...this.currentSettings, ...newSettings };
    this.saveUserSettings();
  }
  
  public resetToDefault(): void {
    this.currentSettings = this.getDefaultSettings();
    this.saveUserSettings();
  }
  
  // Convert customization settings to game config
  public toGameConfig(): any {
    const settings = this.currentSettings;
    
    return {
      theme: settings.theme,
      powerUpsEnabled: settings.powerUpsEnabled,
      attacksEnabled: settings.attacksEnabled,
      powerUpTypes: settings.availablePowerUps,
      attackTypes: settings.availableAttacks,
      ballSpeed: this.mapSpeedToValue(settings.ballSpeed, 'ball'),
      paddleSpeed: this.mapSpeedToValue(settings.paddleSpeed, 'paddle'),
      ballSize: this.mapSizeToValue(settings.ballSize),
      paddleHeight: this.mapPaddleSizeToValue(settings.paddleSize),
      maxScore: settings.maxScore,
      mapType: settings.mapType,
      particleEffects: settings.particleEffects,
      screenShake: settings.screenShake,
      soundEffects: settings.soundEffects
    };
  }
  
  private mapSpeedToValue(speed: string, type: 'ball' | 'paddle'): number {
    const baseSpeed = type === 'ball' ? 5 : 8;
    const multipliers = { slow: 0.7, normal: 1, fast: 1.3, extreme: 1.6 };
    return baseSpeed * (multipliers[speed as keyof typeof multipliers] || 1);
  }
  
  private mapSizeToValue(size: string): number {
    const baseSize = 8;
    const multipliers = { small: 0.7, normal: 1, large: 1.3 };
    return baseSize * (multipliers[size as keyof typeof multipliers] || 1);
  }
  
  private mapPaddleSizeToValue(size: string): number {
    const baseHeight = 80;
    const multipliers = { small: 0.7, normal: 1, large: 1.3 };
    return baseHeight * (multipliers[size as keyof typeof multipliers] || 1);
  }
}

// Game Customization Modal Component
export function createGameCustomizationModal(): HTMLElement {
  const modal = document.createElement('div');
  modal.id = 'game-customization-modal';
  modal.className = 'modal';
  modal.style.display = 'none';
  
  const customizationManager = GameCustomizationManager.getInstance();
  const currentSettings = customizationManager.getCurrentSettings();
  
  modal.innerHTML = `
    <div class="modal-content customization-modal">
      <div class="modal-header">
        <h2><i class="fas fa-cog"></i> Game Customization</h2>
        <button class="close-btn" id="close-customization">&times;</button>
      </div>
      
      <div class="customization-content">
        <!-- Game Mode Selection -->
        <div class="customization-section">
          <h3><i class="fas fa-gamepad"></i> Game Mode</h3>
          <div class="option-group">
            <label class="radio-option">
              <input type="radio" name="gameMode" value="default" ${currentSettings.gameMode === 'default' ? 'checked' : ''}>
              <span class="radio-custom"></span>
              <div class="option-info">
                <strong>Default Mode</strong>
                <p>Classic Pong experience with basic features</p>
              </div>
            </label>
            <label class="radio-option">
              <input type="radio" name="gameMode" value="custom" ${currentSettings.gameMode === 'custom' ? 'checked' : ''}>
              <span class="radio-custom"></span>
              <div class="option-info">
                <strong>Custom Mode</strong>
                <p>Full customization with power-ups, attacks, and special features</p>
              </div>
            </label>
          </div>
        </div>
        
        <!-- Theme Selection -->
        <div class="customization-section">
          <h3><i class="fas fa-palette"></i> Visual Theme</h3>
          <div class="theme-grid">
            ${['neon', 'retro', 'dark', 'space', 'classic'].map(theme => `
              <div class="theme-option ${currentSettings.theme === theme ? 'selected' : ''}" data-theme="${theme}">
                <div class="theme-preview theme-${theme}"></div>
                <span>${theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Power-ups Section -->
        <div class="customization-section" id="powerups-section">
          <h3><i class="fas fa-bolt"></i> Power-ups</h3>
          <div class="toggle-option">
            <label class="switch">
              <input type="checkbox" id="powerups-enabled" ${currentSettings.powerUpsEnabled ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span>Enable Power-ups</span>
          </div>
          
          <div class="powerups-grid" id="powerups-grid" style="display: ${currentSettings.powerUpsEnabled ? 'grid' : 'none'}">
            ${this.createPowerUpOptions(currentSettings.availablePowerUps)}
          </div>
        </div>
        
        <!-- Attacks Section -->
        <div class="customization-section" id="attacks-section">
          <h3><i class="fas fa-fist-raised"></i> Special Attacks</h3>
          <div class="toggle-option">
            <label class="switch">
              <input type="checkbox" id="attacks-enabled" ${currentSettings.attacksEnabled ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span>Enable Special Attacks</span>
          </div>
          
          <div class="attacks-grid" id="attacks-grid" style="display: ${currentSettings.attacksEnabled ? 'grid' : 'none'}">
            ${this.createAttackOptions(currentSettings.availableAttacks)}
          </div>
        </div>
        
        <!-- Game Physics -->
        <div class="customization-section">
          <h3><i class="fas fa-tachometer-alt"></i> Game Physics</h3>
          <div class="physics-grid">
            <div class="physics-option">
              <label>Ball Speed</label>
              <select id="ball-speed">
                <option value="slow" ${currentSettings.ballSpeed === 'slow' ? 'selected' : ''}>Slow</option>
                <option value="normal" ${currentSettings.ballSpeed === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="fast" ${currentSettings.ballSpeed === 'fast' ? 'selected' : ''}>Fast</option>
                <option value="extreme" ${currentSettings.ballSpeed === 'extreme' ? 'selected' : ''}>Extreme</option>
              </select>
            </div>
            
            <div class="physics-option">
              <label>Paddle Speed</label>
              <select id="paddle-speed">
                <option value="slow" ${currentSettings.paddleSpeed === 'slow' ? 'selected' : ''}>Slow</option>
                <option value="normal" ${currentSettings.paddleSpeed === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="fast" ${currentSettings.paddleSpeed === 'fast' ? 'selected' : ''}>Fast</option>
              </select>
            </div>
            
            <div class="physics-option">
              <label>Ball Size</label>
              <select id="ball-size">
                <option value="small" ${currentSettings.ballSize === 'small' ? 'selected' : ''}>Small</option>
                <option value="normal" ${currentSettings.ballSize === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="large" ${currentSettings.ballSize === 'large' ? 'selected' : ''}>Large</option>
              </select>
            </div>
            
            <div class="physics-option">
              <label>Paddle Size</label>
              <select id="paddle-size">
                <option value="small" ${currentSettings.paddleSize === 'small' ? 'selected' : ''}>Small</option>
                <option value="normal" ${currentSettings.paddleSize === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="large" ${currentSettings.paddleSize === 'large' ? 'selected' : ''}>Large</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Game Rules -->
        <div class="customization-section">
          <h3><i class="fas fa-trophy"></i> Game Rules</h3>
          <div class="rules-grid">
            <div class="rule-option">
              <label>Score to Win</label>
              <select id="max-score">
                <option value="3" ${currentSettings.maxScore === 3 ? 'selected' : ''}>3 Points</option>
                <option value="5" ${currentSettings.maxScore === 5 ? 'selected' : ''}>5 Points</option>
                <option value="7" ${currentSettings.maxScore === 7 ? 'selected' : ''}>7 Points</option>
                <option value="11" ${currentSettings.maxScore === 11 ? 'selected' : ''}>11 Points</option>
                <option value="21" ${currentSettings.maxScore === 21 ? 'selected' : ''}>21 Points</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Map/Arena -->
        <div class="customization-section">
          <h3><i class="fas fa-map"></i> Arena Type</h3>
          <div class="map-grid">
            ${['classic', 'obstacles', 'moving_walls', 'portals'].map(map => `
              <div class="map-option ${currentSettings.mapType === map ? 'selected' : ''}" data-map="${map}">
                <div class="map-preview map-${map}"></div>
                <span>${map.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Effects -->
        <div class="customization-section">
          <h3><i class="fas fa-magic"></i> Visual Effects</h3>
          <div class="effects-grid">
            <div class="toggle-option">
              <label class="switch">
                <input type="checkbox" id="particle-effects" ${currentSettings.particleEffects ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
              <span>Particle Effects</span>
            </div>
            
            <div class="toggle-option">
              <label class="switch">
                <input type="checkbox" id="screen-shake" ${currentSettings.screenShake ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
              <span>Screen Shake</span>
            </div>
            
            <div class="toggle-option">
              <label class="switch">
                <input type="checkbox" id="sound-effects" ${currentSettings.soundEffects ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
              <span>Sound Effects</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn secondary" id="reset-defaults">Reset to Default</button>
        <button class="btn primary" id="apply-settings">Apply Settings</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  setupCustomizationEventListeners(modal, customizationManager);
  
  return modal;
}

// Helper function to create power-up options
function createPowerUpOptions(selectedPowerUps: PowerUpType[]): string {
  const powerUps: { type: PowerUpType; name: string; description: string; icon: string }[] = [
    { type: 'paddle_size_boost', name: 'Paddle Boost', description: 'Increase paddle size temporarily', icon: 'fas fa-expand-arrows-alt' },
    { type: 'paddle_speed_boost', name: 'Speed Boost', description: 'Increase paddle movement speed', icon: 'fas fa-tachometer-alt' },
    { type: 'ball_speed_slow', name: 'Slow Ball', description: 'Slow down the ball', icon: 'fas fa-hourglass-half' },
    { type: 'ball_speed_fast', name: 'Fast Ball', description: 'Speed up the ball', icon: 'fas fa-rocket' },
    { type: 'shrink_opponent', name: 'Shrink Enemy', description: 'Reduce opponent paddle size', icon: 'fas fa-compress-arrows-alt' },
    { type: 'curve_ball', name: 'Curve Ball', description: 'Make the ball curve unexpectedly', icon: 'fas fa-bezier-curve' },
    { type: 'multi_ball', name: 'Multi Ball', description: 'Add extra balls to the game', icon: 'fas fa-circle' },
    { type: 'reverse_controls', name: 'Reverse Controls', description: 'Reverse opponent controls', icon: 'fas fa-exchange-alt' },
    { type: 'shield', name: 'Shield', description: 'Temporary protection from attacks', icon: 'fas fa-shield-alt' },
    { type: 'magnet', name: 'Magnet', description: 'Attract the ball to your paddle', icon: 'fas fa-magnet' },
    { type: 'freeze_opponent', name: 'Freeze', description: 'Temporarily freeze opponent', icon: 'fas fa-snowflake' },
    { type: 'invisible_ball', name: 'Invisible Ball', description: 'Make the ball temporarily invisible', icon: 'fas fa-eye-slash' }
  ];
  
  return powerUps.map(powerUp => `
    <div class="powerup-option ${selectedPowerUps.includes(powerUp.type) ? 'selected' : ''}" data-powerup="${powerUp.type}">
      <i class="${powerUp.icon}"></i>
      <h4>${powerUp.name}</h4>
      <p>${powerUp.description}</p>
    </div>
  `).join('');
}

// Helper function to create attack options
function createAttackOptions(selectedAttacks: AttackType[]): string {
  const attacks: { type: AttackType; name: string; description: string; icon: string }[] = [
    { type: 'lightning_strike', name: 'Lightning Strike', description: 'Stun opponent briefly', icon: 'fas fa-bolt' },
    { type: 'paddle_slam', name: 'Paddle Slam', description: 'Powerful hit that speeds up ball', icon: 'fas fa-fist-raised' },
    { type: 'ball_explosion', name: 'Ball Explosion', description: 'Ball explodes into multiple balls', icon: 'fas fa-bomb' },
    { type: 'screen_distortion', name: 'Screen Distortion', description: 'Distort opponent\'s view', icon: 'fas fa-wave-square' },
    { type: 'gravity_flip', name: 'Gravity Flip', description: 'Flip ball physics temporarily', icon: 'fas fa-arrows-alt-v' },
    { type: 'time_slow', name: 'Time Slow', description: 'Slow down time for opponent', icon: 'fas fa-clock' },
    { type: 'paddle_lock', name: 'Paddle Lock', description: 'Lock opponent paddle position', icon: 'fas fa-lock' },
    { type: 'ball_redirect', name: 'Ball Redirect', description: 'Redirect ball towards opponent', icon: 'fas fa-location-arrow' }
  ];
  
  return attacks.map(attack => `
    <div class="attack-option ${selectedAttacks.includes(attack.type) ? 'selected' : ''}" data-attack="${attack.type}">
      <i class="${attack.icon}"></i>
      <h4>${attack.name}</h4>
      <p>${attack.description}</p>
    </div>
  `).join('');
}

// Event listeners setup
function setupCustomizationEventListeners(modal: HTMLElement, manager: GameCustomizationManager): void {
  // Close modal
  modal.querySelector('#close-customization')?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Game mode toggle
  modal.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const isCustom = target.value === 'custom';
      
      // Show/hide custom options based on game mode
      const customSections = modal.querySelectorAll('#powerups-section, #attacks-section');
      customSections.forEach(section => {
        (section as HTMLElement).style.display = isCustom ? 'block' : 'none';
      });
    });
  });
  
  // Theme selection
  modal.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      modal.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
  
  // Map selection
  modal.querySelectorAll('.map-option').forEach(option => {
    option.addEventListener('click', () => {
      modal.querySelectorAll('.map-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
  
  // Power-ups toggle
  modal.querySelector('#powerups-enabled')?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    const grid = modal.querySelector('#powerups-grid') as HTMLElement;
    grid.style.display = target.checked ? 'grid' : 'none';
  });
  
  // Attacks toggle
  modal.querySelector('#attacks-enabled')?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    const grid = modal.querySelector('#attacks-grid') as HTMLElement;
    grid.style.display = target.checked ? 'grid' : 'none';
  });
  
  // Power-up selection
  modal.querySelectorAll('.powerup-option').forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
    });
  });
  
  // Attack selection
  modal.querySelectorAll('.attack-option').forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
    });
  });
  
  // Reset to defaults
  modal.querySelector('#reset-defaults')?.addEventListener('click', () => {
    if (confirm('Reset all settings to default? This cannot be undone.')) {
      manager.resetToDefault();
      modal.style.display = 'none';
      // Recreate modal with default settings
      const newModal = createGameCustomizationModal();
      modal.parentNode?.replaceChild(newModal, modal);
    }
  });
  
  // Apply settings
  modal.querySelector('#apply-settings')?.addEventListener('click', () => {
    applyCustomizationSettings(modal, manager);
    modal.style.display = 'none';
  });
}

// Apply settings from modal
function applyCustomizationSettings(modal: HTMLElement, manager: GameCustomizationManager): void {
  const settings: Partial<GameCustomizationOptions> = {};
  
  // Game mode
  const gameModeRadio = modal.querySelector('input[name="gameMode"]:checked') as HTMLInputElement;
  if (gameModeRadio) settings.gameMode = gameModeRadio.value as 'default' | 'custom';
  
  // Theme
  const selectedTheme = modal.querySelector('.theme-option.selected');
  if (selectedTheme) settings.theme = selectedTheme.getAttribute('data-theme') as any;
  
  // Power-ups
  const powerUpsEnabled = modal.querySelector('#powerups-enabled') as HTMLInputElement;
  settings.powerUpsEnabled = powerUpsEnabled?.checked || false;
  
  const selectedPowerUps = Array.from(modal.querySelectorAll('.powerup-option.selected'))
    .map(el => el.getAttribute('data-powerup')) as PowerUpType[];
  settings.availablePowerUps = selectedPowerUps;
  
  // Attacks
  const attacksEnabled = modal.querySelector('#attacks-enabled') as HTMLInputElement;
  settings.attacksEnabled = attacksEnabled?.checked || false;
  
  const selectedAttacks = Array.from(modal.querySelectorAll('.attack-option.selected'))
    .map(el => el.getAttribute('data-attack')) as AttackType[];
  settings.availableAttacks = selectedAttacks;
  
  // Physics
  const ballSpeed = modal.querySelector('#ball-speed') as HTMLSelectElement;
  if (ballSpeed) settings.ballSpeed = ballSpeed.value as any;
  
  const paddleSpeed = modal.querySelector('#paddle-speed') as HTMLSelectElement;
  if (paddleSpeed) settings.paddleSpeed = paddleSpeed.value as any;
  
  const ballSize = modal.querySelector('#ball-size') as HTMLSelectElement;
  if (ballSize) settings.ballSize = ballSize.value as any;
  
  const paddleSize = modal.querySelector('#paddle-size') as HTMLSelectElement;
  if (paddleSize) settings.paddleSize = paddleSize.value as any;
  
  // Rules
  const maxScore = modal.querySelector('#max-score') as HTMLSelectElement;
  if (maxScore) settings.maxScore = parseInt(maxScore.value) as any;
  
  // Map
  const selectedMap = modal.querySelector('.map-option.selected');
  if (selectedMap) settings.mapType = selectedMap.getAttribute('data-map') as any;
  
  // Effects
  const particleEffects = modal.querySelector('#particle-effects') as HTMLInputElement;
  settings.particleEffects = particleEffects?.checked || false;
  
  const screenShake = modal.querySelector('#screen-shake') as HTMLInputElement;
  settings.screenShake = screenShake?.checked || false;
  
  const soundEffects = modal.querySelector('#sound-effects') as HTMLInputElement;
  settings.soundEffects = soundEffects?.checked || false;
  
  // Update settings
  manager.updateSettings(settings);
  
  // Show confirmation
  const notification = document.createElement('div');
  notification.className = 'notification success';
  notification.innerHTML = '<i class="fas fa-check"></i> Game settings applied successfully!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Export for global access
(window as any).GameCustomizationManager = GameCustomizationManager;
(window as any).createGameCustomizationModal = createGameCustomizationModal;
