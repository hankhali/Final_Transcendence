import type { UserProfile } from '../types/index.js';
import { languageManager } from '../translations.js';
import { apiService } from '../services/api.js';

export function createProfileSettings(profile: Partial<UserProfile> = {}): HTMLElement {
  const container = document.createElement('div');
  container.className = 'profile-settings';

  const t = languageManager.getTranslations();

  // Initialize default values
  const defaultProfile: UserProfile = {
    username: '',
    displayName: '',
    skillLevel: 'beginner',
    bio: '',
    avatar: '',
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    winRate: 0,
    friends: [],
    matchHistory: [],
    ...profile
  };

  // Create form
  const form = document.createElement('form');
  form.className = 'profile-form';
  form.noValidate = true;

  // Avatar Section - Centered
  const avatarOuterContainer = document.createElement('div');
  avatarOuterContainer.className = 'form-section';
  
  const avatarSection = document.createElement('div');
  avatarSection.className = 'avatar-section';
  
  const avatarLabel = document.createElement('label');
  avatarLabel.className = 'form-label';
  avatarLabel.textContent = 'Customize Avatar';
  
  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'avatar-container';
  
  const avatarPreviewContainer = document.createElement('div');
  avatarPreviewContainer.className = 'avatar-preview-container';

  // Center avatar icon above the button
  avatarPreviewContainer.style.display = 'flex';
  avatarPreviewContainer.style.flexDirection = 'column';
  avatarPreviewContainer.style.alignItems = 'center';

  const avatarPreview = document.createElement('div');
  avatarPreview.className = 'avatar-preview';
  // Show if missing or set to 'default.jpg'
  if (!defaultProfile.avatar || defaultProfile.avatar === 'default.jpg') {
    avatarPreview.innerHTML = `<img src="http://localhost:5001/uploads/default.jpg" alt="Default Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  } else {
    avatarPreview.innerHTML = `<img src="http://localhost:5001/uploads/${defaultProfile.avatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  }

  const avatarInput = document.createElement('input');
  avatarInput.type = 'file';
  avatarInput.accept = 'image/*';
  avatarInput.className = 'avatar-input';
  avatarInput.hidden = true;

  // Handle avatar upload and preview
  avatarInput.addEventListener('change', async () => {
    const file = avatarInput.files?.[0];
    if (!file) return;
    try {
      const res = await apiService.users.uploadAvatar(file);
      if (res.error) {
        showMessage(`Failed to upload avatar: ${res.error}`, 'error');
      } else {
        avatarPreview.innerHTML = `<img src="http://localhost:5001/uploads/${res.file}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
        showMessage('Avatar uploaded successfully!', 'success');
      }
    } catch (err) {
      showMessage('Error uploading avatar.', 'error');
    }
  });

  const changeButton = document.createElement('button');
  changeButton.type = 'button';
  changeButton.className = 'secondary-button';
  changeButton.textContent = t.profile.settings.changeAvatar;
  changeButton.style.marginTop = '1rem';
  changeButton.style.display = 'block';
  changeButton.style.marginLeft = 'auto';
  changeButton.style.marginRight = 'auto';
  changeButton.addEventListener('click', () => avatarInput.click());

  avatarPreviewContainer.appendChild(avatarPreview);

  avatarContainer.appendChild(avatarPreviewContainer);
  avatarContainer.appendChild(changeButton);
  avatarContainer.appendChild(avatarInput);

  avatarSection.appendChild(avatarLabel);
  avatarSection.appendChild(avatarContainer);
  avatarOuterContainer.appendChild(avatarSection);

  // Username Field
  const usernameField = createFormField({
    label: t.profile.settings.username,
    name: 'username',
    type: 'text',
    value: defaultProfile.username,
    required: true,
    placeholder: 'Enter your username'
  });

  // Display Name Field
  const displayNameField = createFormField({
    label: t.profile.settings.displayName,
    name: 'displayName',
    type: 'text',
    value: defaultProfile.displayName,
    required: true,
    placeholder: 'Enter your display name'
  });


    // Bio Field
  const bioField = createFormField({
    name: 'bio',
    type: 'textarea',
    label: t.profile.settings.bio,
    placeholder: t.profile.settings.bioPlaceholder,
    value: defaultProfile.bio || ''
  });

  // Advanced Settings Toggle - Styled Button
  const advancedToggle = document.createElement('div');
  advancedToggle.className = 'settings-button-container';
  advancedToggle.innerHTML = `
    <button type="button" class="settings-button advanced-toggle-button">
      <span class="button-icon"><i class="fas fa-sliders-h"></i></span>
      <span class="button-text">${t.profile.settings.advancedSettings}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;

  // Advanced Settings Content
  const advancedContent = document.createElement('div');
  advancedContent.className = 'advanced-content';
  advancedContent.style.display = 'none';
  
  // Password Update Section
  // Old Password Field (for password change)
  const oldPasswordField = createFormField({
    label: 'Current Password',
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Enter your current password',
    autoComplete: 'current-password'
  });

  const passwordField = createFormField({
    label: t.profile.settings.newPassword,
    name: 'newPassword',
    type: 'password',
    placeholder: t.profile.settings.passwordPlaceholder,
    autoComplete: 'new-password'
  });

  const confirmPasswordField = createFormField({
    label: t.profile.settings.confirmPassword,
    name: 'confirmPassword',
    type: 'password',
    placeholder: t.profile.settings.confirmPasswordPlaceholder,
    autoComplete: 'new-password'
  });

  advancedContent.appendChild(oldPasswordField);
  advancedContent.appendChild(passwordField);
  advancedContent.appendChild(confirmPasswordField);
  
  // Toggle advanced settings
  const toggleButton = advancedToggle.querySelector('.advanced-toggle-button');
  const chevron = advancedToggle.querySelector('.fa-chevron-down');
  
  toggleButton?.addEventListener('click', () => {
    const isExpanded = advancedContent.style.display !== 'none';
    advancedContent.style.display = isExpanded ? 'none' : 'block';
    if (chevron) {
      chevron.className = isExpanded 
        ? 'fas fa-chevron-down'
        : 'fas fa-chevron-up';
    }
  });

  // Submit Button - Styled
  const submitButton = document.createElement('div');
  submitButton.className = 'settings-button-container';
  submitButton.innerHTML = `
    <button type="submit" class="settings-button save-changes-button">
      <span class="button-icon"><i class="fas fa-save"></i></span>
      <span class="button-text">${t.profile.settings.saveChanges}</span>
      <span class="button-check"><i class="fas fa-check"></i></span>
    </button>
  `;

  // Assemble the form
  form.appendChild(avatarOuterContainer);
  form.appendChild(usernameField);
  form.appendChild(displayNameField);
  form.appendChild(bioField);
  form.appendChild(advancedToggle);
  form.appendChild(advancedContent);
  
  // Game History Button - Styled
  const gameHistoryButton = document.createElement('div');
  gameHistoryButton.className = 'settings-button-container';
  gameHistoryButton.innerHTML = `
    <button type="button" class="settings-button game-history-button">
      <span class="button-icon"><i class="fas fa-history"></i></span>
      <span class="button-text">${t.profile.settings.gameHistory}</span>
      <span class="button-arrow"><i class="fas fa-external-link-alt"></i></span>
    </button>
  `;
  
  gameHistoryButton.querySelector('button')?.addEventListener('click', () => {
    // hanieh added: Fetch and display real game stats
    showMessage('Loading your game stats...', 'info');
    apiService.users.getMyProfile().then((res) => {
      if (res.error) {
        showMessage('Failed to fetch game stats: ' + res.error, 'error');
        return;
      }
      const stats = res.user;
      const history = res.gameHistory || [];
      let statsHtml = `<div class="game-stats-modal"><h2>Game Stats</h2>`;
      statsHtml += `<p><strong>Username:</strong> ${stats.username}</p>`;
      statsHtml += `<p><strong>Games Played:</strong> ${stats.player_matches || 0}</p>`;
      statsHtml += `<p><strong>Wins:</strong> ${stats.player_wins || 0}</p>`;
      statsHtml += `<h3>Match History</h3><ul>`;
      if (history.length === 0) {
        statsHtml += `<li>No matches played yet.</li>`;
      } else {
        for (const match of history) {
          statsHtml += `<li>${match.date ? new Date(match.date).toLocaleString() : ''} - ${match.gameType} vs ${match.opponent} | Score: ${match.score} | Result: ${match.result}</li>`;
        }
      }
      statsHtml += `</ul></div>`;
      // Show stats in a modal
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `<div class='modal-content'>${statsHtml}<button class='modal-close'>Close</button></div>`;
      modal.querySelector('.modal-close')?.addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
      document.body.appendChild(modal);
    });
  });
  
  form.appendChild(gameHistoryButton);
  
  // Account Deletion Section - Collapsible like other sections
  const accountDeletionToggle = document.createElement('div');
  accountDeletionToggle.className = 'settings-button-container';
  accountDeletionToggle.innerHTML = `
    <button type="button" class="settings-button account-deletion-button">
      <span class="button-icon"><i class="fas fa-user-times"></i></span>
      <span class="button-text">${t.profile.settings.accountDeletion}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;

  // Account Deletion Content (hidden by default)
  const accountDeletionContent = document.createElement('div');
  accountDeletionContent.className = 'account-deletion-content';
  accountDeletionContent.style.display = 'none';
  accountDeletionContent.innerHTML = `
    <div class="danger-zone">
      <div class="danger-warning">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="warning-text">
          <h4>Warning: Permanent Action</h4>
          <p>Once you delete your profile, there is no going back. This action cannot be undone and will permanently remove:</p>
          <ul>
            <li>Your profile information and settings</li>
            <li>Game history and statistics</li>
            <li>Friend connections</li>
            <li>All personal data</li>
          </ul>
        </div>
      </div>
      <div class="danger-actions">
        <button type="button" class="delete-profile-btn">
          <i class="fas fa-trash-alt"></i>
          DELETE PROFILE PERMANENTLY
        </button>
      </div>
    </div>
  `;

  // Toggle account deletion content
  const accountDeletionButton = accountDeletionToggle.querySelector('.account-deletion-button');
  const deletionArrow = accountDeletionToggle.querySelector('.button-arrow i');
  
  accountDeletionButton?.addEventListener('click', () => {
    const isHidden = accountDeletionContent.style.display === 'none';
    accountDeletionContent.style.display = isHidden ? 'block' : 'none';
    deletionArrow?.classList.toggle('rotated', isHidden);
  });

  // Add delete profile functionality
  const deleteButton = accountDeletionContent.querySelector('.delete-profile-btn');
  deleteButton?.addEventListener('click', () => {
    showDeleteProfileModal();
  });
  
  form.appendChild(accountDeletionToggle);
  form.appendChild(accountDeletionContent);
  form.appendChild(submitButton);

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const profileData: Record<string, any> = {};

    // Get all form data
    formData.forEach((value, key) => {
      if (value) profileData[key] = value;
    });

    // Skill level removed

    // Password update logic
    if (profileData.oldPassword && profileData.newPassword && profileData.confirmPassword) {
        // hanieh debug: log password fields before sending
        console.log('[hanieh debug] PATCH /me payload:', {
          oldPassword: profileData.oldPassword,
          newPassword: profileData.newPassword,
          confirmPassword: profileData.confirmPassword
        });
      if (profileData.newPassword !== profileData.confirmPassword) {
        showMessage('New password and confirmation do not match.', 'error');
        return;
      }
      // Send oldPassword and password to backend (rename newPassword to password)
      try {
        const res = await apiService.users.updateProfile({
          oldPassword: profileData.oldPassword,
          password: profileData.newPassword
        });
        if (res.error) {
          showMessage(`Failed to update password: ${res.error}`, 'error');
          return;
        }
        showMessage(res.data?.message || 'Password updated successfully!', 'success');
        const saveBtn = form.querySelector('.save-changes-button') as HTMLButtonElement;
        if (saveBtn) {
          saveBtn.classList.add('success');
          setTimeout(() => saveBtn.classList.remove('success'), 2000);
        }
      } catch (error) {
        console.error('Error updating password:', error);
        showMessage('Failed to update password. Please try again.', 'error');
      }
      return;
    }

    // Other profile updates (username, bio, etc.)
    try {
      const res = await apiService.users.updateProfile(profileData);
      if (res.error) {
        showMessage(`Failed to update profile: ${res.error}`, 'error');
        return;
      }
      showMessage(res.data?.message || 'Profile updated successfully!', 'success');
      const saveBtn = form.querySelector('.save-changes-button') as HTMLButtonElement;
      if (saveBtn) {
        saveBtn.classList.add('success');
        setTimeout(() => saveBtn.classList.remove('success'), 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Failed to update profile. Please try again.', 'error');
    }
  });

  container.appendChild(form);
  return container;
}

// Helper function to create form fields
function createFormField({
  label,
  name,
  type,
  value = '',
  required = false,
  placeholder = '',
  autoComplete = '',
  className = ''
}: {
  label: string;
  name: string;
  type: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}): HTMLElement {
  const group = document.createElement('div');
  group.className = `form-group ${className}`.trim();
  
  const labelEl = document.createElement('label');
  labelEl.className = 'form-label';
  labelEl.htmlFor = name;
  labelEl.textContent = label;
  
  let input: HTMLInputElement | HTMLTextAreaElement;
  
  if (type === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.id = name;
    textarea.name = name;
    textarea.value = value;
    textarea.placeholder = placeholder;
    textarea.required = required;
    textarea.rows = 3;
    input = textarea;
  } else {
    const inputEl = document.createElement('input');
    inputEl.type = type;
    inputEl.id = name;
    inputEl.name = name;
    inputEl.value = value;
    inputEl.placeholder = placeholder;
    inputEl.required = required;
    if (autoComplete) inputEl.autocomplete = autoComplete as any;
    input = inputEl;
  }
  
  input.className = 'form-input';
  
  group.appendChild(labelEl);
  group.appendChild(input);
  
  return group;
}

// Function to show delete profile confirmation modal
function showDeleteProfileModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay delete-profile-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header danger-header">
        <div class="modal-title">
          <i class="fas fa-exclamation-triangle"></i>
          Delete Profile
        </div>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="delete-confirmation-content">
          <div class="warning-icon">
            <i class="fas fa-trash-alt"></i>
          </div>
          <h3>Are you absolutely sure?</h3>
          <p class="warning-text">
            This action <strong>cannot be undone</strong>. This will permanently delete your profile, 
            including all your game history, statistics, friends, and achievements.
          </p>
          <div class="confirmation-input-group">
            <label for="delete-confirmation">
              Type <strong>DELETE</strong> to confirm:
            </label>
            <input 
              type="text" 
              id="delete-confirmation" 
              placeholder="Type DELETE here"
              class="confirmation-input"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer danger-footer">
        <button class="secondary-button modal-close">Cancel</button>
        <button class="danger-button" id="confirm-delete-btn" disabled>
          <i class="fas fa-trash-alt"></i>
          Delete Profile Forever
        </button>
      </div>
    </div>
  `;

  // Add confirmation input validation
  const confirmInput = modal.querySelector('#delete-confirmation') as HTMLInputElement;
  const confirmButton = modal.querySelector('#confirm-delete-btn') as HTMLButtonElement;
  
  confirmInput.addEventListener('input', () => {
    if (confirmInput.value.trim().toUpperCase() === 'DELETE') {
      confirmButton.disabled = false;
      confirmButton.classList.add('enabled');
    } else {
      confirmButton.disabled = true;
      confirmButton.classList.remove('enabled');
    }
  });

  // Handle delete confirmation
  confirmButton.addEventListener('click', async () => {
    if (confirmInput.value.trim().toUpperCase() === 'DELETE') {
      try {
        // Show loading state
        confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
        confirmButton.disabled = true;
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          showMessage('Request timed out. Please try again.', 'error');
          confirmButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete Profile Forever';
          confirmButton.disabled = false;
        }, 10000);
        
        // Check for token before sending delete request
        const token = localStorage.getItem('token');
        if (!token) {
          clearTimeout(timeoutId);
          showMessage('You are not authenticated. Please log in before deleting your account.', 'error');
          confirmButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete Profile Forever';
          confirmButton.disabled = false;
          return;
        }
        // Call the actual API to delete the account
        const res = await apiService.users.deleteMyAccount();

        // Clear timeout since request completed
        clearTimeout(timeoutId);
        if (res.error) throw new Error(res.error);
        showMessage('Account deleted successfully! Redirecting...', 'success');
        localStorage.clear();
        window.location.href = '/';
        // modal.remove(); // Not needed, redirect happens instantly
      } catch (error) {
  console.error('Error deleting profile:', error);
  const errorMsg = error instanceof Error ? error.message : 'Unknown error';
  showMessage(`Failed to delete profile: ${errorMsg}. Please try again.`, 'error');
  confirmButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete Profile Forever';
  confirmButton.disabled = false;
      }
    }
  });

  // Handle modal close
  modal.addEventListener("click", (e) => {
    if (e.target === modal || (e.target as HTMLElement).classList.contains('modal-close')) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
  
  // Focus on the confirmation input
  setTimeout(() => {
    confirmInput.focus();
  }, 100);
}

// Use the global showMessage function from main.ts
const showMessage = (window as any).showMessage || ((text: string, type: string) => {
  console.log(`${type.toUpperCase()}: ${text}`);
  // No alert fallback; only use neon-styled message
});