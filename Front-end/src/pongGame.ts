// Ping Pong Game Implementation
export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;
  paddleSpeed: number;
  ballSpeed: number;
  maxScore: number;
  // Customization
  theme?: 'neon' | 'retro' | 'dark' | 'space' | 'classic';
  powerUpsEnabled?: boolean;
  attacksEnabled?: boolean; // reserved for future use
  powerUpTypes?: Array<'paddle_size' | 'ball_speed' | 'slow_opponent' | 'shrink_opponent' | 'curve_ball' | 'multi_ball' | 'reverse_controls' | 'shield' | 'magnet'>;
  // Player-specific power-ups
  player1PowerUps?: { [key: string]: number }; // power-up type -> remaining uses
  player2PowerUps?: { [key: string]: number }; // power-up type -> remaining uses
}

export interface Player {
  id: string;
  name: string;
  score: number;
  y: number;
  isAI?: boolean;
  temporaryPaddleBoostUntilMs?: number;
  temporaryPaddleSlowUntilMs?: number;
  temporaryPaddleShrinkUntilMs?: number;
  temporaryReverseControlsUntilMs?: number;
  temporaryShieldUntilMs?: number;
  temporaryMagnetUntilMs?: number;
}

export interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  radius: number;
  lastHitBy?: string;
}

export interface PowerUpCollectible {
  id: string;
  type: PowerUpType;
  x: number;
  y: number;
  radius: number;
  spawnTime: number;
  duration: number; // How long it stays on field before disappearing
  collected: boolean;
  glowPhase: number; // For animation
}

export type PowerUpType = 
  | 'paddle_size_boost' | 'paddle_speed_boost' | 'ball_speed_slow' | 'ball_speed_fast'
  | 'shrink_opponent' | 'curve_ball' | 'multi_ball' | 'reverse_controls' 
  | 'shield' | 'magnet' | 'freeze_opponent' | 'invisible_ball';

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  winner: Player | null;
  startTime: number;
  elapsedTime: number;
}

interface PowerUp {
  x: number;
  y: number;
  radius: number;
  type: 'paddle_size' | 'ball_speed' | 'slow_opponent' | 'shrink_opponent' | 'curve_ball' | 'multi_ball' | 'reverse_controls' | 'shield' | 'magnet';
  active: boolean;
  collector?: 'player1' | 'player2';
}

// AI System Interfaces
interface AIGameState {
  ball: Ball;
  extraBalls: Ball[];
  player1: Player;
  player2: Player;
  powerUps: PowerUp[];
  timestamp: number;
}

interface BallPrediction {
  x: number;
  y: number;
  timeToReach: number;
  willHitPaddle: boolean;
  bounces: number;
}

// @ts-ignore
interface AIStrategy {
  mode: 'defensive' | 'aggressive' | 'balanced';
  targetY: number;
  confidence: number;
  shouldCollectPowerUp: boolean;
  targetPowerUp?: PowerUp;
}

interface AIPersonality {
  reactionDelay: number;        // 100-300ms delay
  predictionAccuracy: number;   // 0.7-0.95 (70%-95% accuracy)
  speedVariation: number;       // 0.8-1.2 speed multiplier
  aggressiveness: number;       // 0.3-0.8 (how aggressive in returns)
  powerUpPriority: number;      // 0.4-0.9 (likelihood to go for power-ups)
}

