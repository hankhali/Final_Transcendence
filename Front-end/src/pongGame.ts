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
}

export interface Player {
  id: string;
  name: string;
  score: number;
  y: number;
  isAI?: boolean;
}

export interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  winner: Player | null;
  startTime: number;
  elapsedTime: number;
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
      speed: this.config.ballSpeed
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

    // Check for scoring
    this.checkScoring();

    // Check for game end
    this.checkGameEnd();
  }

  private updatePaddles(): void {
    // Player 1 controls (W/S)
    if (this.keys['w']) {
      this.player1.y -= this.config.paddleSpeed;
    }
    if (this.keys['s']) {
      this.player1.y += this.config.paddleSpeed;
    }

    // Player 2 controls (Arrow Up/Down)
    if (!this.player2.isAI) {
      if (this.keys['arrowup']) {
        this.player2.y -= this.config.paddleSpeed;
      }
      if (this.keys['arrowdown']) {
        this.player2.y += this.config.paddleSpeed;
      }
    } else {
      // AI logic for Player 2
      this.updateAI();
    }

    // Clamp paddles to canvas bounds
    this.clampPaddle(this.player1);
    this.clampPaddle(this.player2);
  }

  private updateAI(): void {
    const paddleCenter = this.player2.y + this.config.paddleHeight / 2;
    const ballY = this.ball.y;
    const aiSpeed = this.config.paddleSpeed * 0.8; // Make AI slightly slower

    if (ballY < paddleCenter - 10) {
      this.player2.y -= aiSpeed;
    } else if (ballY > paddleCenter + 10) {
      this.player2.y += aiSpeed;
    }
  }

  private clampPaddle(player: Player): void {
    player.y = Math.max(0, Math.min(player.y, this.config.canvasHeight - this.config.paddleHeight));
  }

  private updateBall(): void {
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
    const p1Left = this.config.paddleWidth;
    const p1Right = this.config.paddleWidth + this.config.paddleWidth;
    const p1Top = this.player1.y;
    const p1Bottom = this.player1.y + this.config.paddleHeight;

    if (ballLeft <= p1Right && ballRight >= p1Left && ballBottom >= p1Top && ballTop <= p1Bottom) {
      if (this.ball.velocityX < 0) { // Only bounce if moving toward paddle
        this.ball.velocityX = -this.ball.velocityX;
        this.ball.x = p1Right + this.config.ballSize / 2; // Prevent sticking
        this.addSpin();
      }
    }

    // Player 2 paddle collision
    const p2Left = this.config.canvasWidth - this.config.paddleWidth * 2;
    const p2Right = this.config.canvasWidth - this.config.paddleWidth;
    const p2Top = this.player2.y;
    const p2Bottom = this.player2.y + this.config.paddleHeight;

    if (ballLeft <= p2Right && ballRight >= p2Left && ballBottom >= p2Top && ballTop <= p2Bottom) {
      if (this.ball.velocityX > 0) { // Only bounce if moving toward paddle
        this.ball.velocityX = -this.ball.velocityX;
        this.ball.x = p2Left - this.config.ballSize / 2; // Prevent sticking
        this.addSpin();
      }
    }
  }

  private addSpin(): void {
    // Increase ball speed slightly after each paddle hit
    const speedIncrease = 1.05;
    this.ball.velocityX *= speedIncrease;
    this.ball.velocityY *= speedIncrease;

    // Add some randomness to prevent repetitive gameplay
    this.ball.velocityY += (Math.random() - 0.5) * 0.5;
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
    
    const dir = direction || (Math.random() > 0.5 ? 1 : -1);
    this.ball.velocityX = this.config.ballSpeed * dir;
    this.ball.velocityY = this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
  }

  private resetPaddles(): void {
    this.player1.y = this.config.canvasHeight / 2 - this.config.paddleHeight / 2;
    this.player2.y = this.config.canvasHeight / 2 - this.config.paddleHeight / 2;
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
    this.drawPaddle(this.config.paddleWidth, this.player1.y);
    this.drawPaddle(this.config.canvasWidth - this.config.paddleWidth * 2, this.player2.y);

    // Draw ball
    this.drawBall();

    // Draw scores
    this.drawScores();

    // Draw game state messages
    this.drawGameStateMessages();
  }

  private drawBackground(): void {
    // Premium animated neon grid background
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

  private drawPaddle(x: number, y: number): void {
  // Premium paddle: neon glow, inner shadow, and gradient
  this.ctx.save();
  this.ctx.shadowColor = '#00fff7';
  this.ctx.shadowBlur = 30;
  const gradient = this.ctx.createLinearGradient(x, y, x + this.config.paddleWidth, y + this.config.paddleHeight);
  gradient.addColorStop(0, '#00fff7');
  gradient.addColorStop(0.5, '#fff');
  gradient.addColorStop(1, '#ff00ea');
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(x, y, this.config.paddleWidth, this.config.paddleHeight);
  // Inner shadow
  this.ctx.globalAlpha = 0.3;
  this.ctx.fillStyle = '#222';
  this.ctx.fillRect(x + 2, y + 2, this.config.paddleWidth - 4, this.config.paddleHeight - 4);
  this.ctx.globalAlpha = 1;
  this.ctx.restore();
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

export function create1v1Game(canvas: HTMLCanvasElement): PongGame {
  const game = new PongGame(canvas, {
    maxScore: 5,
    ballSpeed: 5,
    paddleSpeed: 7
  });
  
  game.setPlayer2AI(false);
  return game;
}

export function createAIGame(canvas: HTMLCanvasElement, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): PongGame {
  const difficultyConfig = {
    easy: { ballSpeed: 3, paddleSpeed: 5 },
    medium: { ballSpeed: 4, paddleSpeed: 6 },
    hard: { ballSpeed: 6, paddleSpeed: 8 }
  };
  
  const game = new PongGame(canvas, {
    maxScore: 5,
    ...difficultyConfig[difficulty]
  });
  
  game.setPlayer2AI(true);
  return game;
}
