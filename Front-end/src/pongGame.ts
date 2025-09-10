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
  theme?: 'neon' | 'retro' | 'dark';
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
  lastHitBy?: 'player1' | 'player2';
}

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
      powerUpsEnabled: false,
      attacksEnabled: false,
      powerUpTypes: ['paddle_size', 'ball_speed'],
      ...config
    };

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
      name: 'Player 2',
      score: 0,
      y: this.config.canvasHeight / 2 - this.config.paddleHeight / 2,
      isAI: true
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

    this.setupEventListeners();
    this.render();
  }

  // Public Methods
  public startGame(): void {
    this.gameState.isPlaying = true;
    this.gameState.isPaused = false;
    this.gameState.isGameOver = false;
    this.gameState.startTime = Date.now();
    this.resetBall();
    this.animationId = null;
    this.gameLoop();
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
    this.player2.isAI = isAI;
  }

  public setPlayerNames(player1Name: string, player2Name: string): void {
    this.player1.name = player1Name;
    this.player2.name = player2Name;
  }

  public onGameEndCallback(callback: (winner: Player, gameTime: number) => void): void {
    this.onGameEnd = callback;
  }

  public onScoreUpdateCallback(callback: (player1Score: number, player2Score: number) => void): void {
    this.onScoreUpdate = callback;
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
        if (!this.gameState.isPlaying) {
          this.startGame();
        } else if (this.gameState.isPlaying && this.config.powerUpsEnabled) {
          // Activate collected power-up
          this.activateCollectedPowerUp();
        } else {
          this.pauseGame();
        }
      }
      if (key === 'r') {
        this.resetGame();
      }
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse/Touch controls for mobile
  // Removed mouse and touch controls for player 2. Only arrow keys control player 2 now.
  }

  private gameLoop(): void {
    if (!this.gameState.isPlaying || this.gameState.isPaused || this.gameState.isGameOver) {
      return;
    }

    this.update();
    this.render();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(): void {
    // Update elapsed time
    this.gameState.elapsedTime = Date.now() - this.gameState.startTime;

    // Update paddles
    this.updatePaddles();

    // Update ball
    this.updateBall();

    // Power-ups
    if (this.config.powerUpsEnabled) {
      this.spawnPowerUps();
      this.updatePowerUps();
      this.checkPowerUpCollision();
    }
    
    // Update extra balls
    this.updateExtraBalls();

    // Check for scoring
    this.checkScoring();

    // Check for game end
    this.checkGameEnd();
  }

  private getEffectivePaddleSpeed(player: Player): number {
    let base = this.config.paddleSpeed;
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
      const p2Reverse = this.player2.temporaryReverseControlsUntilMs && Date.now() < this.player2.temporaryReverseControlsUntilMs;
      if (this.keys['arrowup']) {
        this.player2.y -= p2Reverse ? -p2Speed : p2Speed;
      }
      if (this.keys['arrowdown']) {
        this.player2.y += p2Reverse ? -p2Speed : p2Speed;
      }
    } else {
      // AI logic for Player 2
      this.updateAI(p2Speed);
    }

    // Clamp paddles to canvas bounds
    this.clampPaddle(this.player1);
    this.clampPaddle(this.player2);
  }

  private updateAI(aiSpeed: number): void {
    const paddleCenter = this.player2.y + this.getPaddleHeight(this.player2) / 2;
    const ballY = this.ball.y;

    if (ballY < paddleCenter - 10) {
      this.player2.y -= aiSpeed * 0.8; // Make AI slightly slower
    } else if (ballY > paddleCenter + 10) {
      this.player2.y += aiSpeed * 0.8;
    }
  }

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
    if (this.player1.score >= this.config.maxScore || this.player2.score >= this.config.maxScore) {
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

    // Draw power-ups
    if (this.config.powerUpsEnabled) {
      this.drawPowerUps();
    }

    // Draw scores
    this.drawScores();

    // Draw power-up inventory
    if (this.config.powerUpsEnabled) {
      this.drawPowerUpInventory();
    }

    // Draw game state messages
    this.drawGameStateMessages();
  }

  private drawBackground(): void {
    const theme = this.config.theme || 'neon';
    if (theme === 'retro') {
      // Retro grid with warm colors
      const time = Date.now() * 0.002;
      this.ctx.save();
      for (let x = 0; x < this.config.canvasWidth; x += 40) {
        this.ctx.strokeStyle = `rgba(255, 165, 0, ${0.12 + 0.08 * Math.sin(time + x)})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.config.canvasHeight);
        this.ctx.stroke();
      }
      for (let y = 0; y < this.config.canvasHeight; y += 40) {
        this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.12 + 0.08 * Math.cos(time + y)})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.config.canvasWidth, y);
        this.ctx.stroke();
      }
      this.ctx.restore();
      return;
    }

    if (theme === 'dark') {
      // Subtle dark vignette
      const gradient = this.ctx.createRadialGradient(
        this.config.canvasWidth / 2,
        this.config.canvasHeight / 2,
        0,
        this.config.canvasWidth / 2,
        this.config.canvasHeight / 2,
        Math.max(this.config.canvasWidth, this.config.canvasHeight) / 1.2
      );
      gradient.addColorStop(0, '#0b0b17');
      gradient.addColorStop(1, '#000000');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
      return;
    }

    // Default neon
    const time = Date.now() * 0.002;
    this.ctx.save();
    for (let x = 0; x < this.config.canvasWidth; x += 40) {
      this.ctx.strokeStyle = `rgba(0, 230, 255, ${0.12 + 0.08 * Math.sin(time + x)})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.config.canvasHeight);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.config.canvasHeight; y += 40) {
      this.ctx.strokeStyle = `rgba(255, 0, 255, ${0.12 + 0.08 * Math.cos(time + y)})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.config.canvasWidth, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  private drawCenterLine(): void {
    this.ctx.strokeStyle = '#00e6ff';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([10, 10]);
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

  private collectPowerUp(pu: PowerUp, collector: 'player1' | 'player2'): void {
    // Add to collected power-ups for manual activation
    this.collectedPowerUps.push({ ...pu, collector });
    this.notify(`⚡ ${this.getPowerUpName(pu.type)} collected! Press SPACEBAR to activate!`);
  }

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

  private activateCollectedPowerUp(): void {
    if (this.collectedPowerUps.length === 0) {
      this.notify('❌ No power-ups available! Collect some first.');
      return;
    }

    const powerUp = this.collectedPowerUps.shift()!;
    const collector = powerUp.collector || 'player1';
    
    // Check if player has this power-up and has uses remaining
    const playerPowerUps = collector === 'player1' ? this.config.player1PowerUps : this.config.player2PowerUps;
    if (!playerPowerUps || !playerPowerUps[powerUp.type] || playerPowerUps[powerUp.type] <= 0) {
      this.notify(`❌ ${collector === 'player1' ? 'Player 1' : 'Player 2'} doesn't have ${this.getPowerUpName(powerUp.type)} available!`);
      return;
    }

    // Decrease usage count
    playerPowerUps[powerUp.type]--;
    this.applyPowerUp(powerUp, collector);
    
    // Show remaining uses
    const remaining = playerPowerUps[powerUp.type];
    this.notify(`⚡ ${this.getPowerUpName(powerUp.type)} activated! (${remaining} uses remaining)`);
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
        // Collect power-up instead of immediately applying
        const last = this.ball.lastHitBy || 'player1';
        this.collectPowerUp(pu, last);
        pu.active = false;
      }
    }
  }

  private drawPowerUpInventory(): void {
    if (this.collectedPowerUps.length === 0) return;

    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(10, 10, 250, 80);
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(10, 10, 250, 80);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 14px Arial';
    this.ctx.fillText('Power-ups Ready:', 20, 30);
    
    this.ctx.font = '12px Arial';
    this.ctx.fillText(`Press SPACEBAR to activate (${this.collectedPowerUps.length})`, 20, 50);
    
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
      this.ctx.fillText('Player 1: W/S or ↑/↓ | Player 2: I/K or Mouse', this.config.canvasWidth / 2, this.config.canvasHeight / 2 + 80);
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
  const game = new PongGame(canvas, {
    maxScore: 5,
    ballSpeed: 5,
    paddleSpeed: 7,
    ...overrides
  });
  
  game.setPlayer2AI(false);
  return game;
}

export function createAIGame(canvas: HTMLCanvasElement, difficulty: 'easy' | 'medium' | 'hard' = 'medium', overrides?: Partial<GameConfig>): PongGame {
  const difficultyConfig = {
    easy: { ballSpeed: 3, paddleSpeed: 5 },
    medium: { ballSpeed: 4, paddleSpeed: 6 },
    hard: { ballSpeed: 6, paddleSpeed: 8 }
  } as const;
  
  const game = new PongGame(canvas, {
    maxScore: 5,
    ...difficultyConfig[difficulty],
    ...overrides
  });
  
  game.setPlayer2AI(true);
  return game;
}
