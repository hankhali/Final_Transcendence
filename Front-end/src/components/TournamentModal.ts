// Tournament Bracket Modal for 4-player knockout
// This is a simple modal that collects 4 player names and displays a bracket

export function showTournamentBracketModal() {
  // Remove any existing modal
  let oldModal = document.getElementById('tournament-bracket-modal');
  if (oldModal) oldModal.remove();

  // Modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'tournament-bracket-modal';
  overlay.className = 'modal-overlay';

  // Modal content
  const modal = document.createElement('div');
  modal.className = 'tournament-container';
  modal.innerHTML = `
    <button class="close-btn">×</button>
    <div class="bracket-preview">
      <svg viewBox="0 0 100 100">
        <path d="M20 20 L40 20 L40 35 L60 35 M40 35 L40 50 L20 50 M20 70 L40 70 L40 65 L60 65 M40 65 L40 80 L20 80 M60 35 L60 50 L80 50 M60 65 L60 50"/>
      </svg>
    </div>
    <h1 class="title">TOURNAMENT</h1>
    <p class="subtitle">4-PLAYER BRACKET SETUP</p>
    <div class="players-grid">
      <div class="player-slot">
        <span class="player-number">P1</span>
        <input type="text" class="player-input" placeholder="Player 1" maxlength="20">
      </div>
      <div class="player-slot">
        <span class="player-number">P2</span>
        <input type="text" class="player-input" placeholder="Player 2" maxlength="20">
      </div>
      <div class="player-slot">
        <span class="player-number">P3</span>
        <input type="text" class="player-input" placeholder="Player 3" maxlength="20">
      </div>
      <div class="player-slot">
        <span class="player-number">P4</span>
        <input type="text" class="player-input" placeholder="Player 4" maxlength="20">
      </div>
    </div>
    <div class="vs-indicator">VS</div>
    <button class="start-button" id="startBtn">⚡ Generate Bracket ⚡</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Add styles (only once)
  if (!document.getElementById('tournament-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'tournament-modal-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      .tournament-container { font-family: 'JetBrains Mono', monospace; background: rgba(16, 16, 24, 0.97); border: 2px solid rgba(255, 215, 0, 0.2); border-radius: 20px; padding: 40px; max-width: 600px; width: 100%; position: relative; backdrop-filter: blur(10px); box-shadow: 0 0 40px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.1); animation: slideIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
      .close-btn { position: absolute; top: 15px; right: 20px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 28px; cursor: pointer; transition: all 0.2s; font-family: 'JetBrains Mono', monospace; }
      .close-btn:hover { color: #ff6b6b; transform: rotate(90deg); }
      .title { color: #ffd700; font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 10px; text-shadow: 0 0 20px rgba(255,215,0,0.3); letter-spacing: 2px; }
      .subtitle { color: rgba(255,255,255,0.6); text-align: center; margin-bottom: 40px; font-size: 14px; letter-spacing: 1px; }
      .players-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px; }
      .player-slot { position: relative; background: linear-gradient(145deg, rgba(30,30,45,0.8), rgba(20,20,35,0.9)); border: 2px solid rgba(100,100,150,0.3); border-radius: 16px; padding: 25px 20px; transition: all 0.3s; min-height: 120px; display: flex; flex-direction: column; justify-content: center; opacity: 0; transform: translateY(20px); animation: fadeInUp 0.5s ease-out forwards; }
      .player-slot:nth-child(1) { animation-delay: 0.1s; }
      .player-slot:nth-child(2) { animation-delay: 0.2s; }
      .player-slot:nth-child(3) { animation-delay: 0.3s; }
      .player-slot:nth-child(4) { animation-delay: 0.4s; }
      .player-slot.filled { border-color: rgba(34,197,94,0.6); background: linear-gradient(145deg, rgba(34,197,94,0.1), rgba(20,30,25,0.9)); }
      .player-number { position: absolute; top: -12px; left: 20px; background: linear-gradient(135deg, #ffd700, #ffed4e); color: #1a1a2e; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 20px; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(255,215,0,0.3); }
      .player-input { background: transparent; border: none; color: #fff; font-size: 18px; font-weight: 600; font-family: 'JetBrains Mono', monospace; outline: none; width: 100%; text-align: center; letter-spacing: 1px; }
      .player-input::placeholder { color: rgba(255,255,255,0.3); font-weight: 400; }
      .vs-indicator { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(255,215,0,0.1); color: #ffd700; font-size: 16px; font-weight: 700; padding: 8px 16px; border-radius: 25px; border: 2px solid rgba(255,215,0,0.3); pointer-events: none; z-index: 10; backdrop-filter: blur(5px); }
      .start-button { width: 100%; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffa500 100%); border: none; border-radius: 16px; padding: 20px; color: #1a1a2e; font-size: 18px; font-weight: 700; font-family: 'JetBrains Mono', monospace; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 2px; position: relative; overflow: hidden; box-shadow: 0 8px 25px rgba(255,215,0,0.3); }
      .start-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transition: left 0.5s; }
      .start-button:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(255,215,0,0.4); }
      .start-button:hover::before { left: 100%; }
      .start-button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; background: linear-gradient(135deg, #666 0%, #888 50%, #666 100%); }
      .start-button:disabled:hover { transform: none; box-shadow: 0 8px 25px rgba(255,215,0,0.3); }
      .bracket-preview { position: absolute; top: -10px; right: -10px; width: 80px; height: 80px; opacity: 0.1; pointer-events: none; }
      .bracket-preview svg { width: 100%; height: 100%; stroke: #ffd700; fill: none; stroke-width: 2; }
      @media (max-width: 640px) { .tournament-container { padding: 24px; margin: 16px; } .players-grid { gap: 20px; } .player-slot { padding: 20px 15px; min-height: 100px; } .title { font-size: 26px; } .player-input { font-size: 16px; } }
      @media (max-width: 480px) { .players-grid { grid-template-columns: 1fr; gap: 15px; } .vs-indicator { display: none; } }
      @keyframes slideIn { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      @keyframes slideOut { to { opacity: 0; transform: translateY(-30px) scale(0.9); } }
    `;
    document.head.appendChild(style);
  }

  // JS logic for modal
  const inputs = modal.querySelectorAll('.player-input') as NodeListOf<HTMLInputElement>;
  const startBtn = modal.querySelector('#startBtn') as HTMLButtonElement;
  const slots = modal.querySelectorAll('.player-slot');
  function updateSlotState(input: HTMLInputElement, slot: Element) {
    if (input.value.trim()) {
      slot.classList.add('filled');
    } else {
      slot.classList.remove('filled');
    }
  }
  function checkAllInputs() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    startBtn.disabled = !allFilled;
    if (allFilled) {
      startBtn.innerHTML = '🏆 START TOURNAMENT 🏆';
    } else {
      startBtn.innerHTML = '⚡ GENERATE BRACKET ⚡';
    }
  }
  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      updateSlotState(input, slots[index]);
      checkAllInputs();
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        } else if (!startBtn.disabled) {
          startTournament();
        }
      }
    });
  });
  function startTournament() {
    if (startBtn.disabled) return;
    const players = Array.from(inputs).map(input => input.value.trim());
    startBtn.innerHTML = '🔥 CREATING BRACKET... 🔥';
    startBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)';
    setTimeout(() => {
      overlay.remove();
      showBracket(players);
      startBtn.innerHTML = '🏆 START TOURNAMENT 🏆';
      startBtn.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffa500 100%)';
    }, 1200);
  }
  startBtn.addEventListener('click', startTournament);
  checkAllInputs();
  (inputs[0] as HTMLInputElement).focus();
  // Close button
  modal.querySelector('.close-btn')?.addEventListener('click', () => {
    modal.style.animation = 'slideOut 0.4s ease-in';
    setTimeout(() => overlay.remove(), 400);
  });
}