export class PongGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: GameConfig;
  private player1: Player;
  private player2: Player;
  private ball: Ball;
  private gameState: GameState;
  private keys: { [key: string]: boolean } = {};
  private animationId: number | null = null;
  private onGameEnd?: (winner: Player, gameTime: number) => void;
  private onScoreUpdate?: (player1Score: number, player2Score: number) => void;
  private powerUps: PowerUp[] = [];
  private lastPowerUpSpawnAtMs = 0;
  private nextHitCurveFor: 'player1' | 'player2' | null = null;
  private extraBalls: Ball[] = [];
  private collectedPowerUps: PowerUp[] = [];
  
  // Collectible Power-ups System - DISABLED
  // private collectiblePowerUps: PowerUpCollectible[] = [];
  // private lastCollectibleSpawnAtMs = 0;
  // private collectibleSpawnInterval = 3000;
  // private collectibleLifetime = 20000;

  // [ADDED BY HANIEH]
  public matchId?: number;
  public tournamentId?: number;

  // Advanced AI System Properties
  // @ts-ignore
  private aiGameState: AIGameState | null = null;
  // private aiLastUpdateTime = 0; // Unused
  // private aiUpdateInterval = 1000; // Unused
  private aiPersonality: AIPersonality = {
    predictionAccuracy: 0.8,
    aggressiveness: 0.5,
    powerUpPriority: 0.3,
    reactionDelay: 100,
    speedVariation: 0.9
  };
  // private aiCurrentStrategy: AIStrategy; // Unused variable
  // private aiReactionQueue: Array<{action: 'up' | 'down' | 'stop', executeAt: number}> = []; // Unused variable
  // @ts-ignore
  private aiPredictionHistory: BallPrediction[] = [];
  private aiDifficulty: 'easy' | 'medium' | 'hard' = 'medium';

  constructor(canvas: HTMLCanvasElement, config?: Partial<GameConfig>) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    // Default configuration
    this.config = {
      canvasWidth: 800,
      canvasHeight: 400,
      paddleWidth: 12,
      paddleHeight: 80,
      ballSize: 8,
      paddleSpeed: 6,
      ballSpeed: 4,
      maxScore: 5,
      theme: 'neon',
      powerUpsEnabled: true,
      attacksEnabled: false,
      powerUpTypes: ['paddle_size', 'ball_speed'],
      ...config
    };
    
    // Debug: Log final config after merge
    console.log('🎮 PongGame Constructor - Final config after merge:');
    console.log('   - ballSpeed:', this.config.ballSpeed);
    console.log('   - paddleSpeed:', this.config.paddleSpeed);

    // Set canvas size
    this.canvas.width = this.config.canvasWidth;
    this.canvas.height = this.config.canvasHeight;

    // Initialize players
    this.player1 = {
      id: 'player1',
      name: 'Player 1',
      score: 0,
      y: this.config.canvasHeight / 2 - this.config.paddleHeight / 2
    };

    this.player2 = {
      id: 'player2',
  name: (config && (config as any).gameMode === 'ai') ? 'AI Opponent' : 'Player 2',
  score: 0,
  y: this.config.canvasHeight / 2 - this.config.paddleHeight / 2,
  isAI: (config && (config as any).gameMode === 'ai') ? true : false
    };

    // Initialize ball
    this.ball = {
      x: this.config.canvasWidth / 2,
      y: this.config.canvasHeight / 2,
      velocityX: this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1),
      velocityY: this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1),
      speed: this.config.ballSpeed,
      radius: this.config.ballSize
    };

    // Initialize game state
    this.gameState = {
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      winner: null,
      startTime: 0,
      elapsedTime: 0
    };

    console.log('Game state initialized:', this.gameState);

    this.setupEventListeners();
    this.render();

    // Initialize AI personality based on difficulty
    this.initializeAIPersonality();
    // this.aiCurrentStrategy = { // This line was commented out in the original file
    //   mode: 'balanced',
    //   targetY: this.config.canvasHeight / 2,
    //   confidence: 0.5,
    //   shouldCollectPowerUp: false
    // };
  }

  // Public Methods
  public startGame(): void {
    console.log('Starting game...');
    console.log('Game state before start:', this.gameState);
    console.log('Player1:', this.player1);
    console.log('Player2:', this.player2);
    
    this.gameState.isPlaying = true;
    this.gameState.isPaused = false;
    this.gameState.isGameOver = false;
    this.gameState.startTime = Date.now();
    this.resetBall();
    this.animationId = null;
    this.gameLoop();
    
    console.log('Game started successfully');
  }

  public pauseGame(): void {
    this.gameState.isPaused = !this.gameState.isPaused;
    if (!this.gameState.isPaused) {
      this.gameLoop();
    }
  }

  public resetGame(): void {
    this.gameState.isPlaying = false;
    this.gameState.isPaused = false;
    this.gameState.isGameOver = false;
    this.gameState.winner = null;
    this.player1.score = 0;
    this.player2.score = 0;
    this.player1.temporaryPaddleBoostUntilMs = undefined;
    this.player2.temporaryPaddleBoostUntilMs = undefined;
    this.player1.temporaryPaddleSlowUntilMs = undefined;
    this.player2.temporaryPaddleSlowUntilMs = undefined;
    this.player1.temporaryPaddleShrinkUntilMs = undefined;
    this.player2.temporaryPaddleShrinkUntilMs = undefined;
    this.player1.temporaryReverseControlsUntilMs = undefined;
    this.player2.temporaryReverseControlsUntilMs = undefined;
    this.player1.temporaryShieldUntilMs = undefined;
    this.player2.temporaryShieldUntilMs = undefined;
    this.player1.temporaryMagnetUntilMs = undefined;
    this.player2.temporaryMagnetUntilMs = undefined;
    this.powerUps = [];
    this.lastPowerUpSpawnAtMs = 0;
    this.nextHitCurveFor = null;
    this.extraBalls = [];
    this.resetBall();
    this.resetPaddles();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.render();
  }

  public setPlayer2AI(isAI: boolean): void {
    console.log('Setting Player2 AI to:', isAI);
    this.player2.isAI = isAI;
    console.log('Player2 isAI after setting:', this.player2.isAI);
  }

  public setPlayerNames(player1Name: string, player2Name: string): void {
    this.player1.name = player1Name;
    this.player2.name = player2Name;
    // Force a re-render to immediately update the names on canvas
    this.render();
  }

  public onGameEndCallback(callback: (winner: Player, gameTime: number) => void): void {
    this.onGameEnd = callback;
  }

  public onScoreUpdateCallback(callback: (player1Score: number, player2Score: number) => void): void {
    this.onScoreUpdate = callback;
  }

  public updateConfig(newConfig: Partial<GameConfig>): void {
    console.log('🔧 Updating game config:', newConfig);
    Object.assign(this.config, newConfig);
    
    // Apply visual changes immediately
    if (newConfig.theme) {
      console.log('🎨 Theme changed to:', newConfig.theme);
      // The theme will be applied in the next render cycle automatically
    }
    
    console.log('✅ Game config updated:', this.config);
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public getPlayers(): { player1: Player; player2: Player } {
    return {
      player1: { ...this.player1 },
      player2: { ...this.player2 }
    };
  }

  // Private Methods
  private setupEventListeners(): void {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      this.keys[key] = true;
      // Prevent default for game control keys
      if (["arrowup", "arrowdown", "w", "s", " "].includes(key)) {
        e.preventDefault();
      }
      // Game controls
      if (key === ' ') {
        if (this.gameState.isPaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
      }
      
      // Player 1 power-up activation (A key)
      if (key === 'a') {
        if (this.gameState.isPlaying && this.config.powerUpsEnabled) {
          this.activateCollectedPowerUp('player1');
          console.log('🎮 Player 1 (A key) - activating power-up from inventory!');
        }
      }
      
      // Player 2 power-up activation (T key)
      if (key === 't') {
        if (this.gameState.isPlaying && this.config.powerUpsEnabled) {
          this.activateCollectedPowerUp('player2');
          console.log('🎮 Player 2 (T key) - activating power-up from inventory!');
        }
      }
      if (key === 'r') {
        this.resetGame();
      }
      // if (key === 'p') {
      //   // Manual spawn collectible for testing
      //   this.spawnCollectiblePowerUp();
      //   console.log('🧪 Manual collectible spawn triggered!');
      // }
      if (key === 'x') {
        // TEST: Add power-up directly to Player 1 inventory
        this.addPowerUpToInventory('paddle_size_boost', 'player1');
        console.log('🧪 TEST: Added paddle boost to Player 1 inventory!');
      }
      if (key === 'z') {
        // TEST: Add power-up directly to Player 2 inventory
        this.addPowerUpToInventory('ball_speed_fast', 'player2');
        console.log('🧪 TEST: Added ball speed boost to Player 2 inventory!');
      }
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse/Touch controls for mobile
  // Removed mouse and touch controls for player 2. Only arrow keys control player 2 now.
  }

  private gameLoop(): void {
    console.log('Game loop running - isPlaying:', this.gameState.isPlaying, 'isPaused:', this.gameState.isPaused, 'isGameOver:', this.gameState.isGameOver);
    
    if (!this.gameState.isPlaying || this.gameState.isPaused || this.gameState.isGameOver) {
      console.log('Game loop stopping because:', {
        notPlaying: !this.gameState.isPlaying,
        isPaused: this.gameState.isPaused,
        isGameOver: this.gameState.isGameOver
      });
      return;
    }

    this.update();
    this.render();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(): void {
    console.log('Update method called - game state:', this.gameState);
    
    // Update elapsed time
    this.gameState.elapsedTime = Date.now() - this.gameState.startTime;

    // Update paddles
    this.updatePaddles();
    this.updateBall();
    
    // Update power-ups
    this.updatePowerUps();
    
    // Update collectible power-ups system - DISABLED
    // this.updateCollectiblePowerUps();
    
    // Update extra balls
    this.updateExtraBalls();

    // Check for scoring
    this.checkScoring();

    // Check for game end
    this.checkGameEnd();
  }

  private getEffectivePaddleSpeed(player: Player): number {
    let base = this.config.paddleSpeed;
    
    // Debug: Log paddle speed every 100 frames
    if (Math.random() < 0.01) {
      console.log('🎮 Paddle Speed Check - config.paddleSpeed:', this.config.paddleSpeed, 'base:', base);
    }
    
    const now = Date.now();
    if (player.temporaryPaddleSlowUntilMs && now < player.temporaryPaddleSlowUntilMs) {
      base *= 0.6;
    }
    return base;
  }

  private updatePaddles(): void {
    const p1Speed = this.getEffectivePaddleSpeed(this.player1);
    const p2Speed = this.getEffectivePaddleSpeed(this.player2);
  
    // Player 1 controls (W/S)
    const p1Reverse = this.player1.temporaryReverseControlsUntilMs && Date.now() < this.player1.temporaryReverseControlsUntilMs;
    if (this.keys['w']) {
      this.player1.y -= p1Reverse ? -p1Speed : p1Speed;
    }
    if (this.keys['s']) {
      this.player1.y += p1Reverse ? -p1Speed : p1Speed;
    }
  
    // Player 2 controls (Arrow Up/Down)
    if (!this.player2.isAI) {
      console.log('Player2 is NOT AI, using manual controls');
      const p2Reverse = this.player2.temporaryReverseControlsUntilMs && Date.now() < this.player2.temporaryReverseControlsUntilMs;
      if (this.keys['arrowup']) {
        this.player2.y -= p2Reverse ? -p2Speed : p2Speed;
      }
      if (this.keys['arrowdown']) {
        this.player2.y += p2Reverse ? -p2Speed : p2Speed;
      }
    } else {
      console.log('Player2 IS AI, calling updateAI...');
      this.updateAI(p2Speed);
      
      // Handle AI power-ups
      if (this.config.powerUpsEnabled) {
        this.handleAIPowerUps();
      }
    }
  
    // Clamp paddles to canvas bounds
    this.clampPaddle(this.player1);
    this.clampPaddle(this.player2);
  }

  private updateAI(aiSpeed: number): void {
    console.log('AI updateAI called');
    
    // Simple AI: just follow the ball's Y position
    const ballY = this.ball.y;
    const paddleCenterY = this.player2.y + this.getPaddleHeight(this.player2) / 2;
    const difference = ballY - paddleCenterY;
    
    console.log('Ball Y:', ballY, 'Paddle Center Y:', paddleCenterY, 'Difference:', difference);
    
    if (Math.abs(difference) > 10) { // Dead zone to prevent jittering
      if (difference > 0) {
        console.log('AI moving DOWN');
        this.player2.y += aiSpeed;
      } else {
        console.log('AI moving UP');
        this.player2.y -= aiSpeed;
      }
    } else {
      console.log('AI staying still (in dead zone)');
    }
  }

  // private updateAIGameState(): void {
  //   // Unused function - commented out to fix TypeScript error
  // }

  // private analyzeGameSituation(): void {
  //   // Unused function
  // }

  // @ts-ignore
  private predictBallTrajectory(ball: Ball): BallPrediction {
    // Simulate ball movement with physics
    let x = ball.x;
    let y = ball.y;
    let vx = ball.velocityX;
    let vy = ball.velocityY;
    let bounces = 0;
    let timeSteps = 0;
    const maxSteps = 1000; // Prevent infinite loops
    
    const paddleX = this.config.canvasWidth - this.config.paddleWidth * 2;
    
    // Add prediction error based on AI personality
    const errorFactor = 1 - this.aiPersonality.predictionAccuracy;
    const predictionError = (Math.random() - 0.5) * errorFactor * 100;
    
    while (x > paddleX && x < this.config.canvasWidth && timeSteps < maxSteps) {
      x += vx;
      y += vy;
      timeSteps++;
      
      // Handle wall bounces
      if (y <= 0 || y >= this.config.canvasHeight) {
        vy = -vy;
        y = Math.max(0, Math.min(y, this.config.canvasHeight));
        bounces++;
      }
      
      // Stop if ball is moving away from AI
      if (vx < 0) break;
    }
    
    return {
      x: x,
      y: y + predictionError,
      timeToReach: timeSteps,
      willHitPaddle: x >= paddleX && x <= this.config.canvasWidth,
      bounces: bounces
    };
  }

  // @ts-ignore
  private determineAIStrategy(prediction: BallPrediction): void {
    const scoreGap = this.player2.score - this.player1.score;
    const ballComingTowardsAI = this.ball.velocityX > 0;
    
    // Determine mode based on game state
    let mode: 'defensive' | 'aggressive' | 'balanced' = 'balanced';
    
    if (scoreGap < -2) {
      mode = 'aggressive'; // Behind, need to be more aggressive
    } else if (scoreGap > 2) {
      mode = 'defensive'; // Ahead, play it safe
    } else if (!ballComingTowardsAI) {
      mode = 'balanced'; // Ball going away, prepare position
    }
    
    // Calculate target position
    let targetY = this.config.canvasHeight / 2; // Default center position
    
    if (prediction.willHitPaddle && ballComingTowardsAI) {
      // Position to intercept the ball
      targetY = prediction.y;
      
      // Add strategic positioning based on aggressiveness
      if (mode === 'aggressive') {
        // Try to hit at an angle
        const paddleHeight = this.getPaddleHeight(this.player2);
        const offset = (Math.random() - 0.5) * paddleHeight * this.aiPersonality.aggressiveness;
        targetY += offset;
      }
    }
    
    // Check for power-up opportunities
    // let _shouldCollectPowerUp = false; // Unused
    // let _targetPowerUp: PowerUp | undefined; // Unused
    
    if (this.config.powerUpsEnabled && this.powerUps.length > 0) {
      const nearbyPowerUp = this.findNearestPowerUp();
      if (nearbyPowerUp && Math.random() < this.aiPersonality.powerUpPriority) {
        const distanceToPlayer = Math.abs(nearbyPowerUp.x - (this.config.canvasWidth - this.config.paddleWidth));
        const distanceToBall = Math.abs(this.ball.x - (this.config.canvasWidth - this.config.paddleWidth));
        
        // Only go for power-up if it's closer than the ball or ball is far away
        if (distanceToPlayer < distanceToBall * 0.7) {
          _shouldCollectPowerUp = true;
          _targetPowerUp = nearbyPowerUp;
          targetY = nearbyPowerUp.y;
        }
      }
    }
    
    // this.aiCurrentStrategy = { // This line was commented out in the original file
    //   mode,
    //   targetY: Math.max(0, Math.min(targetY, this.config.canvasHeight)),
    //   confidence: prediction.willHitPaddle ? 0.8 : 0.4,
    //   shouldCollectPowerUp,
    //   targetPowerUp
    // };
  }

  private findNearestPowerUp(): PowerUp | undefined {
    if (!this.powerUps.length) return undefined;
    
    const aiX = this.config.canvasWidth - this.config.paddleWidth;
    let nearest: PowerUp | undefined;
    let minDistance = Infinity;
    
    for (const powerUp of this.powerUps) {
      if (!powerUp.active) continue;
      
      const distance = Math.sqrt(
        Math.pow(powerUp.x - aiX, 2) + 
        Math.pow(powerUp.y - (this.player2.y + this.getPaddleHeight(this.player2) / 2), 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearest = powerUp;
      }
    }
    
    return nearest;
  }

  // private planAIActions(prediction: BallPrediction): void {
  //   // Unused function - commented out to fix TypeScript error
  // }

  // private processAIReactionQueue(now: number): void {
  //   // Unused function
  // }

  // private executeAIKeyboardInput(aiSpeed: number): void {
  //   // Unused function
  // }

  private clampPaddle(player: Player): void {
    const paddleHeight = this.getPaddleHeight(player);
    player.y = Math.max(0, Math.min(player.y, this.config.canvasHeight - paddleHeight));
  }

  private updateBall(): void {
    // Check for magnet effect
    const p1Magnet = this.player1.temporaryMagnetUntilMs && Date.now() < this.player1.temporaryMagnetUntilMs;
    const p2Magnet = this.player2.temporaryMagnetUntilMs && Date.now() < this.player2.temporaryMagnetUntilMs;
    
    if (p1Magnet) {
      // Attract ball towards player 1 paddle
      const p1CenterY = this.player1.y + this.getPaddleHeight(this.player1) / 2;
      const magnetForce = 0.3;
      const dy = p1CenterY - this.ball.y;
      this.ball.velocityY += dy * magnetForce * 0.01;
    }
    
    if (p2Magnet) {
      // Attract ball towards player 2 paddle
      const p2CenterY = this.player2.y + this.getPaddleHeight(this.player2) / 2;
      const magnetForce = 0.3;
      const dy = p2CenterY - this.ball.y;
      this.ball.velocityY += dy * magnetForce * 0.01;
    }

    this.ball.x += this.ball.velocityX;
    this.ball.y += this.ball.velocityY;

    // Ball collision with top and bottom walls
    if (this.ball.y <= this.config.ballSize / 2 || this.ball.y >= this.config.canvasHeight - this.config.ballSize / 2) {
      this.ball.velocityY = -this.ball.velocityY;
      this.ball.y = Math.max(this.config.ballSize / 2, Math.min(this.ball.y, this.config.canvasHeight - this.config.ballSize / 2));
    }

    // Ball collision with paddles
    this.checkPaddleCollision();
  }

  private checkPaddleCollision(): void {
    const ballLeft = this.ball.x - this.config.ballSize / 2;
    const ballRight = this.ball.x + this.config.ballSize / 2;
    const ballTop = this.ball.y - this.config.ballSize / 2;
    const ballBottom = this.ball.y + this.config.ballSize / 2;

    // Player 1 paddle collision
    const p1X = this.config.paddleWidth;
    const p1Y = this.player1.y;
    const p1Height = this.getPaddleHeight(this.player1);
    const p1Right = p1X + this.config.paddleWidth;

    if (ballLeft <= p1Right && ballRight >= p1X && ballBottom >= p1Y && ballTop <= p1Y + p1Height) {
      if (this.ball.velocityX < 0) { // Only bounce if moving toward paddle
        // Check for shield protection
        const p1Shield = this.player1.temporaryShieldUntilMs && Date.now() < this.player1.temporaryShieldUntilMs;
        if (p1Shield) {
          // Shield deflects ball with extra power
          this.ball.velocityX = -this.ball.velocityX * 1.2;
          this.ball.velocityY *= 1.1;
        } else {
          this.ball.velocityX = -this.ball.velocityX;
        }
        this.ball.x = p1Right + this.config.ballSize / 2; // Prevent sticking
        this.addSpin('player1');
        this.ball.lastHitBy = 'player1';
      }
    }

    // Player 2 paddle collision
    const p2Right = this.config.canvasWidth - this.config.paddleWidth;
    const p2X = p2Right - this.config.paddleWidth;
    const p2Y = this.player2.y;
    const p2Height = this.getPaddleHeight(this.player2);

    if (ballLeft <= p2Right && ballRight >= p2X && ballBottom >= p2Y && ballTop <= p2Y + p2Height) {
      if (this.ball.velocityX > 0) { // Only bounce if moving toward paddle
        // Check for shield protection
        const p2Shield = this.player2.temporaryShieldUntilMs && Date.now() < this.player2.temporaryShieldUntilMs;
        if (p2Shield) {
          // Shield deflects ball with extra power
          this.ball.velocityX = -this.ball.velocityX * 1.2;
          this.ball.velocityY *= 1.1;
        } else {
          this.ball.velocityX = -this.ball.velocityX;
        }
        this.ball.x = p2X - this.config.ballSize / 2; // Prevent sticking
        this.addSpin('player2');
        this.ball.lastHitBy = 'player2';
      }
    }
  }

  private addSpin(hitter: 'player1' | 'player2'): void {
    // Increase ball speed slightly after each paddle hit
    const speedIncrease = 1.05;
    this.ball.velocityX *= speedIncrease;
    this.ball.velocityY *= speedIncrease;

    // Add some randomness to prevent repetitive gameplay
    let extra = (Math.random() - 0.5) * 0.5;
    if (this.nextHitCurveFor === hitter) {
      extra = (Math.random() - 0.5) * 1.5; // stronger curve for next hit
      this.nextHitCurveFor = null; // consume
    }
    this.ball.velocityY += extra;
  }

  private checkScoring(): void {
    if (this.ball.x < 0) {
      // Player 2 scores
      this.player2.score++;
      this.onScoreUpdate?.(this.player1.score, this.player2.score);
      this.resetBall(1); // Ball goes toward player 1
    } else if (this.ball.x > this.config.canvasWidth) {
      // Player 1 scores
      this.player1.score++;
      this.onScoreUpdate?.(this.player1.score, this.player2.score);
      this.resetBall(-1); // Ball goes toward player 2
    }
  }

  private checkGameEnd(): void {
    console.log('Checking game end - Player1 score:', this.player1.score, 'Player2 score:', this.player2.score, 'Max score:', this.config.maxScore);
    console.log('Game state:', this.gameState);
    
    if (this.player1.score >= this.config.maxScore || this.player2.score >= this.config.maxScore) {
      console.log('Game ending! Winner:', this.player1.score >= this.config.maxScore ? this.player1.name : this.player2.name);
      this.gameState.isGameOver = true;
      this.gameState.isPlaying = false;
      this.gameState.winner = this.player1.score >= this.config.maxScore ? this.player1 : this.player2;
      
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }

      this.onGameEnd?.(this.gameState.winner, this.gameState.elapsedTime);
    }
  }

  private resetBall(direction?: number): void {
    this.ball.x = this.config.canvasWidth / 2;
    this.ball.y = this.config.canvasHeight / 2;
    this.ball.radius = this.config.ballSize;
    
    const dir = direction || (Math.random() > 0.5 ? 1 : -1);
    this.ball.velocityX = this.config.ballSpeed * dir;
    this.ball.velocityY = this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    
    console.log('⚽ Ball Reset - config.ballSpeed:', this.config.ballSpeed, 'velocityX:', this.ball.velocityX);
  }

  private resetPaddles(): void {
    this.player1.y = this.config.canvasHeight / 2 - this.getPaddleHeight(this.player1) / 2;
    this.player2.y = this.config.canvasHeight / 2 - this.getPaddleHeight(this.player2) / 2;
  }

  private render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#080820';
    this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);

    // Draw background effects
    this.drawBackground();

    // Draw center line
    this.drawCenterLine();

    // Draw paddles
    this.drawPaddle(this.config.paddleWidth, this.player1.y, this.player1);
    this.drawPaddle(this.config.canvasWidth - this.config.paddleWidth * 2, this.player2.y, this.player2);

    // Draw ball
    this.drawBall();

    // Draw extra balls
    this.drawExtraBalls();

    // Draw power-ups - DISABLED
    // if (this.config.powerUpsEnabled) {
    //   this.drawPowerUps();
    //   this.drawCollectiblePowerUps();
    // }

    // Draw scores
    this.drawScores();

    // Power-up inventory display removed per user request

    // Power-up instructions removed

    // Draw game state messages
    this.drawGameStateMessages();
  }

  private drawBackground(): void {
    const theme = this.config.theme || 'neon';
    const time = Date.now() * 0.002;
    
    // Clear with theme-specific base color
    this.ctx.fillStyle = this.getThemeBackgroundColor(theme);
    this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
    
    // Add theme-specific effects
    this.ctx.save();
    
    switch (theme) {
      case 'retro':
        // DRAMATIC ORANGE/YELLOW RETRO THEME
        this.ctx.fillStyle = 'rgba(255, 140, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Animated orange grid
        for (let x = 0; x < this.config.canvasWidth; x += 30) {
          this.ctx.strokeStyle = `rgba(255, 165, 0, ${0.5 + 0.4 * Math.sin(time + x)})`;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.lineTo(x, this.config.canvasHeight);
          this.ctx.stroke();
        }
        for (let y = 0; y < this.config.canvasHeight; y += 30) {
          this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.5 + 0.4 * Math.cos(time + y)})`;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(0, y);
          this.ctx.lineTo(this.config.canvasWidth, y);
          this.ctx.stroke();
        }
        break;
        
      case 'dark':
        // DRAMATIC PURPLE/BLACK DARK THEME
        this.ctx.fillStyle = 'rgba(75, 0, 130, 0.4)';
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Dark purple vignette
        const darkGradient = this.ctx.createRadialGradient(
          this.config.canvasWidth / 2, this.config.canvasHeight / 2, 0,
          this.config.canvasWidth / 2, this.config.canvasHeight / 2, 
          Math.max(this.config.canvasWidth, this.config.canvasHeight) / 1.5
        );
        darkGradient.addColorStop(0, 'rgba(138, 43, 226, 0.3)');
        darkGradient.addColorStop(1, 'rgba(25, 25, 112, 0.8)');
        this.ctx.fillStyle = darkGradient;
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        break;
        
      case 'space':
        // DRAMATIC BLUE/PURPLE SPACE THEME
        this.ctx.fillStyle = 'rgba(30, 27, 75, 0.5)';
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Space gradient
        const spaceGradient = this.ctx.createLinearGradient(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        spaceGradient.addColorStop(0, 'rgba(123, 104, 238, 0.4)');
        spaceGradient.addColorStop(0.5, 'rgba(72, 61, 139, 0.5)');
        spaceGradient.addColorStop(1, 'rgba(25, 25, 112, 0.6)');
        this.ctx.fillStyle = spaceGradient;
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Animated stars
        for (let i = 0; i < 50; i++) {
          const x = (i * 137) % this.config.canvasWidth;
          const y = (i * 211) % this.config.canvasHeight;
          const alpha = 0.5 + 0.5 * Math.sin(time + i);
          this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          this.ctx.fillRect(x, y, 3, 3);
        }
        break;
        
      case 'classic':
        // DRAMATIC WHITE/GRAY CLASSIC THEME
        this.ctx.fillStyle = 'rgba(240, 248, 255, 0.95)';
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Classic checkerboard pattern
        const tileSize = 40;
        for (let x = 0; x < this.config.canvasWidth; x += tileSize) {
          for (let y = 0; y < this.config.canvasHeight; y += tileSize) {
            if ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0) {
              this.ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
              this.ctx.fillRect(x, y, tileSize, tileSize);
            }
          }
        }
        break;
        
      default: // neon
        // DRAMATIC CYAN/MAGENTA NEON THEME
        this.ctx.fillStyle = 'rgba(0, 255, 247, 0.15)';
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
        
        // Animated neon grid
        for (let x = 0; x < this.config.canvasWidth; x += 40) {
          this.ctx.strokeStyle = `rgba(0, 255, 247, ${0.4 + 0.5 * Math.sin(time + x)})`;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.lineTo(x, this.config.canvasHeight);
          this.ctx.stroke();
        }
        for (let y = 0; y < this.config.canvasHeight; y += 40) {
          this.ctx.strokeStyle = `rgba(255, 0, 234, ${0.4 + 0.5 * Math.cos(time + y)})`;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(0, y);
          this.ctx.lineTo(this.config.canvasWidth, y);
          this.ctx.stroke();
        }
        break;
    }
    
    this.ctx.restore();
  }
  
  private getThemeBackgroundColor(theme: string): string {
    switch (theme) {
      case 'retro': return '#2d1810';      // Dark brown/orange
      case 'dark': return '#0f0f23';       // Very dark purple
      case 'space': return '#1e1b4b';      // Dark blue
      case 'classic': return '#f8f9fa';    // Light gray
      default: return '#080820';           // Dark blue (neon)
    }
  }
  
  private getThemeAccentColor(theme: string): string {
    switch (theme) {
      case 'retro': return '#ff8c00';      // Bright orange
      case 'dark': return '#9932cc';       // Dark orchid
      case 'space': return '#7b68ee';      // Medium slate blue
      case 'classic': return '#696969';    // Dim gray
      default: return '#00fff7';           // Cyan (neon)
    }
  }

  private drawCenterLine(): void {
    const theme = this.config.theme || 'neon';
    this.ctx.strokeStyle = this.getThemeAccentColor(theme);
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([15, 10]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.config.canvasWidth / 2, 0);
    this.ctx.lineTo(this.config.canvasWidth / 2, this.config.canvasHeight);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private drawPaddle(x: number, y: number, player: Player): void {
  // Premium paddle: neon glow, inner shadow, and gradient
  this.ctx.save();
  this.ctx.shadowColor = '#00fff7';
  this.ctx.shadowBlur = 30;
  const paddleHeight = this.getPaddleHeight(player);
  const gradient = this.ctx.createLinearGradient(x, y, x + this.config.paddleWidth, y + paddleHeight);
  gradient.addColorStop(0, '#00fff7');
  gradient.addColorStop(0.5, '#fff');
  gradient.addColorStop(1, '#ff00ea');
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(x, y, this.config.paddleWidth, paddleHeight);
  // Inner shadow
  this.ctx.globalAlpha = 0.3;
  this.ctx.fillStyle = '#222';
  this.ctx.fillRect(x + 2, y + 2, this.config.paddleWidth - 4, paddleHeight - 4);
  this.ctx.globalAlpha = 1;
  
  // Power-up visual indicators
  const now = Date.now();
  if (player.temporaryPaddleBoostUntilMs && now < player.temporaryPaddleBoostUntilMs) {
    // Paddle size boost - green glow
    this.ctx.shadowColor = '#00ff88';
    this.ctx.shadowBlur = 20;
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(x - 2, y - 2, this.config.paddleWidth + 4, paddleHeight + 4);
  }
  
  if (player.temporaryPaddleSlowUntilMs && now < player.temporaryPaddleSlowUntilMs) {
    // Slow opponent - blue glow
    this.ctx.shadowColor = '#4444ff';
    this.ctx.shadowBlur = 15;
    this.ctx.strokeStyle = '#4444ff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x - 1, y - 1, this.config.paddleWidth + 2, paddleHeight + 2);
  }
  
  if (player.temporaryShieldUntilMs && now < player.temporaryShieldUntilMs) {
    // Shield - cyan glow
    this.ctx.shadowColor = '#00ffff';
    this.ctx.shadowBlur = 25;
    this.ctx.strokeStyle = '#00ffff';
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(x - 3, y - 3, this.config.paddleWidth + 6, paddleHeight + 6);
  }
  
  if (player.temporaryMagnetUntilMs && now < player.temporaryMagnetUntilMs) {
    // Magnet - yellow glow
    this.ctx.shadowColor = '#ffff00';
    this.ctx.shadowBlur = 20;
    this.ctx.strokeStyle = '#ffff00';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(x - 2, y - 2, this.config.paddleWidth + 4, paddleHeight + 4);
  }
  
  this.ctx.restore();
  }

  private getPaddleHeight(player: Player): number {
    const base = this.config.paddleHeight;
    const now = Date.now();
    let height = base;
    if (player.temporaryPaddleBoostUntilMs && now < player.temporaryPaddleBoostUntilMs) {
      height *= 1.5;
    }
    if (player.temporaryPaddleShrinkUntilMs && now < player.temporaryPaddleShrinkUntilMs) {
      height *= 0.7;
    }
    return height;
  }

  private drawBall(): void {
    // Premium ball: animated neon glow and gradient
    this.ctx.save();
    this.ctx.shadowColor = '#ff00ea';
    this.ctx.shadowBlur = 25 + 10 * Math.abs(Math.sin(Date.now() * 0.005));
    const gradient = this.ctx.createRadialGradient(
      this.ball.x, this.ball.y, 0,
      this.ball.x, this.ball.y, this.config.ballSize
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.4, '#ff00ea');
    gradient.addColorStop(1, '#00fff7');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.config.ballSize, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawExtraBalls(): void {
    for (const ball of this.extraBalls) {
      this.ctx.save();
      this.ctx.shadowColor = '#ff8800';
      this.ctx.shadowBlur = 15;
      const gradient = this.ctx.createRadialGradient(
        ball.x, ball.y, 0,
        ball.x, ball.y, ball.radius
      );
      gradient.addColorStop(0, '#ff8800');
      gradient.addColorStop(0.7, '#ff6600');
      gradient.addColorStop(1, '#ff4400');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  private drawPowerUps(): void {
    this.ctx.save();
    for (const pu of this.powerUps) {
      if (!pu.active) continue;
      const colors = {
        'paddle_size': '#00ff88',
        'ball_speed': '#ffaa00',
        'slow_opponent': '#ff4444',
        'shrink_opponent': '#ff66ff',
        'curve_ball': '#66aaff',
        'multi_ball': '#ff8800',
        'reverse_controls': '#ff0080',
        'shield': '#00ffff',
        'magnet': '#ffff00'
      };
      const color = colors[pu.type] || '#ffffff';
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 20;
      this.ctx.fillStyle = color.replace('#', 'rgba(') + 'ee)';
      this.ctx.beginPath();
      this.ctx.arc(pu.x, pu.y, pu.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  // DISABLED: Collectible power-ups removed
  // private drawCollectiblePowerUps(): void {
  //   for (const collectible of this.collectiblePowerUps) {
  //     if (collectible.collected) continue;
  //     
  //     this.ctx.save();
  //     
  //     // Simple green circle
  //     this.ctx.fillStyle = '#00ff00';
  //     this.ctx.beginPath();
  //     this.ctx.arc(collectible.x, collectible.y, collectible.radius, 0, Math.PI * 2);
  //     this.ctx.fill();
  //     
  //     this.ctx.restore();
  //   }
  // }

  private getPowerUpColor(type: PowerUpType): string {
    switch (type) {
      case 'paddle_size_boost': return 'rgba(0, 255, 0, 1)'; // Green
      case 'paddle_speed_boost': return 'rgba(255, 255, 0, 1)'; // Yellow
      case 'ball_speed_slow': return 'rgba(0, 100, 255, 1)'; // Blue
      case 'ball_speed_fast': return 'rgba(255, 100, 0, 1)'; // Orange
      case 'shrink_opponent': return 'rgba(255, 0, 255, 1)'; // Magenta
      case 'reverse_controls': return 'rgba(128, 0, 128, 1)'; // Purple
      case 'shield': return 'rgba(0, 255, 255, 1)'; // Cyan
      case 'magnet': return 'rgba(255, 192, 203, 1)'; // Pink
      case 'multi_ball': return 'rgba(255, 255, 255, 1)'; // White
      case 'curve_ball': return 'rgba(255, 165, 0, 1)'; // Gold
      case 'freeze_opponent': return 'rgba(173, 216, 230, 1)'; // Light Blue
      case 'invisible_ball': return 'rgba(128, 128, 128, 1)'; // Gray
      default: return 'rgba(255, 0, 0, 1)'; // Red
    }
  }

  private getPowerUpSymbol(type: PowerUpType): string {
    switch (type) {
      case 'paddle_size_boost': return '⬆';
      case 'paddle_speed_boost': return '⚡';
      case 'ball_speed_slow': return '🐌';
      case 'ball_speed_fast': return '💨';
      case 'shrink_opponent': return '⬇';
      case 'reverse_controls': return '🔄';
      case 'shield': return '🛡';
      case 'magnet': return '🧲';
      case 'multi_ball': return '⚪';
      case 'curve_ball': return '🌀';
      case 'freeze_opponent': return '❄';
      case 'invisible_ball': return '👻';
      default: return '?';
    }
  }

  private spawnPowerUps(): void {
    const now = Date.now();
    const intervalMs = 5000; // every 5s attempt spawn
    if (now - this.lastPowerUpSpawnAtMs < intervalMs) return;
    this.lastPowerUpSpawnAtMs = now;
    // 40% chance to spawn
    if (Math.random() > 0.4) return;

    const availableTypes: PowerUp['type'][] = (this.config.powerUpTypes && this.config.powerUpTypes.length > 0)
      ? (this.config.powerUpTypes as PowerUp['type'][])
      : ['paddle_size', 'ball_speed'];

    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)] as PowerUp['type'];

    const margin = 40;
    const pu: PowerUp = {
      x: margin + Math.random() * (this.config.canvasWidth - margin * 2),
      y: margin + Math.random() * (this.config.canvasHeight - margin * 2),
      radius: 10,
      type,
      active: true
    };
    this.powerUps.push(pu);
  }

  private updatePowerUps(): void {
    // Despawn inactive
    this.powerUps = this.powerUps.filter(p => p.active);
  }

  // DISABLED: Collectible power-ups removed
  // private updateCollectiblePowerUps(): void {
  //   const now = Date.now();
  //   
  //   // Spawn new collectible power-ups
  //   if (this.config.powerUpsEnabled && 
  //       now - this.lastCollectibleSpawnAtMs > this.collectibleSpawnInterval &&
  //       this.collectiblePowerUps.length < 8) {
  //     this.spawnCollectiblePowerUp();
  //     this.lastCollectibleSpawnAtMs = now;
  //   }
  //   
  //   // Update existing collectibles
  //   for (let i = this.collectiblePowerUps.length - 1; i >= 0; i--) {
  //     const collectible = this.collectiblePowerUps[i];
  //     
  //     // Update glow animation
  //     collectible.glowPhase += 0.1;
  //     
  //     // Check if expired
  //     if (now - collectible.spawnTime > this.collectibleLifetime) {
  //       this.collectiblePowerUps.splice(i, 1);
  //       continue;
  //     }
  //     
  //     // Check collision with paddles
  //     this.checkCollectibleCollision(collectible);
  //   }
  // }

  // DISABLED: Collectible power-ups removed
  // private spawnCollectiblePowerUp(): void {
  //   if (!this.config.powerUpsEnabled) return;
  //   
  //   // Choose random power-up type from enabled types or use defaults
  //   const availableTypes = (this.config.powerUpTypes as PowerUpType[]) || [
  //     'paddle_size_boost', 'paddle_speed_boost', 'ball_speed_slow', 'ball_speed_fast',
  //     'shrink_opponent', 'reverse_controls', 'shield', 'magnet', 'multi_ball', 'curve_ball'
  //   ];
  //   
  //   if (availableTypes.length === 0) return;
  //   
  //   const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  //   
  //   // Spawn anywhere on the field (avoiding paddle areas)
  //   const paddleZone = 80; // Avoid 80px from each side where paddles are
  //   const x = paddleZone + Math.random() * (this.config.canvasWidth - 2 * paddleZone);
  //   const y = 30 + Math.random() * (this.config.canvasHeight - 60); // Avoid top/bottom edges
  //   
  //   const collectible: PowerUpCollectible = {
  //     id: `collectible_${Date.now()}_${Math.random()}`,
  //     type: randomType,
  //     x,
  //     y,
  //     radius: 30,
  //     spawnTime: Date.now(),
  //     duration: this.collectibleLifetime,
  //     collected: false,
  //     glowPhase: 0
  //   };
  //   
  //   this.collectiblePowerUps.push(collectible);
  //   console.log('🎁 Spawned collectible power-up:', randomType, 'at', Math.round(x), Math.round(y));
  //   console.log('🎁 Total collectibles on field:', this.collectiblePowerUps.length);
  // }

  // DISABLED: Collectible power-ups removed
  // private checkCollectibleCollision(collectible: PowerUpCollectible): void {
  //   if (collectible.collected) return;
  //   
  //   const paddleHeight = this.getPaddleHeight(this.player1);
  //   
  //   // Player 1 paddle position (left side)
  //   const p1X = this.config.paddleWidth / 2;
  //   const p1Y = this.player1.y + paddleHeight / 2;
  //   
  //   // Player 2 paddle position (right side)  
  //   const p2X = this.config.canvasWidth - this.config.paddleWidth / 2;
  //   const p2Y = this.player2.y + paddleHeight / 2;
  //   
  //   // Debug collision detection
  //   const p1Distance = Math.sqrt(Math.pow(collectible.x - p1X, 2) + Math.pow(collectible.y - p1Y, 2));
  //   const p2Distance = Math.sqrt(Math.pow(collectible.x - p2X, 2) + Math.pow(collectible.y - p2Y, 2));
  //   const collisionRadius = collectible.radius + this.config.paddleWidth + 20; // VERY large collision area
  //   
  //   // Check collision with player 1
  //   if (p1Distance < collisionRadius) {
  //     console.log('🎯 Player 1 collected power-up!', collectible.type);
  //     console.log('   Distance:', Math.round(p1Distance), 'Required:', Math.round(collisionRadius));
  //     this.collectPowerUp(collectible, this.player1);
  //     return;
  //   }
  //   
  //   // Check collision with player 2
  //   if (p2Distance < collisionRadius) {
  //     console.log('🎯 Player 2 collected power-up!', collectible.type);
  //     console.log('   Distance:', Math.round(p2Distance), 'Required:', Math.round(collisionRadius));
  //     this.collectPowerUp(collectible, this.player2);
  //     return;
  //   }
  //   
  //   // Debug: Show distances when close
  //   if (p1Distance < collisionRadius + 20 || p2Distance < collisionRadius + 20) {
  //     console.log('🔍 Close to collectible:', collectible.type);
  //     console.log('   P1 distance:', Math.round(p1Distance), 'P2 distance:', Math.round(p2Distance));
  //     console.log('   Required distance:', Math.round(collisionRadius));
  //   }
  // }

  private isColliding(
    circleX: number, circleY: number, circleRadius: number,
    rectX: number, rectY: number, rectWidth: number, rectHeight: number
  ): boolean {
    const distX = Math.abs(circleX - rectX);
    const distY = Math.abs(circleY - rectY);
    
    if (distX > (rectWidth / 2 + circleRadius)) return false;
    if (distY > (rectHeight / 2 + circleRadius)) return false;
    
    if (distX <= (rectWidth / 2)) return true;
    if (distY <= (rectHeight / 2)) return true;
    
    const dx = distX - rectWidth / 2;
    const dy = distY - rectHeight / 2;
    return (dx * dx + dy * dy <= (circleRadius * circleRadius));
  }

  // DISABLED: Collectible power-ups removed
  // private collectPowerUp(collectible: PowerUpCollectible, player: Player): void {
  //   collectible.collected = true;
  //   
  //   // Add to inventory instead of immediate activation
  //   const playerKey = player === this.player1 ? 'player1' : 'player2';
  //   this.addPowerUpToInventory(collectible.type, playerKey);
  //   
  //   // Remove from collectibles array
  //   const index = this.collectiblePowerUps.indexOf(collectible);
  //   if (index > -1) {
  //     this.collectiblePowerUps.splice(index, 1);
  //   }
  //   
  //   console.log('🎒 Power-up added to inventory!', collectible.type, 'for', player.name);
  //   console.log('🎒 Total power-ups in inventory:', this.collectedPowerUps.length);
  // }

  private addPowerUpToInventory(type: PowerUpType, collector: 'player1' | 'player2'): void {
    // Convert PowerUpType to old PowerUp format for inventory
    const powerUpTypeMap: { [key in PowerUpType]: string } = {
      'paddle_size_boost': 'paddle_size',
      'paddle_speed_boost': 'ball_speed',
      'ball_speed_slow': 'slow_opponent',
      'ball_speed_fast': 'ball_speed',
      'shrink_opponent': 'shrink_opponent',
      'reverse_controls': 'reverse_controls',
      'shield': 'shield',
      'magnet': 'magnet',
      'multi_ball': 'multi_ball',
      'curve_ball': 'curve_ball',
      'freeze_opponent': 'slow_opponent',
      'invisible_ball': 'ball_speed'
    };

    const oldType = powerUpTypeMap[type] || 'paddle_size';
    
    const powerUp = {
      x: 0, y: 0, radius: 0, // Not needed for inventory
      type: oldType as any,
      active: true,
      collector
    };
    
    this.collectedPowerUps.push(powerUp);
    console.log('📦 Added to inventory:', oldType, 'for', collector);
  }

  private applyPowerUpEffect(type: PowerUpType, player: Player): void {
    const now = Date.now();
    const duration = 8000; // 8 seconds
    
    switch (type) {
      case 'paddle_size_boost':
        player.temporaryPaddleBoostUntilMs = now + duration;
        break;
      case 'paddle_speed_boost':
        // This will be handled in getEffectivePaddleSpeed
        break;
      case 'ball_speed_slow':
        // Slow down ball temporarily
        this.ball.velocityX *= 0.7;
        this.ball.velocityY *= 0.7;
        break;
      case 'ball_speed_fast':
        // Speed up ball temporarily
        this.ball.velocityX *= 1.3;
        this.ball.velocityY *= 1.3;
        break;
      case 'shrink_opponent':
        const opponent = player === this.player1 ? this.player2 : this.player1;
        opponent.temporaryPaddleShrinkUntilMs = now + duration;
        break;
      case 'reverse_controls':
        const opponent2 = player === this.player1 ? this.player2 : this.player1;
        opponent2.temporaryReverseControlsUntilMs = now + duration;
        break;
      case 'shield':
        player.temporaryShieldUntilMs = now + duration;
        break;
      case 'magnet':
        player.temporaryMagnetUntilMs = now + duration;
        break;
      case 'multi_ball':
        this.spawnExtraBalls(2);
        break;
      case 'curve_ball':
        this.nextHitCurveFor = player === this.player1 ? 'player1' : 'player2';
        break;
      case 'freeze_opponent':
        const opponent3 = player === this.player1 ? this.player2 : this.player1;
        opponent3.temporaryPaddleSlowUntilMs = now + duration;
        break;
      case 'invisible_ball':
        // This would need special rendering logic
        break;
    }
  }

  private spawnExtraBalls(count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * (Math.PI / 2);
      const speed = this.config.ballSpeed * 0.8;
      this.extraBalls.push({
        x: this.ball.x,
        y: this.ball.y,
        velocityX: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        velocityY: Math.sin(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        speed: speed,
        radius: this.ball.radius
      });
    }
    console.log(`🎾 Spawned ${count} extra balls!`);
  }

  private updateExtraBalls(): void {
    for (let i = this.extraBalls.length - 1; i >= 0; i--) {
      const ball = this.extraBalls[i];
      
      // Update position
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;
      
      // Bounce off top and bottom walls
      if (ball.y <= ball.radius || ball.y >= this.config.canvasHeight - ball.radius) {
        ball.velocityY = -ball.velocityY;
        ball.y = Math.max(ball.radius, Math.min(ball.y, this.config.canvasHeight - ball.radius));
      }
      
      // Check scoring (remove ball if it goes off screen)
      if (ball.x < -50 || ball.x > this.config.canvasWidth + 50) {
        this.extraBalls.splice(i, 1);
        continue;
      }
      
      // Check paddle collisions
      this.checkExtraBallCollision(ball);
    }
  }

  private checkExtraBallCollision(ball: Ball): void {
    // Player 1 paddle collision
    const p1X = this.config.paddleWidth;
    const p1Y = this.player1.y;
    const p1Height = this.getPaddleHeight(this.player1);
    const p1Right = p1X + this.config.paddleWidth;

    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    if (ballLeft <= p1Right && ballRight >= p1X && ballBottom >= p1Y && ballTop <= p1Y + p1Height) {
      if (ball.velocityX < 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = p1Right + ball.radius;
        ball.lastHitBy = 'player1';
      }
    }

    // Player 2 paddle collision
    const p2X = this.config.canvasWidth - this.config.paddleWidth;
    const p2Y = this.player2.y;
    const p2Height = this.getPaddleHeight(this.player2);
    const p2Right = this.config.canvasWidth - this.config.paddleWidth;

    if (ballLeft <= p2Right && ballRight >= p2X && ballBottom >= p2Y && ballTop <= p2Y + p2Height) {
      if (ball.velocityX > 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = p2X - ball.radius;
        ball.lastHitBy = 'player2';
      }
    }
  }

  private notify(message: string): void {
    try {
      const fn = (window as any)?.showMessage;
      if (typeof fn === 'function') fn(message, 'info');
    } catch {}
  }

  // Removed duplicate collectPowerUp method - using new collectible system

  private getPowerUpName(type: string): string {
    const names: { [key: string]: string } = {
      'paddle_size': 'Paddle Size Boost',
      'ball_speed': 'Ball Speed Boost',
      'slow_opponent': 'Slow Opponent',
      'shrink_opponent': 'Shrink Opponent',
      'curve_ball': 'Curve Ball',
      'multi_ball': 'Multi-Ball',
      'reverse_controls': 'Reverse Controls',
      'shield': 'Shield',
      'magnet': 'Magnet'
    };
    return names[type] || type;
  }

  private resumeGame(): void {
    if (this.gameState.isPaused) {
      this.gameState.isPaused = false;
      console.log('Game resumed');
    }
  }

  // pauseGame method already exists as public method

  private activateCollectedPowerUp(requestingPlayer?: 'player1' | 'player2'): void {
    if (this.collectedPowerUps.length === 0) return;

    // Find power-up for requesting player
    let powerUpIndex = this.collectedPowerUps.findIndex(pu => pu.collector === requestingPlayer);
    if (powerUpIndex === -1) return;

    const powerUp = this.collectedPowerUps.splice(powerUpIndex, 1)[0];
    const player = requestingPlayer === 'player1' ? this.player1 : this.player2;
    
    // Simple effects - just paddle size boost
    if (powerUp.type === 'paddle_size') {
      player.temporaryPaddleBoostUntilMs = Date.now() + 5000; // 5 seconds
      console.log('Paddle boost activated for', requestingPlayer);
    }
  }

  private applyPowerUp(pu: PowerUp, collector: 'player1' | 'player2'): void {
    const opponent = collector === 'player1' ? 'player2' : 'player1';
    switch (pu.type) {
      case 'paddle_size': {
        const target = collector === 'player1' ? this.player1 : this.player2;
        target.temporaryPaddleBoostUntilMs = Date.now() + 6000;
        this.notify(`🟢 Paddle Size Boost activated for ${collector === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
      case 'ball_speed': {
        const multiplier = 1.3;
        this.ball.velocityX *= multiplier;
        this.ball.velocityY *= multiplier;
        this.notify('🟠 Ball Speed Boost activated!');
        break;
      }
      case 'slow_opponent': {
        const target = opponent === 'player1' ? this.player1 : this.player2;
        target.temporaryPaddleSlowUntilMs = Date.now() + 6000;
        this.notify(`🔵 Slow Opponent applied to ${opponent === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
      case 'shrink_opponent': {
        const target = opponent === 'player1' ? this.player1 : this.player2;
        target.temporaryPaddleShrinkUntilMs = Date.now() + 6000;
        this.notify(`🟣 Shrink Opponent applied to ${opponent === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
      case 'curve_ball': {
        this.nextHitCurveFor = collector;
        this.notify('🔮 Curve Ball primed for next hit!');
        break;
      }
      case 'multi_ball': {
        // Create 2 extra balls
        for (let i = 0; i < 2; i++) {
          const angle = (Math.PI / 4) + (Math.random() - 0.5) * (Math.PI / 2);
          const speed = this.config.ballSpeed * 0.8;
          this.extraBalls.push({
            x: this.ball.x,
            y: this.ball.y,
            velocityX: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
            velocityY: Math.sin(angle) * speed,
            speed: speed,
            radius: this.config.ballSize,
            lastHitBy: collector
          });
        }
        this.notify('🟠 Multi-Ball activated! 2 extra balls spawned!');
        break;
      }
      case 'reverse_controls': {
        const target = opponent === 'player1' ? this.player1 : this.player2;
        target.temporaryReverseControlsUntilMs = Date.now() + 5000;
        this.notify(`🔄 Reverse Controls applied to ${opponent === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
      case 'shield': {
        const target = collector === 'player1' ? this.player1 : this.player2;
        target.temporaryShieldUntilMs = Date.now() + 8000;
        this.notify(`🛡️ Shield activated for ${collector === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
      case 'magnet': {
        const target = collector === 'player1' ? this.player1 : this.player2;
        target.temporaryMagnetUntilMs = Date.now() + 10000;
        this.notify(`🧲 Magnet activated for ${collector === 'player1' ? this.player1.name : this.player2.name}!`);
        break;
      }
    }
  }

  private checkPowerUpCollision(): void {
    for (const pu of this.powerUps) {
      if (!pu.active) continue;
      const dx = this.ball.x - pu.x;
      const dy = this.ball.y - pu.y;
      const distSq = dx * dx + dy * dy;
      const r = pu.radius + this.config.ballSize;
      if (distSq <= r * r) {
        // Old power-up system disabled - using new collectible system
        // const last = this.ball.lastHitBy || 'player1';
        // this.collectPowerUp(pu, last);
        pu.active = false;
      }
    }
  }

  private drawPowerUpInventory(): void {
    if (this.collectedPowerUps.length === 0) return;

    this.ctx.save();
    
    // Position at bottom-left corner, smaller size
    const x = 10;
    const y = this.config.canvasHeight - 80;
    const width = 250;
    const height = 70;
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 12px Arial';
    this.ctx.fillText(`🎒 Inventory: ${this.collectedPowerUps.length} power-ups`, x + 10, y + 20);
    
    this.ctx.font = '10px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(`${this.player1.name}: Press A | ${this.player2.name}: Press T`, x + 10, y + 40);
    
    // Show power-ups for each player
    const p1PowerUps = this.collectedPowerUps.filter(pu => pu.collector === 'player1').length;
    const p2PowerUps = this.collectedPowerUps.filter(pu => pu.collector === 'player2').length;
    
    this.ctx.fillStyle = '#ffff00';
    this.ctx.fillText(`P1: ${p1PowerUps} | P2: ${p2PowerUps}`, x + 10, y + 60);
    
    // Show next power-up icon and remaining uses
    if (this.collectedPowerUps.length > 0) {
      const next = this.collectedPowerUps[0];
      const collector = next.collector || 'player1';
      const playerPowerUps = collector === 'player1' ? this.config.player1PowerUps : this.config.player2PowerUps;
      const remaining = playerPowerUps?.[next.type] || 0;
      
      const colors = {
        'paddle_size': '#00ff88',
        'ball_speed': '#ffaa00',
        'slow_opponent': '#ff4444',
        'shrink_opponent': '#ff66ff',
        'curve_ball': '#66aaff',
        'multi_ball': '#ff8800',
        'reverse_controls': '#ff0080',
        'shield': '#00ffff',
        'magnet': '#ffff00'
      };
      this.ctx.fillStyle = colors[next.type] || '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(200, 40, 8, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Show remaining uses
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '10px Arial';
      this.ctx.fillText(`Uses: ${remaining}`, 20, 70);
    }
    
    this.ctx.restore();
  }

  private drawPowerUpInstructions(): void {
    this.ctx.save();
    
    const centerX = this.config.canvasWidth / 2;
    const centerY = this.config.canvasHeight / 2;
    
    // Simple background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(centerX - 150, centerY - 40, 300, 80);
    
    // Simple text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.player1.name}: A key | ${this.player2.name}: T key`, centerX, centerY - 10);
    this.ctx.fillText('Press SPACE to start', centerX, centerY + 20);
    
    this.ctx.restore();
  }

  private drawScores(): void {
  // Premium score: neon text and glow
  this.ctx.save();
  this.ctx.font = 'bold 54px Orbitron, Arial';
  this.ctx.textAlign = 'center';
  this.ctx.shadowColor = '#00fff7';
  this.ctx.shadowBlur = 20;
  this.ctx.fillStyle = 'rgba(0,255,255,0.95)';
  this.ctx.fillText(this.player1.score.toString(), this.config.canvasWidth / 4, 70);
  this.ctx.fillStyle = 'rgba(255,0,255,0.95)';
  this.ctx.fillText(this.player2.score.toString(), (this.config.canvasWidth * 3) / 4, 70);
  this.ctx.shadowBlur = 0;
  this.ctx.font = 'bold 18px Orbitron, Arial';
  this.ctx.fillStyle = '#fff';
  this.ctx.fillText(this.player1.name, this.config.canvasWidth / 4, 100);
  this.ctx.fillText(this.player2.name, (this.config.canvasWidth * 3) / 4, 100);
  this.ctx.restore();
  }

  private drawGameStateMessages(): void {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    
    if (!this.gameState.isPlaying && !this.gameState.isGameOver) {
      this.ctx.font = 'bold 24px Arial';
      this.ctx.fillText('Press SPACE to Start', this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 50);
      this.ctx.font = '16px Arial';
      this.ctx.fillText(`${this.player1.name}: W/S or ↑/↓ | ${this.player2.name}: I/K or Mouse`, this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 80);
      this.ctx.fillText('Press R to Reset', this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 100);
    } else if (this.gameState.isPaused) {
      this.ctx.font = 'bold 36px Arial';
      this.ctx.fillText('PAUSED', this.config.canvasWidth / 2, this.config.canvasHeight / 2);
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press SPACE to Resume', this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 40);
    } else if (this.gameState.isGameOver && this.gameState.winner) {
      this.ctx.font = 'bold 36px Arial';
      this.ctx.fillStyle = '#ffd700';
      this.ctx.fillText(`${this.gameState.winner.name} Wins!`, this.config.canvasWidth / 2, this.config.canvasHeight / 2);
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = '#ffffff';
      const gameTime = Math.floor(this.gameState.elapsedTime / 1000);
      this.ctx.fillText(`Game Time: ${gameTime}s`, this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 40);
      this.ctx.fillText('Press R to Play Again', this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 65);
    }
  }

  private handleAIPowerUps(): void {
    // Auto-collect power-ups when AI paddle touches them
    for (const pu of this.powerUps) {
      if (!pu.active) continue;
      
      const aiX = this.config.canvasWidth - this.config.paddleWidth;
      const aiY = this.player2.y;
      const aiHeight = this.getPaddleHeight(this.player2);
      
      const distance = Math.sqrt(
        Math.pow(pu.x - aiX, 2) + 
        Math.pow(pu.y - (aiY + aiHeight / 2), 2)
      );
      
      if (distance < pu.radius + this.config.paddleWidth / 2) {
        // Old power-up system disabled - using new collectible system
        // this.collectPowerUp(pu, 'player2');
        pu.active = false;
      }
    }
    
    // Strategically use power-ups
    if (this.collectedPowerUps.length > 0 && Math.random() < 0.3) {
      // 30% chance per frame to use power-up when available
      const powerUp = this.collectedPowerUps.find(pu => pu.collector === 'player2');
      if (powerUp) {
        this.activateAIPowerUp();
      }
    }
  }

  private activateAIPowerUp(): void {
    // AI logic for power-up activation
    const aiPowerUps = this.collectedPowerUps.filter(pu => pu.collector === 'player2');
    if (aiPowerUps.length === 0) return;
    
    // Choose power-up based on strategy
    const powerUp = aiPowerUps[0]; // Use first available for simplicity
    const playerPowerUps = this.config.player2PowerUps;
    
    if (playerPowerUps && playerPowerUps[powerUp.type] && playerPowerUps[powerUp.type] > 0) {
      playerPowerUps[powerUp.type]--;
      this.applyPowerUp(powerUp, 'player2');
      
      // Remove from collected power-ups
      const index = this.collectedPowerUps.indexOf(powerUp);
      if (index > -1) {
        this.collectedPowerUps.splice(index, 1);
      }
    }
  }

  private initializeAIPersonality(): void {
    const personalities = {
      easy: {
        reactionDelay: 250,
        predictionAccuracy: 0.75,
        speedVariation: 0.85,
        aggressiveness: 0.4,
        powerUpPriority: 0.5
      },
      medium: {
        reactionDelay: 180,
        predictionAccuracy: 0.85,
        speedVariation: 0.95,
        aggressiveness: 0.6,
        powerUpPriority: 0.7
      },
      hard: {
        reactionDelay: 120,
        predictionAccuracy: 0.92,
        speedVariation: 1.1,
        aggressiveness: 0.8,
        powerUpPriority: 0.85
      }
    };
    
    this.aiPersonality = personalities[this.aiDifficulty];
  }

  public setAIDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.aiDifficulty = difficulty;
    this.initializeAIPersonality();
  }

  // Cleanup method
  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Remove event listeners (if needed for cleanup)
    // Note: In a real implementation, you might want to store listener references
    // for proper cleanup
  }
}

// Game Factory Functions
export function createPongGame(
  canvas: HTMLCanvasElement,
  config?: Partial<GameConfig>
): PongGame {
  return new PongGame(canvas, config);
}

export function create1v1Game(canvas: HTMLCanvasElement, overrides?: Partial<GameConfig>): PongGame {
  // Get global customization settings but exclude game rules
  const globalSettings = (window as any).gameCustomizationSettings || {};
  const { maxScore: _, ...visualSettings } = globalSettings; // Exclude maxScore from global settings
  
  const game = new PongGame(canvas, {
    maxScore: 5, // Always use 5 for 1v1 games
    ballSpeed: 5,
    paddleSpeed: 7,
    ...visualSettings, // Only apply visual customizations
    ...overrides // Allow explicit overrides
  });
  
  game.setPlayer2AI(false);
  
  // Store reference for real-time updates
  (window as any).currentGame = game;
  
  console.log('🎮 Created 1v1 game with maxScore: 5, visual settings:', visualSettings);
  
  return game;
}

export function createAIGame(canvas: HTMLCanvasElement, difficulty: 'easy' | 'medium' | 'hard' = 'medium', overrides?: Partial<GameConfig>): PongGame {
  const difficultyConfig = {
    easy: { ballSpeed: 2, paddleSpeed: 4 },
    medium: { ballSpeed: 5, paddleSpeed: 7 },
    hard: { ballSpeed: 8, paddleSpeed: 10 }
  } as const;
  
  // Get global customization settings but exclude game rules and physics that affect difficulty
  const globalSettings = (window as any).gameCustomizationSettings || {};
  const { maxScore: _, ballSpeed: __, paddleSpeed: ___, ...visualSettings } = globalSettings; // Exclude game rules and physics
  
  console.log('🔍 DEBUG - Global settings:', globalSettings);
  console.log('🔍 DEBUG - Visual settings after exclusion:', visualSettings);
  console.log('🔍 DEBUG - Difficulty config:', difficultyConfig[difficulty]);
  console.log('🔍 DEBUG - Overrides parameter:', overrides);
  
  const finalConfig = {
    maxScore: 5, // Always use 5 for AI games
    ...visualSettings, // Apply visual customizations first
    ...difficultyConfig[difficulty], // Then apply difficulty settings (higher priority)
    ...overrides // Allow explicit overrides (highest priority)
  };
  
  console.log('🔍 DEBUG - Final config being passed to constructor:', finalConfig);
  
  const game = new PongGame(canvas, finalConfig);
  
  // Set AI after game creation
  game.setPlayer2AI(true);
  game.setAIDifficulty(difficulty);
  game.setPlayerNames('Player 1', 'AI Opponent');
  
  console.log('🤖 AI Game created with difficulty:', difficulty);
  console.log('🤖 Difficulty config applied:', difficultyConfig[difficulty]);
  console.log('🤖 Player2 isAI:', game.getPlayers().player2.isAI);
  
  // Force log the actual config to verify
  console.log('🤖 ACTUAL CONFIG CHECK:');
  console.log('   - Ball Speed should be:', difficultyConfig[difficulty].ballSpeed);
  console.log('   - Paddle Speed should be:', difficultyConfig[difficulty].paddleSpeed);
  
  return game;
}
