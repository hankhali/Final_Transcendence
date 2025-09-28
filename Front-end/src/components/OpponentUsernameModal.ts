// OpponentUsernameModal.ts
// Premium glassmorphism modal for 1v1 opponent username entry

export function showOpponentUsernameModal(onSubmit: (username: string) => void, onClose?: () => void) {
  // Remove any existing modal
  let oldModal = document.getElementById('username-modal');
  if (oldModal) oldModal.remove();

  // Modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'username-modal';
  overlay.className = 'modal-overlay';
  overlay.style.cssText = `
    position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 1000;
    display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);`

  // Modal content
  const modal = document.createElement('div');
  modal.className = 'modal-content';
  modal.style.cssText = `
    // Debug log and guard: Never show modal if tournament mode or suppressModal is true
    const suppressModal = (window as any).currentTournamentMatch || (window as any).gamePageSuppressModal;
    const gameMode = (window as any).gamePageMode;
    console.log('[DEBUG] showOpponentUsernameModal called. suppressModal:', suppressModal, 'gameMode:', gameMode);
    if (suppressModal || gameMode === 'tournament') {
      console.log('[DEBUG] BLOCKED: OpponentUsernameModal will NOT be shown for tournament or suppressModal.');
      return;
    }
    background: linear-gradient(135deg, rgba(15,18,40,0.95), rgba(8,10,28,0.98));
    border-radius: 24px; box-shadow: 0 0 60px #00fff7, 0 0 24px #ff00ea;
    border: 2px solid #00fff7; padding: 2.5rem 2rem; min-width: 400px; max-width: 90vw;
    color: #fff; position: relative; text-align: center;`

  modal.innerHTML = `
    <span class="close" id="close-username-modal" style="position:absolute;top:18px;right:22px;font-size:2rem;cursor:pointer;color:#00fff7;">&times;</span>
    <h2 style="font-size:2rem;font-weight:800;margin-bottom:2rem;color:#d946ef;text-shadow:0 0 32px #00fff7,0 0 8px #ff00ea;letter-spacing:2px;">Enter opponent username for 1v1 match</h2>
    <input type="text" id="opponent-username-input" placeholder="Opponent username" style="width:100%;padding:1rem;margin-bottom:2rem;border-radius:12px;border:2px solid #00fff7;background:rgba(15,18,40,0.8);color:#00fff7;font-size:1.2rem;text-align:center;box-shadow:0 0 16px #00fff7 inset;outline:none;">
    <button id="submit-username-btn" style="width:100%;padding:1rem 0;border-radius:16px;background:linear-gradient(90deg,#00fff7 0%,#ff00ea 100%);color:#222;font-weight:700;font-size:1.2rem;box-shadow:0 0 32px #00fff7;letter-spacing:2px;cursor:pointer;margin-bottom:1rem;">START MATCH</button>
    <div id="username-error" style="display:none;color:#ff00ea;font-weight:600;margin-top:1rem;"></div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Event listeners
  const input = modal.querySelector('#opponent-username-input') as HTMLInputElement;
  const submitBtn = modal.querySelector('#submit-username-btn') as HTMLButtonElement;
  const errorDiv = modal.querySelector('#username-error') as HTMLElement;
  const closeBtn = modal.querySelector('#close-username-modal') as HTMLElement;

  submitBtn.onclick = () => {
    const username = input.value.trim();
    if (!username) {
      errorDiv.textContent = 'You must enter a valid username for your opponent!';
      errorDiv.style.display = 'block';
      return;
    }
    errorDiv.style.display = 'none';
    document.body.removeChild(overlay);
    onSubmit(username);
  };

  closeBtn.onclick = () => {
    document.body.removeChild(overlay);
    if (onClose) onClose();
  };

  input.onkeydown = (e) => {
    if (e.key === 'Enter') submitBtn.click();
  };

  input.focus();
}