function showBracket(players: string[]) {
  // Remove any existing bracket
  let oldBracket = document.getElementById('tournament-bracket-ui');
  if (oldBracket) oldBracket.remove();

  // Bracket container
  const bracket = document.createElement('div');
  bracket.id = 'tournament-bracket-ui';
  bracket.innerHTML = `
    <div class="tournament-container">
      <div class="tournament-header">
        <h1 class="tournament-title"><span class="trophy">🏆</span> TOURNAMENT BRACKET</h1>
        <p class="tournament-subtitle">✨ 4-Player Single Elimination Championship ✨</p>
      </div>
      <div class="bracket-container">
        <div class="semifinals-column">
          <div class="match" data-match="1">
            <div class="match-header">🥊 Match 1 - Semifinal</div>
            <div class="match-players">
              <div class="player" data-player="${players[0]}">${players[0]}</div>
              <div class="vs-divider">VS</div>
              <div class="player" data-player="${players[1]}">${players[1]}</div>
            </div>
            <div class="start-match-btn-container">
              <button class="btn btn-primary start-match-btn" data-match="1">Start Match</button>
            </div>
          </div>
          <div class="match" data-match="2">
            <div class="match-header">🥊 Match 2 - Semifinal</div>
            <div class="match-players">
              <div class="player" data-player="${players[2]}">${players[2]}</div>
              <div class="vs-divider">VS</div>
              <div class="player" data-player="${players[3]}">${players[3]}</div>
            </div>
            <div class="start-match-btn-container">
              <button class="btn btn-primary start-match-btn" data-match="2">Start Match</button>
            </div>
          </div>
        </div>
        <div class="bracket-lines">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="connection-line" id="line1" d="M 25 25 L 50 25 L 50 50 L 75 50" />
            <path class="connection-line" id="line2" d="M 25 75 L 50 75 L 50 50 L 75 50" />
          </svg>
        </div>
        <div class="final-column">
          <div class="match final-match" data-match="final">
            <div class="match-header">🏆 CHAMPIONSHIP FINAL 🏆</div>
            <div class="match-players">
              <div class="player placeholder" data-from="match1">Winner of Match 1</div>
              <div class="vs-divider">VS</div>
              <div class="player placeholder" data-from="match2">Winner of Match 2</div>
            </div>
          </div>
        </div>
      </div>
      <!-- controls removed -->
    </div>
  `;
  // Add start match button logic
  const startBtns = bracket.querySelectorAll('.start-match-btn');
  startBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const matchNum = (btn as HTMLElement).getAttribute('data-match');
      // Get the two player names for this match
      let playerA = '', playerB = '';
      if (matchNum === '1') {
        playerA = players[0];
        playerB = players[1];
      } else if (matchNum === '2') {
        playerA = players[2];
        playerB = players[3];
      }
      // Call your real game logic here
      startGame(playerA, playerB, matchNum);
    });
  });

  // Real game integration stub
  function startGame(playerA: string, playerB: string, matchNum: string | null) {
    // Replace this with your actual game start logic (e.g., navigation, socket emit, etc.)
    alert(`Starting real game for Match ${matchNum}: ${playerA} vs ${playerB}`);
    // Example: window.location.href = `/game?playerA=${encodeURIComponent(playerA)}&playerB=${encodeURIComponent(playerB)}`;
  }

  // Add styles (only once)
  if (!document.getElementById('tournament-bracket-styles')) {
    const style = document.createElement('style');
    style.id = 'tournament-bracket-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      .tournament-container { font-family: 'Inter', sans-serif; background: none; max-width: 1000px; width: 100%; color: white; }
      .tournament-header { text-align: center; margin-bottom: 60px; }
      .tournament-title { font-size: 42px; font-weight: 700; background: linear-gradient(135deg, #00d4ff, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
      .tournament-subtitle { font-size: 16px; color: rgba(255,255,255,0.6); font-weight: 500; }
      .bracket-container { display: flex; align-items: center; justify-content: center; gap: 100px; position: relative; min-height: 500px; }
      .semifinals-column { display: flex; flex-direction: column; gap: 60px; }
      .final-column { display: flex; align-items: center; }
      .match { background: rgba(30,41,59,0.9); border: 2px solid rgba(59,130,246,0.4); border-radius: 16px; backdrop-filter: blur(10px); transition: all 0.3s; overflow: hidden; width: 280px; animation: slideIn 0.7s ease-out forwards; opacity: 0; transform: translateY(40px); }
      .match:hover { border-color: rgba(0,212,255,0.7); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,212,255,0.2); }
      .match-header { background: linear-gradient(135deg, rgba(59,130,246,0.8), rgba(147,51,234,0.8)); padding: 14px 20px; text-align: center; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; }
      .match-players { padding: 24px; }
      .player { display: flex; align-items: center; justify-content: center; padding: 18px 20px; background: rgba(15,23,42,0.7); border: 2px solid rgba(71,85,105,0.4); border-radius: 12px; margin-bottom: 14px; font-weight: 600; font-size: 16px; transition: all 0.3s; cursor: pointer; min-height: 65px; position: relative; }
      .player:last-child { margin-bottom: 0; }
      .player:hover { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.6); transform: translateX(8px); }
      .player.winner { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.7); color: #10b981; transform: translateX(8px); }
      .player.winner::after { content: '✓'; position: absolute; right: 15px; font-size: 20px; color: #10b981; }
      .player.placeholder { color: rgba(255,255,255,0.4); font-style: italic; cursor: default; border-style: dashed; }
      .player.placeholder:hover { background: rgba(15,23,42,0.7); border-color: rgba(71,85,105,0.4); transform: none; }
      .vs-divider { text-align: center; font-weight: 700; color: rgba(147,51,234,0.9); font-size: 14px; margin: 12px 0; letter-spacing: 2px; }
      .match.final-match { border-color: rgba(255,215,0,0.7); background: rgba(30,41,59,0.95); width: 320px; }
      .match.final-match:hover { border-color: rgba(255,215,0,0.9); box-shadow: 0 15px 30px rgba(255,215,0,0.3); }
      .match.final-match .match-header { background: linear-gradient(135deg, rgba(255,215,0,0.9), rgba(245,158,11,0.9)); color: #1a1a2e; font-size: 14px; }
      .bracket-lines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; }
      .bracket-lines svg { width: 100%; height: 100%; }
      .connection-line { stroke: rgba(59,130,246,0.5); stroke-width: 3; fill: none; transition: all 0.3s; }
      .connection-line.active { stroke: rgba(0,212,255,0.9); stroke-width: 4; filter: drop-shadow(0 0 8px rgba(0,212,255,0.4)); }
      .controls { text-align: center; margin-top: 50px; display: flex; gap: 20px; justify-content: center; }
      .btn { padding: 14px 28px; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
      .btn-primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(59,130,246,0.3); }
      .btn-secondary { background: rgba(71,85,105,0.7); color: white; border: 2px solid rgba(148,163,184,0.4); }
      .btn-secondary:hover { background: rgba(71,85,105,0.9); transform: translateY(-2px); }
      @media (max-width: 768px) { .bracket-container { flex-direction: column; gap: 50px; } .tournament-title { font-size: 32px; } .match { width: 100%; max-width: 300px; } .match.final-match { width: 100%; max-width: 320px; } .bracket-lines { display: none; } .controls { flex-direction: column; align-items: center; gap: 15px; } }
      .match { animation: slideIn 0.7s ease-out forwards; opacity: 0; transform: translateY(40px); }
      .semifinals-column .match:nth-child(1) { animation-delay: 0.2s; }
      .semifinals-column .match:nth-child(2) { animation-delay: 0.4s; }
      .final-column .match { animation-delay: 0.6s; }
      @keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }

  // Place in app
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
    app.appendChild(bracket);
  } else {
    document.body.appendChild(bracket);
  }

  // Interactive logic
  let matchWinners: { [key: string]: string } = {};
  function selectWinner(playerElement: HTMLElement, matchNumber: string | number) {
    // Remove winner class from both players in this match
    const match = playerElement.closest('.match');
    if (!match) return;
    const players = match.querySelectorAll('.player:not(.placeholder)');
    players.forEach(p => p.classList.remove('winner'));
    // Add winner class to selected player
    playerElement.classList.add('winner');
    // Store winner
    const playerName = playerElement.getAttribute('data-player') || '';
    matchWinners[matchNumber] = playerName;
    // Update final match
    updateFinalMatch();
    // Activate connection line
    const lineId = `line${matchNumber}`;
    const line = document.getElementById(lineId);
    if (line) {
      line.classList.add('active');
      setTimeout(() => {
        line.classList.add('active');
      }, 100);
    }
  }
  function updateFinalMatch() {
    const finalPlayers = bracket.querySelectorAll('.final-match .player');
    // Update first finalist
    if (matchWinners[1]) {
      finalPlayers[0].textContent = matchWinners[1];
      finalPlayers[0].classList.remove('placeholder');
      finalPlayers[0].setAttribute('data-player', matchWinners[1]);
      (finalPlayers[0] as HTMLElement).onclick = () => selectWinner(finalPlayers[0] as HTMLElement, 'final');
    }
    // Update second finalist
    if (matchWinners[2]) {
      finalPlayers[1].textContent = matchWinners[2];
      finalPlayers[1].classList.remove('placeholder');
      finalPlayers[1].setAttribute('data-player', matchWinners[2]);
      (finalPlayers[1] as HTMLElement).onclick = () => selectWinner(finalPlayers[1] as HTMLElement, 'final');
    }
    // Check for tournament champion
    if (matchWinners['final']) {
      setTimeout(() => {
        showChampionAlert(matchWinners['final']);
      }, 600);
    }
  }
  function showChampionAlert(champion: string) {
    alert(`🏆🎉 TOURNAMENT CHAMPION 🎉🏆\n\n${champion.toUpperCase()}\n\nCongratulations on your victory!\n\n🥇 You are the ultimate champion! 🥇`);
  }
  function resetTournament() {
    matchWinners = {};
    // Reset all players
    bracket.querySelectorAll('.player').forEach(player => {
      player.classList.remove('winner');
    });
    // Reset final match players
    const finalPlayers = bracket.querySelectorAll('.final-match .player');
    finalPlayers[0].textContent = 'Winner of Match 1';
    finalPlayers[0].className = 'player placeholder';
    (finalPlayers[0] as HTMLElement).onclick = null;
    finalPlayers[0].removeAttribute('data-player');
    finalPlayers[1].textContent = 'Winner of Match 2';
    finalPlayers[1].className = 'player placeholder';
    (finalPlayers[1] as HTMLElement).onclick = null;
    finalPlayers[1].removeAttribute('data-player');
    // Reset connection lines
    bracket.querySelectorAll('.connection-line').forEach(line => {
      line.classList.remove('active');
    });
  }
  function newTournament() {
    if (confirm('🔄 Start a completely new tournament?\n\nThis will reset all progress.')) {
      resetTournament();
      alert('🆕 New tournament ready!\n\nGood luck to all players! 🍀');
    }
  }
  // Attach event listeners
  // Semifinal player click
  const match1Players = bracket.querySelectorAll('.match[data-match="1"] .player');
  match1Players.forEach(p => (p as HTMLElement).onclick = () => selectWinner(p as HTMLElement, 1));
  const match2Players = bracket.querySelectorAll('.match[data-match="2"] .player');
  match2Players.forEach(p => (p as HTMLElement).onclick = () => selectWinner(p as HTMLElement, 2));
  // controls removed
}

function createMatchBox(playerA: string, playerB: string, label: string, isFinal: boolean = false) {
  const box = document.createElement('div');
  box.className = isFinal ? 'match finals-match' : 'match';
  box.innerHTML = `
    <div class="match-header">${label}</div>
    <div class="players">
      <div class="player">${playerA}</div>
      <div class="vs">vs</div>
      <div class="player">${playerB}</div>
    </div>
  `;
  return box;
}
