
import type { UserProfile } from '../types/index.js';
import { languageManager } from '../translations.js';
import { apiService } from '../services/api.js';

export function createProfileSettings(profile: Partial<UserProfile> = {}): HTMLElement {
  const t = languageManager.getTranslations();
  const container = document.createElement('div');
  container.className = 'profile-settings';

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
  
  const avatarPreview = document.createElement('div');
  avatarPreview.className = 'avatar-preview';
  avatarPreview.innerHTML = `
    <i class="fas fa-user-circle"></i>
  `;
  
  const avatarUpload = document.createElement('div');
  avatarUpload.className = 'avatar-upload';
  avatarUpload.innerHTML = '<i class="fas fa-camera"></i>';
  
  const avatarInput = document.createElement('input');
  avatarInput.type = 'file';
  avatarInput.accept = 'image/*';
  avatarInput.className = 'avatar-input';
  avatarInput.hidden = true;
  
  const changeButton = document.createElement('button');
  changeButton.type = 'button';
  changeButton.className = 'secondary-button';
  changeButton.textContent = t.profile.settings.changeAvatar;
  changeButton.style.marginTop = '1rem';
  changeButton.addEventListener('click', () => avatarInput.click());
  
  avatarPreviewContainer.appendChild(avatarPreview);
  avatarPreviewContainer.appendChild(avatarUpload);
  
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

  // Skill Level Field
  const skillLevelField = document.createElement('div');
  skillLevelField.className = 'form-group';
  
  const skillLabel = document.createElement('label');
  skillLabel.className = 'form-label';
  skillLabel.textContent = t.profile.settings.skillLevel;
  skillLabel.htmlFor = 'skillLevel';
  
  const skillOptions = [
    { id: 'beginner', label: t.profile.settings.beginner, emoji: '👶' },
    { id: 'intermediate', label: t.profile.settings.intermediate, emoji: '💪' },
    { id: 'expert', label: t.profile.settings.expert, emoji: '🏆' }
  ] as const;
  
  const skillContainer = document.createElement('div');
  skillContainer.className = 'skill-level-options';
  
  skillOptions.forEach(({ id, label, emoji }) => {
    const optionId = `skill-${id}`;
    const optionContainer = document.createElement('div');
    optionContainer.className = 'radio-option';
    optionContainer.dataset.level = id;
    
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = optionId;
    radioInput.name = 'skillLevel';
    radioInput.value = id;
    radioInput.checked = defaultProfile.skillLevel === id;
    
    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = optionId;
    radioLabel.dataset.level = id;
    
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'level-emoji';
    emojiSpan.textContent = emoji;
    
    const textSpan = document.createElement('span');
    textSpan.className = 'level-text';
    textSpan.textContent = label;
    
    radioLabel.appendChild(emojiSpan);
    radioLabel.appendChild(document.createElement('br'));
    radioLabel.appendChild(textSpan);
    
    optionContainer.appendChild(radioInput);
    optionContainer.appendChild(radioLabel);
    skillContainer.appendChild(optionContainer);
  });
  
  skillLevelField.appendChild(skillLabel);
  skillLevelField.appendChild(skillContainer);

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
  form.appendChild(skillLevelField);
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
    console.log('Game History clicked');
    showMessage('Game History feature coming soon!', 'info');
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
    
    // Get skill level
    const selectedSkill = form.querySelector('input[name="skillLevel"]:checked') as HTMLInputElement;
    if (selectedSkill) {
      profileData.skillLevel = selectedSkill.value;
    }
    
    try {
      // TODO: Add API call to update profile
      console.log('Updating profile:', profileData);
      
      // Show success message
      showMessage('Profile updated successfully!', 'success');
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
        // Call the actual API to delete the account
  // Use apiService directly
  const res = await apiService.users.deleteMyAccount();
        if (res.error) throw new Error(res.error);
        modal.remove();
        showMessage('Account deleted successfully! Redirecting...', 'success');
        // Clear localStorage and redirect to home page
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        
      } catch (error) {
        console.error('Error deleting profile:', error);
        showMessage('Failed to delete profile. Please try again.', 'error');
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
const showMessage = (window as any).showMessage;
