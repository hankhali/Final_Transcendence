// This file is a TypeScript module
import "./styles/style.css"; // Ensure your CSS is imported
import { apiService } from "./services/api.ts";
import { createProfileSettings } from "./components/ProfileSettings";

// Global variables for message display
window.messageTimeout = null;
let currentUser: { id: number; username: string } | null = null;

// Utility function to navigate between pages
export function navigateTo(path: string) {
  showLoading();
  // Simulate network delay for a smoother loading experience
  setTimeout(() => {
    history.pushState(null, "", path);
    const app = document.getElementById("app");
    if (app) {
      setupRoutes(app); // Render new page based on route
      document.title = getPageTitle(path); // Update document title
      const liveRegion = document.getElementById("screen-reader-live-region");
      if (liveRegion) {
        liveRegion.textContent = ""; // Clear first to ensure re-announcement
        liveRegion.textContent = `Navigated to ${document.title}.`;
      }
      window.scrollTo(0, 0); // Scroll to top on navigation
    }
    hideLoading();
  }, 300); // Simulate 300ms loading
}



// Helper to get page title based on path
function getPageTitle(path: string): string {
  switch (path) {
    case "/":
      return "Home - Neon Pong";
    case "/tournament":
      return "Tournaments - Neon Pong";
    case "/register":
      return "Register - Neon Pong";
    case "/login":
      return "Login - Neon Pong";
    case "/profile":
      return "Profile - Neon Pong";
    default:
      return "Page Not Found - Neon Pong";
  }
}
// Function to create a generic loading overlay
function createLoadingOverlay(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay hidden"; // Start hidden
  overlay.id = "loading-overlay";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "assertive");
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  overlay.appendChild(spinner);
  const loadingText = document.createElement("p");
  loadingText.className = "loading-text";
  loadingText.textContent = "Loading...";
  loadingText.setAttribute("aria-label", "Content is loading");
  overlay.appendChild(loadingText);
  return overlay;
}
// Function to show the loading overlay
function showLoading() {
  const app = document.getElementById("app");
  if (app) {
    let overlay = document.getElementById("loading-overlay");
    if (!overlay) {
      overlay = createLoadingOverlay();
      app.appendChild(overlay);
    }
    overlay.classList.remove("hidden");
  }
}
// Function to hide the loading overlay
function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }
}
// Function to display messages (error/success/info)
function showMessage(
  text: string,
  type: "success" | "error" | "info" = "info"
) {
  // Clear existing messages and timeouts
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.classList.add("removing");
    setTimeout(() => existingMessage.remove(), 300);
  }
  if (window.messageTimeout) {
    clearTimeout(window.messageTimeout);
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}-message`;
  
  // Add icon based on message type
  let iconClass = "";
  if (type === "success") iconClass = "fas fa-check-circle";
  else if (type === "error") iconClass = "fas fa-exclamation-circle";
  else iconClass = "fas fa-info-circle";
  
  const icon = document.createElement("i");
  icon.className = iconClass;
  
  // Create message content container
  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.textContent = text;
  
  // Create close button
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.setAttribute("aria-label", "Close message");
  closeButton.addEventListener("click", () => {
    messageDiv.classList.add("removing");
    setTimeout(() => messageDiv.remove(), 300);
    if (window.messageTimeout) {
      clearTimeout(window.messageTimeout);
    }
  });
  
  // Assemble the message
  messageDiv.appendChild(icon);
  messageDiv.appendChild(messageContent);
  messageDiv.appendChild(closeButton);
  
  // Accessibility
  messageDiv.setAttribute("role", "status");
  messageDiv.setAttribute("aria-live", "polite");
  messageDiv.setAttribute("aria-atomic", "true");
  
  // Add to DOM
  document.body.appendChild(messageDiv);
  
  // Auto-hide after delay
  window.messageTimeout = window.setTimeout(() => {
    messageDiv.classList.add("removing");
    setTimeout(() => messageDiv.remove(), 300);
  }, 4000);
}
// Global variables for accessibility features
let isHighContrast = false;
let fontSizeMultiplier = 1;
// Function to toggle high contrast mode
function toggleHighContrast(): void {
  isHighContrast = !isHighContrast;
  document.body.classList.toggle('high-contrast', isHighContrast);
  localStorage.setItem('highContrast', isHighContrast.toString());
}
// Function to adjust font size
function adjustFontSize(increase: boolean): void {
  const step = 0.1;
  const minSize = 0.8;
  const maxSize = 2.0;
  // Update the multiplier
  const newMultiplier = Math.max(minSize, Math.min(maxSize,
    fontSizeMultiplier + (increase ? step : -step)));
  // Only update if changed
  if (newMultiplier !== fontSizeMultiplier) {
    fontSizeMultiplier = newMultiplier;
    // Apply to root element
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier.toString());
    // Force a reflow to ensure styles are recalculated
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
    // Update display
    const display = document.querySelector('.font-size-display') as HTMLElement;
    if (display) {
      const size = Math.round(fontSizeMultiplier * 100);
      const announcement = `Font size set to ${size}%`;
      display.textContent = `${size}%`;
      // Save preference
      localStorage.setItem('fontSizeMultiplier', fontSizeMultiplier.toString());
      // Visual feedback
      display.classList.add('active');
      setTimeout(() => display.classList.remove('active'), 500);
      // Announce change for screen readers
      const liveRegion = document.getElementById('a11y-announcement');
      if (liveRegion) {
        liveRegion.textContent = announcement;
        setTimeout(() => liveRegion.textContent = '', 1000);
      } else {
        showMessage(announcement, 'info');
      }
    }
  }
}
// Initialize accessibility features from localStorage
function initAccessibility() {
  // Load high contrast preference
  const savedHighContrast = localStorage.getItem('highContrast') === 'true';
  if (savedHighContrast) {
    isHighContrast = true;
    document.body.classList.add('high-contrast');
  }
  // Load font size preference
  const savedFontSize = parseFloat(localStorage.getItem('fontSizeMultiplier') || '1');
  if (savedFontSize >= 0.8 && savedFontSize <= 1.5) {
    fontSizeMultiplier = savedFontSize;
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier.toString());
  }
}
// Call init on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
}
// Navbar Component
function createNavbar(): HTMLElement {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.setAttribute("aria-label", "Main navigation");
  
  const logo = document.createElement("a");
  logo.className = "navbar-logo";
  logo.textContent = "Neon Pong";
  logo.href = "/";
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/");
  });
  const mobileMenuToggle = document.createElement("div");
  mobileMenuToggle.id = "mobile-menu";
  mobileMenuToggle.className = "menu-toggle";
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-controls", "navbarLinksContainer");
  for (let i = 0; i < 3; i++) {
    const bar = document.createElement("span");
    bar.className = "bar";
    mobileMenuToggle.appendChild(bar);
  }
  const navbarLinksContainer = document.createElement("div");
  navbarLinksContainer.id = "navbarLinksContainer";
  navbarLinksContainer.className = "navbar-links-container";
  
  const navLinks = document.createElement("div");
  navLinks.className = "navbar-links";
  
  navLinks.setAttribute("role", "menubar"); // Role for menu bar
  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.className = "navbar-link";
  homeLink.textContent = "Home";
  homeLink.setAttribute("role", "menuitem");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/");
  });
  const tournamentsLink = document.createElement("a");
  tournamentsLink.href = "/tournament";
  tournamentsLink.className = "navbar-link";
  tournamentsLink.textContent = "Tournaments";
  tournamentsLink.setAttribute("role", "menuitem");
  tournamentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/tournament");
  });
  // Combined ACCOUNT tab that toggles between login/register
  const ACCOUNTLink = document.createElement("a");
  ACCOUNTLink.href = "/ACCOUNT";
  ACCOUNTLink.className = "navbar-link";
  ACCOUNTLink.textContent = "ACCOUNT";
  ACCOUNTLink.setAttribute("role", "menuitem");
  ACCOUNTLink.addEventListener("click", (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === "/login" || currentPath === "/register") {
      // Toggle between login and register
      const newPath = currentPath === "/login" ? "/register" : "/login";
      navigateTo(newPath);
    } else {
      // Default to login page
      navigateTo("/login");
    }
  });
  navLinks.appendChild(homeLink);
  navLinks.appendChild(tournamentsLink);
  navLinks.appendChild(ACCOUNTLink);
  
  // Profile Link
  const profileLink = document.createElement("a");
  profileLink.href = "/profile";
  profileLink.className = "navbar-link";
  profileLink.textContent = "Profile";
  profileLink.setAttribute("role", "menuitem");
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/profile");
  });
  
  navLinks.appendChild(profileLink);
  
  // Accessibility Controls
  const accessibilityControls = document.createElement('div');
  accessibilityControls.className = 'accessibility-controls';
  accessibilityControls.setAttribute('aria-label', 'Accessibility controls');
  
  // High Contrast Toggle
  const highContrastBtn = document.createElement('button');
  highContrastBtn.className = 'accessibility-btn';
  highContrastBtn.innerHTML = '<i class="fas fa-adjust" aria-hidden="true"></i>';
  highContrastBtn.setAttribute('aria-label', 'Toggle high contrast mode');
  highContrastBtn.setAttribute('title', 'Toggle high contrast mode');
  highContrastBtn.addEventListener('click', toggleHighContrast);
  // Font Size Controls
  const fontSizeContainer = document.createElement('div');
  fontSizeContainer.className = 'font-size-controls';
  fontSizeContainer.setAttribute('aria-label', 'Font size controls');
  // Add a label for screen readers
  const fontSizeLabel = document.createElement('span');
  fontSizeLabel.className = 'sr-only';
  fontSizeLabel.textContent = 'Font size: ';
  fontSizeContainer.appendChild(fontSizeLabel);
  // Decrease button with minus icon
  const decreaseFontBtn = document.createElement('button');
  decreaseFontBtn.className = 'font-size-btn';
  decreaseFontBtn.innerHTML = '<i class="fas fa-minus" aria-hidden="true"></i> <span class="sr-only">Decrease font size</span>';
  decreaseFontBtn.setAttribute('aria-label', 'Decrease font size');
  decreaseFontBtn.setAttribute('title', 'Decrease font size (Smaller text)');
  decreaseFontBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adjustFontSize(false);
  });
  // Current font size display
  const fontSizeDisplay = document.createElement('span');
  fontSizeDisplay.className = 'font-size-display';
  fontSizeDisplay.textContent = 'A';
  fontSizeDisplay.setAttribute('aria-hidden', 'true');
  // Increase button with plus icon
  const increaseFontBtn = document.createElement('button');
  increaseFontBtn.className = 'font-size-btn';
  increaseFontBtn.innerHTML = '<i class="fas fa-plus" aria-hidden="true"></i> <span class="sr-only">Increase font size</span>';
  increaseFontBtn.setAttribute('aria-label', 'Increase font size');
  increaseFontBtn.setAttribute('title', 'Increase font size (Larger text)');
  increaseFontBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adjustFontSize(true);
  });
  // Add all elements to container
  fontSizeContainer.appendChild(decreaseFontBtn);
  fontSizeContainer.appendChild(fontSizeDisplay);
  fontSizeContainer.appendChild(increaseFontBtn);
  // Skip to main content link (hidden until focused)
  const skipToContent = document.createElement('a');
  skipToContent.href = '#main-content';
  skipToContent.className = 'skip-to-content';
  skipToContent.textContent = 'Skip to main content';
  skipToContent.setAttribute('tabindex', '0');
  
  // Create a container for accessibility controls
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  
  // Add font size controls first
  controlsContainer.appendChild(fontSizeContainer);
  
  // Add high contrast toggle last
  controlsContainer.appendChild(highContrastBtn);
  
  // Add all controls to accessibility controls
  accessibilityControls.appendChild(controlsContainer);
  
  // Add nav links and accessibility controls to container
  navbarLinksContainer.appendChild(navLinks);
  navbarLinksContainer.appendChild(accessibilityControls);
  
  // Add other navbar elements
  navbar.prepend(skipToContent);
  navbar.appendChild(logo);
  navbar.appendChild(mobileMenuToggle);
  navbar.appendChild(navbarLinksContainer);
  // Mobile menu toggle logic
  mobileMenuToggle.addEventListener("click", () => {
    navbarLinksContainer.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
    const expanded = mobileMenuToggle.classList.contains("active");
    mobileMenuToggle.setAttribute("aria-expanded", String(expanded));
  });
  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll(".navbar-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navbarLinksContainer.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
  // Close mobile menu if clicked outside
  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 768 &&
      !navbarLinksContainer.contains(event.target as Node) &&
      !mobileMenuToggle.contains(event.target as Node) &&
      navbarLinksContainer.classList.contains("active")
    ) {
      navbarLinksContainer.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
  return navbar;
}
// Footer Component
function createFooter(): HTMLElement {
  return document.createElement("footer");
}
// Home Page
function renderHomePage(): HTMLElement {
  const home = document.createElement("div");
  home.className = "page"; // Removed home-page specific class as it's handled by 'page'
  home.setAttribute("role", "main");
  home.id = "home"; // Add ID for nav link highlighting
  // Hero Section
  const heroSection = document.createElement("section");
  heroSection.className = "hero-section content-section";
  const paddleImage = document.createElement("img");
  paddleImage.className = "ping-pong-paddle";
  const heroTitle = document.createElement("h1");
  heroTitle.className = "hero-title";
  heroTitle.textContent = "NEON PONG";
  
  const heroSubtitle = document.createElement("h2");
  heroSubtitle.className = "hero-subtitle";
  heroSubtitle.textContent = "THE ULTIMATE RETRO-FUTURISTIC ARCADE EXPERIENCE.";
  
  const heroDescription = document.createElement("p");
  heroDescription.className = "hero-description";
  heroDescription.textContent = "Challenge your friends in a fast-paced game of skill and reflexes.";
  const heroCta = document.createElement("div");
  heroCta.className = "hero-cta";
  const registerCtaBtn = document.createElement("button");
  registerCtaBtn.className = "primary-button register-cta-button";
  registerCtaBtn.innerHTML = '<i class="fas fa-user-plus"></i> Register Now';
  registerCtaBtn.addEventListener("click", () => navigateTo("/register"));
  heroCta.appendChild(registerCtaBtn);
  heroSection.appendChild(paddleImage);
  heroSection.appendChild(heroTitle);
  heroSection.appendChild(heroSubtitle);
  heroSection.appendChild(heroDescription);
  heroSection.appendChild(heroCta);
  home.appendChild(heroSection);
  // Meet The Team Section
  const teamSection = document.createElement("section");
  teamSection.id = "team"; // Add ID for nav link highlighting
  teamSection.className = "content-section";
  const teamTitle = document.createElement("h2");
  teamTitle.className = "section-title";
  teamTitle.textContent = "Meet the Team";
  teamSection.appendChild(teamTitle);
  const teamGrid = document.createElement("div");
  teamGrid.className = "team-grid";
  const teamMembers = [
    { name: "Hanieh", avatar: "/pic1.png" },
    { name: "Mira", avatar: "/pic2.png" },
    { name: "Fatima Fidha", avatar: "/pic3.png" },
  ];
  teamMembers.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.className = "team-member-card";
    const avatar = document.createElement("img");
    avatar.src = member.avatar;
    avatar.alt = `Avatar of ${member.name}`;
    avatar.className = "team-member-avatar";
    const name = document.createElement("p");
    name.className = "team-member-name";
    name.textContent = member.name;
    memberCard.appendChild(avatar);
    memberCard.appendChild(name);
    teamGrid.appendChild(memberCard);
  });
  teamSection.appendChild(teamGrid);
  home.appendChild(teamSection);
  // Add footer
  home.appendChild(createFooter());
  return home;
}
// Tournament Page (Simplified for dynamic content, actual tournament data will be in renderHomePage)
// Tournament Page (Updated with API integration)
function renderTournamentPage(): HTMLElement {
  const tournamentPage = document.createElement("div");
  tournamentPage.className = "page content-section";
  tournamentPage.id = "tournaments-page";
  tournamentPage.setAttribute("role", "main");
  const title = document.createElement("h1");
  title.className = "section-title";
  title.textContent = "Tournaments";
  tournamentPage.appendChild(title);
  // Create Tournament Button
  const createButton = document.createElement("button");
  createButton.className = "primary-button";
  createButton.style.cssText =
    "margin-bottom: 2rem; display: block; margin-left: auto; margin-right: auto;";
  createButton.innerHTML = '<i class="fas fa-plus"></i> Create Tournament';
  createButton.addEventListener("click", showCreateTournamentModal);
  tournamentPage.appendChild(createButton);
  const tournamentList = document.createElement("div");
  tournamentList.className = "tournament-list";
  tournamentList.setAttribute("role", "list");
  tournamentList.id = "tournament-list-container";
  tournamentPage.appendChild(tournamentList);
  // Load tournaments from API
  loadTournaments(tournamentList);
  tournamentPage.appendChild(createFooter());
  return tournamentPage;
}
//load tournaments from db
async function loadTournaments(container: HTMLElement) {
  showLoading();
  try {
    const result = await apiService.tournaments.getAll();
    if (result.data && result.data.length > 0) {
      container.innerHTML = "";
      result.data.forEach((tournament: any) => {
        const item = document.createElement("div");
        item.className = "tournament-item";
        item.setAttribute("role", "listitem");
        let statusClass = "";
        let buttonText = "";
        let buttonDisabled = false;
        if (tournament.status === "pending") {
          statusClass = "status-open";
          buttonText = "Join Tournament";
        } else if (tournament.status === "started") {
          statusClass = "status-in-progress";
          buttonText = "View Progress";
          buttonDisabled = true;
        } else {
          statusClass = "status-completed";
          buttonText = "View Results";
        }
        item.innerHTML = `
          <h3>${tournament.name}</h3>
          <p class="tournament-status"><span class="status-indicator ${statusClass}"></span> ${
          tournament.status
        }</p>
          <p><strong>Max Players:</strong> ${tournament.max_players}</p>
          <button class="primary-button join-button ${
            tournament.status === "completed" ? "secondary-button" : ""
          }" ${buttonDisabled ? "disabled" : ""}>${buttonText}</button>
        `;
        const joinButton = item.querySelector(
          ".join-button"
        ) as HTMLButtonElement;
        if (joinButton && tournament.status === "pending") {
          joinButton.addEventListener("click", () => {
            console.log(`Joining tournament: ${tournament.name}`);
            // TODO: Implement join tournament functionality
          });
        }
        container.appendChild(item);
      });
    } else {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-color-light); padding: 2rem;">
          <p>No tournaments available. Create one to get started!</p>
        </div>
      `;
    }
  } catch (error) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--error-color); padding: 2rem;">
        <p>Failed to load tournaments. Please try again later.</p>
      </div>
    `;
    console.error("Failed to load tournaments:", error);
  } finally {
    hideLoading();
  }
}
// Combined Login/Register Page
function renderAuthPage(isLogin = true): HTMLElement {
  const authPage = document.createElement("div");
  authPage.className = "page content-section";
  authPage.id = isLogin ? "login" : "register";
  authPage.setAttribute("role", "main");
  
  const formContainer = document.createElement("div");
  formContainer.className = "form-container";
  
  // Toggle between login/register
  const toggleText = document.createElement("p");
  toggleText.className = "text-center mt-4";
  const toggleLink = document.createElement("a");
  toggleLink.href = "#";
  toggleLink.className = "text-blue-500 hover:underline";
  toggleLink.textContent = isLogin ? "Create an ACCOUNT" : "Sign in to existing ACCOUNT";
  toggleLink.addEventListener("click", (e: Event) => {
    e.preventDefault();
    const newPath = isLogin ? "/register" : "/login";
    navigateTo(newPath);
  });
  // Create container for the toggle text
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'toggle-text-container';
  
  // Create the text node with proper styling
  const textNode = document.createElement('span');
  textNode.className = 'toggle-text';
  textNode.textContent = isLogin ? "Don't have an account? " : "Already have an account? ";
  
  // Style the toggle link
  toggleLink.className = 'toggle-link neon-text';
  toggleLink.style.marginLeft = '4px';
  toggleLink.style.textDecoration = 'none';
  toggleLink.style.transition = 'all 0.3s ease';
  toggleLink.style.fontWeight = '600';
  
  // Add hover effect
  toggleLink.addEventListener('mouseenter', () => {
    toggleLink.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.8)';
  });
  
  toggleLink.addEventListener('mouseleave', () => {
    toggleLink.style.textShadow = 'none';
  });
  
  // Append elements
  toggleContainer.appendChild(textNode);
  toggleContainer.appendChild(toggleLink);
  toggleText.appendChild(toggleContainer);

  // Form title
  const title = document.createElement("h2");
  title.className = "form-title";
  title.textContent = isLogin ? "Login to Neon Pong" : "Register for Neon Pong";
  
  // Form element
  const form = document.createElement("form");
  form.noValidate = true;

  // Email field (only for registration)
  let emailInput: HTMLInputElement | null = null;
  if (!isLogin) {
    const emailLabel = document.createElement("label");
    emailLabel.className = "form-label";
    emailLabel.textContent = "Email";
    emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.className = "form-input";
    emailInput.required = true;
    emailInput.placeholder = "Enter your email";
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
  }

  // Username field (always shown)
  const usernameLabel = document.createElement("label");
  usernameLabel.className = "form-label";
  usernameLabel.textContent = "Username";
  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.className = "form-input";
  usernameInput.required = true;
  usernameInput.placeholder = "Choose a username";
  
  // Password field (always shown)
  const passwordLabel = document.createElement("label");
  passwordLabel.className = "form-label";
  passwordLabel.textContent = "Password";
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.className = "form-input";
  passwordInput.required = true;
  passwordInput.placeholder = "Create a password";

  // Confirm Password (only for registration)
  let confirmPasswordInput: HTMLInputElement | null = null;
  let confirmLabel: HTMLLabelElement | null = null;
  if (!isLogin) {
    confirmLabel = document.createElement("label");
    confirmLabel.className = "form-label";
    confirmLabel.textContent = "Confirm Password";
    confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.type = "password";
    confirmPasswordInput.className = "form-input";
    confirmPasswordInput.required = true;
    confirmPasswordInput.placeholder = "Confirm your password";
  }

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "primary-button w-full";
  submitButton.textContent = isLogin ? "Login" : "Register";

  // Back button
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "secondary-button w-full mt-2";
  backButton.textContent = "Back to Home";
  backButton.addEventListener("click", () => navigateTo("/"));

  // Add elements to form in the correct order
  if (!isLogin) {
    // Email field is already added for registration
    form.appendChild(document.createElement('br'));
  }
  
  // Add username
  form.appendChild(usernameLabel);
  form.appendChild(usernameInput);
  form.appendChild(document.createElement('br'));
  
  // Add password
  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  
  // Add confirm password for registration
  if (!isLogin && confirmPasswordInput && confirmLabel) {
    form.appendChild(document.createElement('br'));
    form.appendChild(confirmLabel);
    form.appendChild(confirmPasswordInput);
  }
  
  if (isLogin) {
    form.appendChild(document.createElement('br'));
  }
  form.appendChild(submitButton);
  form.appendChild(backButton);
  
  formContainer.appendChild(title);
  formContainer.appendChild(form);
  formContainer.appendChild(toggleText);
  
  authPage.appendChild(formContainer);
  authPage.appendChild(createFooter());

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!isLogin && passwordInput.value !== confirmPasswordInput?.value) {
      showMessage("Passwords do not match", "error");
      return;
    }

    showLoading();
    try {
      if (isLogin) {
        const result = await apiService.users.login(
          usernameInput.value,
          passwordInput.value
        );
        if (result.data) {
          currentUser = { id: result.data.userId, username: usernameInput.value };
          showMessage("Login successful!", "success");
          navigateTo("/tournament");
        } else {
          showMessage(result.error || "Login failed", "error");
        }
      } else if (emailInput) {
        const result = await apiService.users.register(
          usernameInput.value,
          passwordInput.value,
          emailInput.value
        );
        if (result.data) {
          currentUser = { id: result.data.userId, username: usernameInput.value };
          showMessage("Registration successful!", "success");
          navigateTo("/tournament");
        } else {
          showMessage(result.error || "Registration failed", "error");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      showMessage("An error occurred. Please try again.", "error");
    } finally {
      hideLoading();
    }
  });

  return authPage;
}

// Profile Page
function renderProfilePage(): HTMLElement {
  const profilePage = document.createElement("div");
  profilePage.className = "page content-section";
  profilePage.id = "profile";
  profilePage.setAttribute("role", "main");
  
  // Add a page title
  const pageTitle = document.createElement("h1");
  pageTitle.className = "section-title";
  pageTitle.textContent = "User Profile";
  profilePage.appendChild(pageTitle);
  
  // Create tabs for different sections
  const tabContainer = document.createElement("div");
  tabContainer.className = "profile-tabs";
  
  const tabButtons = document.createElement("div");
  tabButtons.className = "tab-buttons";
  
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "fa-tachometer-alt" },
    { id: "profile-info", label: "Profile Settings", icon: "fa-user-edit" },
    { id: "stats", label: "Statistics", icon: "fa-chart-bar" },
    { id: "friends", label: "Friends", icon: "fa-users" },
    { id: "match-history", label: "Match History", icon: "fa-history" }
  ];
  
  tabs.forEach((tab, index) => {
    const tabButton = document.createElement("button");
    tabButton.className = `tab-button ${index === 0 ? 'active' : ''}`;
    tabButton.dataset.tab = tab.id;
    tabButton.innerHTML = `<i class="fas ${tab.icon}"></i> ${tab.label}`;
    tabButton.addEventListener("click", () => switchTab(tab.id));
    tabButtons.appendChild(tabButton);
  });
  
  tabContainer.appendChild(tabButtons);
  
  // Create tab content area
  const tabContent = document.createElement("div");
  tabContent.className = "tab-content";
  
  // Mock user data - in real app this would come from API
  const mockUserData = {
    username: 'player123',
    displayName: 'Pro Player',
    skillLevel: 'intermediate' as const,
    bio: 'Passionate ping pong player with 5 years of experience!',
    avatar: '/pic1.png',
    wins: 45,
    losses: 23,
    gamesPlayed: 68,
    winRate: 66.2,
    currentStreak: 5,
    longestStreak: 12,
    averageMatchDuration: 22,
    preferredGameMode: '1v1',
    totalPlayTime: 1456, // minutes
    ranking: 42,
    totalPlayers: 1337,
    averageScore: 18.5,
    perfectGames: 3,
    comebacks: 8,
    friends: [
      { id: 1, username: 'friend1', displayName: 'Alice', avatar: '/pic2.png', isOnline: true },
      { id: 2, username: 'friend2', displayName: 'Bob', avatar: '/pic3.png', isOnline: false, lastSeen: new Date('2024-01-15') },
      { id: 3, username: 'friend3', displayName: 'Carol', avatar: '/pic1.png', isOnline: true }
    ],
    matchHistory: [
      { id: 1, opponent: 'Alice', opponentAvatar: '/pic2.png', result: 'win' as const, score: '21-18', date: new Date('2024-01-20'), gameType: '1v1' as const, duration: 25 },
      { id: 2, opponent: 'Bob', opponentAvatar: '/pic3.png', result: 'loss' as const, score: '19-21', date: new Date('2024-01-19'), gameType: '1v1' as const, duration: 30 },
      { id: 3, opponent: 'Carol', opponentAvatar: '/pic1.png', result: 'win' as const, score: '21-15', date: new Date('2024-01-18'), gameType: 'tournament' as const, duration: 20 },
      { id: 4, opponent: 'David', opponentAvatar: '/pic2.png', result: 'win' as const, score: '21-12', date: new Date('2024-01-17'), gameType: '1v1' as const, duration: 18 },
      { id: 5, opponent: 'Eve', opponentAvatar: '/pic3.png', result: 'win' as const, score: '21-16', date: new Date('2024-01-16'), gameType: 'tournament' as const, duration: 28 },
      { id: 6, opponent: 'Frank', opponentAvatar: '/pic1.png', result: 'win' as const, score: '21-19', date: new Date('2024-01-15'), gameType: '1v1' as const, duration: 35 },
      { id: 7, opponent: 'Grace', opponentAvatar: '/pic2.png', result: 'loss' as const, score: '18-21', date: new Date('2024-01-14'), gameType: 'tournament' as const, duration: 22 }
    ],
    weeklyStats: [
      { week: 'Week 1', wins: 8, losses: 2, gamesPlayed: 10 },
      { week: 'Week 2', wins: 12, losses: 3, gamesPlayed: 15 },
      { week: 'Week 3', wins: 6, losses: 4, gamesPlayed: 10 },
      { week: 'Week 4', wins: 10, losses: 5, gamesPlayed: 15 },
      { week: 'Week 5', wins: 9, losses: 9, gamesPlayed: 18 }
    ],
    skillProgression: [
      { month: 'Sep', rating: 1200 },
      { month: 'Oct', rating: 1350 },
      { month: 'Nov', rating: 1420 },
      { month: 'Dec', rating: 1465 },
      { month: 'Jan', rating: 1520 }
    ]
  };
  
  // Dashboard Tab (new)
  const dashboardTab = document.createElement("div");
  dashboardTab.className = "tab-pane active";
  dashboardTab.id = "dashboard";
  dashboardTab.appendChild(createDashboardSection(mockUserData));
  
  // Profile Settings Tab
  const profileInfoTab = document.createElement("div");
  profileInfoTab.className = "tab-pane";
  profileInfoTab.id = "profile-info";
  
  const profileSettings = createProfileSettings(mockUserData);
  profileInfoTab.appendChild(profileSettings);
  
  // Statistics Tab
  const statsTab = document.createElement("div");
  statsTab.className = "tab-pane";
  statsTab.id = "stats";
  statsTab.appendChild(createStatsSection(mockUserData));
  
  // Friends Tab
  const friendsTab = document.createElement("div");
  friendsTab.className = "tab-pane";
  friendsTab.id = "friends";
  friendsTab.appendChild(createFriendsSection(mockUserData.friends));
  
  // Match History Tab
  const historyTab = document.createElement("div");
  historyTab.className = "tab-pane";
  historyTab.id = "match-history";
  historyTab.appendChild(createMatchHistorySection(mockUserData.matchHistory));
  
  tabContent.appendChild(dashboardTab);
  tabContent.appendChild(profileInfoTab);
  tabContent.appendChild(statsTab);
  tabContent.appendChild(friendsTab);
  tabContent.appendChild(historyTab);
  
  tabContainer.appendChild(tabContent);
  profilePage.appendChild(tabContainer);
  
  return profilePage;
}

// Comprehensive Dashboard Section
function createDashboardSection(userData: any): HTMLElement {
  const dashboardContainer = document.createElement("div");
  dashboardContainer.className = "dashboard-section";
  
  // Dashboard Header with Welcome Message
  const dashboardHeader = document.createElement("div");
  dashboardHeader.className = "dashboard-header";
  dashboardHeader.innerHTML = `
    <div class="welcome-banner">
      <h2>Welcome back, ${userData.displayName}!</h2>
      <p>Here's your gaming overview and performance insights</p>
    </div>
  `;
  dashboardContainer.appendChild(dashboardHeader);
  
  // Key Performance Indicators (KPIs)
  const kpiSection = document.createElement("div");
  kpiSection.className = "dashboard-kpis";
  
  const kpiTitle = document.createElement("h3");
  kpiTitle.textContent = "Performance Overview";
  kpiTitle.className = "dashboard-section-title";
  kpiSection.appendChild(kpiTitle);
  
  const kpiGrid = document.createElement("div");
  kpiGrid.className = "kpi-grid";
  
  const kpis = [
    { 
      label: "Current Rank", 
      value: `#${userData.ranking}`, 
      subtitle: `of ${userData.totalPlayers} players`,
      icon: "fa-crown", 
      color: "gold",
      trend: "up"
    },
    { 
      label: "Win Rate", 
      value: `${userData.winRate}%`, 
      subtitle: `${userData.wins}W / ${userData.losses}L`,
      icon: "fa-trophy", 
      color: "success",
      trend: "up"
    },
    { 
      label: "Current Streak", 
      value: userData.currentStreak, 
      subtitle: `Best: ${userData.longestStreak}`,
      icon: "fa-fire", 
      color: "warning",
      trend: "up"
    },
    { 
      label: "Total Play Time", 
      value: `${Math.floor(userData.totalPlayTime / 60)}h ${userData.totalPlayTime % 60}m`, 
      subtitle: `Avg: ${userData.averageMatchDuration}min/game`,
      icon: "fa-clock", 
      color: "info",
      trend: "up"
    }
  ];
  
  kpis.forEach(kpi => {
    const kpiCard = document.createElement("div");
    kpiCard.className = `kpi-card ${kpi.color}`;
    kpiCard.innerHTML = `
      <div class="kpi-header">
        <div class="kpi-icon">
          <i class="fas ${kpi.icon}"></i>
        </div>
        <div class="kpi-trend ${kpi.trend}">
          <i class="fas fa-arrow-${kpi.trend}"></i>
        </div>
      </div>
      <div class="kpi-content">
        <div class="kpi-value">${kpi.value}</div>
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-subtitle">${kpi.subtitle}</div>
      </div>
    `;
    kpiGrid.appendChild(kpiCard);
  });
  
  kpiSection.appendChild(kpiGrid);
  dashboardContainer.appendChild(kpiSection);
  
  // Charts and Analytics Section
  const analyticsSection = document.createElement("div");
  analyticsSection.className = "dashboard-analytics";
  
  const analyticsTitle = document.createElement("h3");
  analyticsTitle.textContent = "Performance Analytics";
  analyticsTitle.className = "dashboard-section-title";
  analyticsSection.appendChild(analyticsTitle);
  
  const chartsContainer = document.createElement("div");
  chartsContainer.className = "charts-container";
  
  // Weekly Performance Chart
  const weeklyChart = createWeeklyPerformanceChart(userData.weeklyStats);
  chartsContainer.appendChild(weeklyChart);
  
  // Skill Progression Chart
  const skillChart = createSkillProgressionChart(userData.skillProgression);
  chartsContainer.appendChild(skillChart);
  
  analyticsSection.appendChild(chartsContainer);
  dashboardContainer.appendChild(analyticsSection);
  
  // Recent Activity and Quick Stats
  const activitySection = document.createElement("div");
  activitySection.className = "dashboard-activity";
  
  const activityRow = document.createElement("div");
  activityRow.className = "activity-row";
  
  // Recent Matches Summary
  const recentMatches = createRecentMatchesSummary(userData.matchHistory.slice(0, 5));
  activityRow.appendChild(recentMatches);
  
  // Advanced Statistics
  const advancedStats = createAdvancedStatsPanel(userData);
  activityRow.appendChild(advancedStats);
  
  activitySection.appendChild(activityRow);
  dashboardContainer.appendChild(activitySection);
  
  // Achievement and Goals Section
  const achievementsSection = createAchievementsSection(userData);
  dashboardContainer.appendChild(achievementsSection);
  
  return dashboardContainer;
}

// Weekly Performance Chart
function createWeeklyPerformanceChart(weeklyStats: any[]): HTMLElement {
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container weekly-chart";
  
  const chartTitle = document.createElement("h4");
  chartTitle.textContent = "Weekly Performance";
  chartContainer.appendChild(chartTitle);
  
  const chartWrapper = document.createElement("div");
  chartWrapper.className = "chart-wrapper";
  
  const maxGames = Math.max(...weeklyStats.map(week => week.gamesPlayed));
  
  weeklyStats.forEach(week => {
    const weekBar = document.createElement("div");
    weekBar.className = "week-bar";
    
    const winHeight = (week.wins / maxGames) * 100;
    const lossHeight = (week.losses / maxGames) * 100;
    
    weekBar.innerHTML = `
      <div class="bar-stack">
        <div class="bar-segment wins" style="height: ${winHeight}%" 
             title="${week.wins} wins"></div>
        <div class="bar-segment losses" style="height: ${lossHeight}%" 
             title="${week.losses} losses"></div>
      </div>
      <div class="bar-label">${week.week}</div>
      <div class="bar-stats">
        <span class="win-count">${week.wins}W</span>
        <span class="loss-count">${week.losses}L</span>
      </div>
    `;
    
    chartWrapper.appendChild(weekBar);
  });
  
  chartContainer.appendChild(chartWrapper);
  
  const chartLegend = document.createElement("div");
  chartLegend.className = "chart-legend";
  chartLegend.innerHTML = `
    <div class="legend-item">
      <div class="legend-color wins"></div>
      <span>Wins</span>
    </div>
    <div class="legend-item">
      <div class="legend-color losses"></div>
      <span>Losses</span>
    </div>
  `;
  chartContainer.appendChild(chartLegend);
  
  return chartContainer;
}

// Skill Progression Chart
function createSkillProgressionChart(skillProgression: any[]): HTMLElement {
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container skill-chart";
  
  const chartTitle = document.createElement("h4");
  chartTitle.textContent = "Skill Rating Progression";
  chartContainer.appendChild(chartTitle);
  
  const chartWrapper = document.createElement("div");
  chartWrapper.className = "line-chart-wrapper";
  
  const maxRating = Math.max(...skillProgression.map(point => point.rating));
  const minRating = Math.min(...skillProgression.map(point => point.rating));
  const ratingRange = maxRating - minRating;
  
  const svgContainer = document.createElement("div");
  svgContainer.className = "svg-chart";
  
  let pathData = "";
  const points: string[] = [];
  
  skillProgression.forEach((point, index) => {
    const x = (index / (skillProgression.length - 1)) * 100;
    const y = ((maxRating - point.rating) / ratingRange) * 100;
    
    if (index === 0) {
      pathData += `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }
    
    points.push(`
      <div class="chart-point" style="left: ${x}%; top: ${y}%"
           title="${point.month}: ${point.rating}">
        <div class="point-value">${point.rating}</div>
      </div>
    `);
  });
  
  svgContainer.innerHTML = `
    <svg viewBox="0 0 100 100" class="line-chart">
      <path d="${pathData}" class="chart-line" />
      <path d="${pathData}" class="chart-line-glow" />
    </svg>
    ${points.join('')}
  `;
  
  chartWrapper.appendChild(svgContainer);
  
  const xAxis = document.createElement("div");
  xAxis.className = "chart-x-axis";
  skillProgression.forEach(point => {
    const label = document.createElement("span");
    label.textContent = point.month;
    xAxis.appendChild(label);
  });
  chartWrapper.appendChild(xAxis);
  
  chartContainer.appendChild(chartWrapper);
  
  return chartContainer;
}

// Recent Matches Summary
function createRecentMatchesSummary(recentMatches: any[]): HTMLElement {
  const container = document.createElement("div");
  container.className = "recent-matches-summary";
  
  const title = document.createElement("h4");
  title.textContent = "Recent Matches";
  container.appendChild(title);
  
  const matchesList = document.createElement("div");
  matchesList.className = "recent-matches-list";
  
  recentMatches.forEach(match => {
    const matchItem = document.createElement("div");
    matchItem.className = `recent-match-item ${match.result}`;
    
    const resultIcon = match.result === 'win' ? 'fa-check-circle' : 'fa-times-circle';
    
    matchItem.innerHTML = `
      <div class="match-result-icon">
        <i class="fas ${resultIcon}"></i>
      </div>
      <div class="match-info">
        <div class="opponent-name">${match.opponent}</div>
        <div class="match-details">${match.score} • ${match.duration}min</div>
      </div>
      <div class="match-date">${match.date.toLocaleDateString()}</div>
    `;
    
    matchesList.appendChild(matchItem);
  });
  
  container.appendChild(matchesList);
  
  const viewAllBtn = document.createElement("button");
  viewAllBtn.className = "secondary-button";
  viewAllBtn.textContent = "View All Matches";
  viewAllBtn.addEventListener("click", () => switchTab("match-history"));
  container.appendChild(viewAllBtn);
  
  return container;
}

// Advanced Statistics Panel
function createAdvancedStatsPanel(userData: any): HTMLElement {
  const container = document.createElement("div");
  container.className = "advanced-stats-panel";
  
  const title = document.createElement("h4");
  title.textContent = "Advanced Statistics";
  container.appendChild(title);
  
  const statsGrid = document.createElement("div");
  statsGrid.className = "advanced-stats-grid";
  
  const advancedStats = [
    { label: "Average Score", value: userData.averageScore, unit: "pts" },
    { label: "Perfect Games", value: userData.perfectGames, unit: "" },
    { label: "Comebacks", value: userData.comebacks, unit: "" },
    { label: "Preferred Mode", value: userData.preferredGameMode, unit: "" }
  ];
  
  advancedStats.forEach(stat => {
    const statItem = document.createElement("div");
    statItem.className = "advanced-stat-item";
    statItem.innerHTML = `
      <div class="stat-value">${stat.value}${stat.unit}</div>
      <div class="stat-label">${stat.label}</div>
    `;
    statsGrid.appendChild(statItem);
  });
  
  container.appendChild(statsGrid);
  
  return container;
}

// Achievements Section
function createAchievementsSection(userData: any): HTMLElement {
  const container = document.createElement("div");
  container.className = "achievements-section";
  
  const title = document.createElement("h3");
  title.textContent = "Achievements & Goals";
  title.className = "dashboard-section-title";
  container.appendChild(title);
  
  const achievementsGrid = document.createElement("div");
  achievementsGrid.className = "achievements-grid";
  
  const achievements = [
    {
      title: "Win Streak Master",
      description: "Win 10 games in a row",
      progress: userData.currentStreak,
      target: 10,
      icon: "fa-fire",
      unlocked: userData.longestStreak >= 10
    },
    {
      title: "Century Club",
      description: "Play 100 total games",
      progress: userData.gamesPlayed,
      target: 100,
      icon: "fa-medal",
      unlocked: userData.gamesPlayed >= 100
    },
    {
      title: "Perfect Player",
      description: "Win a game 21-0",
      progress: userData.perfectGames,
      target: 1,
      icon: "fa-star",
      unlocked: userData.perfectGames >= 1
    },
    {
      title: "Social Butterfly",
      description: "Add 10 friends",
      progress: userData.friends.length,
      target: 10,
      icon: "fa-users",
      unlocked: userData.friends.length >= 10
    }
  ];
  
  achievements.forEach(achievement => {
    const achievementCard = document.createElement("div");
    achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
    
    const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100);
    
    achievementCard.innerHTML = `
      <div class="achievement-icon">
        <i class="fas ${achievement.icon}"></i>
        ${achievement.unlocked ? '<div class="unlock-badge"><i class="fas fa-check"></i></div>' : ''}
      </div>
      <div class="achievement-content">
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-description">${achievement.description}</div>
        <div class="achievement-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="progress-text">${achievement.progress}/${achievement.target}</div>
        </div>
      </div>
    `;
    
    achievementsGrid.appendChild(achievementCard);
  });
  
  container.appendChild(achievementsGrid);
  
  return container;
}

function switchTab(tabId: string) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  document.getElementById(tabId)?.classList.add('active');
}

function createStatsSection(userData: any): HTMLElement {
  const statsContainer = document.createElement("div");
  statsContainer.className = "stats-section";
  
  const statsTitle = document.createElement("h2");
  statsTitle.textContent = "Player Statistics";
  statsContainer.appendChild(statsTitle);
  
  const statsGrid = document.createElement("div");
  statsGrid.className = "stats-grid";
  
  const stats = [
    { label: "Games Played", value: userData.gamesPlayed, icon: "fa-gamepad" },
    { label: "Wins", value: userData.wins, icon: "fa-trophy", color: "success" },
    { label: "Losses", value: userData.losses, icon: "fa-times-circle", color: "danger" },
    { label: "Win Rate", value: `${userData.winRate}%`, icon: "fa-percentage", color: "info" }
  ];
  
  stats.forEach(stat => {
    const statCard = document.createElement("div");
    statCard.className = `stat-card ${stat.color || ''}`;
    statCard.innerHTML = `
      <div class="stat-icon">
        <i class="fas ${stat.icon}"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `;
    statsGrid.appendChild(statCard);
  });
  
  statsContainer.appendChild(statsGrid);
  return statsContainer;
}

function createFriendsSection(friends: any[]): HTMLElement {
  const friendsContainer = document.createElement("div");
  friendsContainer.className = "friends-section";
  
  const friendsHeader = document.createElement("div");
  friendsHeader.className = "section-header";
  
  const friendsTitle = document.createElement("h2");
  friendsTitle.textContent = "Friends List";
  
  const addFriendBtn = document.createElement("button");
  addFriendBtn.className = "primary-button";
  addFriendBtn.innerHTML = '<i class="fas fa-user-plus"></i> Add Friend';
  addFriendBtn.addEventListener("click", showAddFriendModal);
  
  friendsHeader.appendChild(friendsTitle);
  friendsHeader.appendChild(addFriendBtn);
  friendsContainer.appendChild(friendsHeader);
  
  const friendsList = document.createElement("div");
  friendsList.className = "friends-list";
  
  if (friends.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <i class="fas fa-user-friends"></i>
      <p>No friends yet. Start by adding some friends!</p>
    `;
    friendsList.appendChild(emptyState);
  } else {
    friends.forEach(friend => {
      const friendCard = document.createElement("div");
      friendCard.className = "friend-card";
      
      const onlineStatus = friend.isOnline ? 'online' : 'offline';
      const lastSeenText = friend.isOnline ? 'Online' : 
        friend.lastSeen ? `Last seen ${friend.lastSeen.toLocaleDateString()}` : 'Offline';
      
      friendCard.innerHTML = `
        <div class="friend-avatar">
          <img src="${friend.avatar}" alt="${friend.displayName}'s avatar" />
          <div class="status-indicator ${onlineStatus}"></div>
        </div>
        <div class="friend-info">
          <div class="friend-name">${friend.displayName}</div>
          <div class="friend-username">@${friend.username}</div>
          <div class="friend-status ${onlineStatus}">${lastSeenText}</div>
        </div>
        <div class="friend-actions">
          <button class="secondary-button" onclick="challengeFriend('${friend.username}')">
            <i class="fas fa-gamepad"></i> Challenge
          </button>
          <button class="danger-button" onclick="removeFriend(${friend.id})">
            <i class="fas fa-user-minus"></i>
          </button>
        </div>
      `;
      friendsList.appendChild(friendCard);
    });
  }
  
  friendsContainer.appendChild(friendsList);
  return friendsContainer;
}

function createMatchHistorySection(matchHistory: any[]): HTMLElement {
  const historyContainer = document.createElement("div");
  historyContainer.className = "match-history-section";
  
  const historyTitle = document.createElement("h2");
  historyTitle.textContent = "Match History";
  historyContainer.appendChild(historyTitle);
  
  if (matchHistory.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <i class="fas fa-history"></i>
      <p>No matches played yet. Start playing to build your history!</p>
    `;
    historyContainer.appendChild(emptyState);
    return historyContainer;
  }
  
  const historyList = document.createElement("div");
  historyList.className = "match-history-list";
  
  matchHistory.forEach(match => {
    const matchCard = document.createElement("div");
    matchCard.className = `match-card ${match.result}`;
    
    const resultIcon = match.result === 'win' ? 'fa-trophy' : 'fa-times-circle';
    const resultText = match.result === 'win' ? 'Victory' : 'Defeat';
    
    matchCard.innerHTML = `
      <div class="match-result">
        <i class="fas ${resultIcon}"></i>
        <span class="result-text">${resultText}</span>
      </div>
      <div class="match-opponent">
        <img src="${match.opponentAvatar}" alt="${match.opponent}'s avatar" class="opponent-avatar" />
        <div class="opponent-info">
          <div class="opponent-name">${match.opponent}</div>
          <div class="game-type">${match.gameType === '1v1' ? '1v1 Match' : 'Tournament'}</div>
        </div>
      </div>
      <div class="match-details">
        <div class="match-score">${match.score}</div>
        <div class="match-date">${match.date.toLocaleDateString()}</div>
        <div class="match-duration">${match.duration} min</div>
      </div>
    `;
    historyList.appendChild(matchCard);
  });
  
  historyContainer.appendChild(historyList);
  return historyContainer;
}

function showAddFriendModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Friend</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-field">
          <label for="friend-username">Username or Display Name</label>
          <input type="text" id="friend-username" placeholder="Enter username..." />
        </div>
      </div>
      <div class="modal-footer">
        <button class="secondary-button modal-close">Cancel</button>
        <button class="primary-button" onclick="addFriend()">Add Friend</button>
      </div>
    </div>
  `;
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal || (e.target as HTMLElement).classList.contains('modal-close')) {
      modal.remove();
    }
  });
  
  document.body.appendChild(modal);
}

function addFriend() {
  const usernameInput = document.getElementById("friend-username") as HTMLInputElement;
  const username = usernameInput.value.trim();
  
  if (username) {
    showMessage(`Friend request sent to ${username}!`, "success");
    document.querySelector(".modal-overlay")?.remove();
  } else {
    showMessage("Please enter a username", "error");
  }
}

function challengeFriend(username: string) {
  showMessage(`Challenge sent to ${username}!`, "info");
}

function removeFriend(friendId: number) {
  if (confirm("Are you sure you want to remove this friend?")) {
    console.log(`Removing friend with ID: ${friendId}`);
    showMessage("Friend removed", "info");
    // In real app, would call API and refresh the friends list
  }
}

// Make functions global so they can be called from HTML onclick handlers
(window as any).addFriend = addFriend;
(window as any).challengeFriend = challengeFriend;
(window as any).removeFriend = removeFriend;

// Create Tournament Modal
function showCreateTournamentModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.cssText = `
    background: var(--bg-color);
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 0 20px var(--primary-color);
  `;
  modalContent.innerHTML = `
    <h2 style="color: var(--primary-color); margin-bottom: 1.5rem; text-align: center;">Create Tournament</h2>
    <form id="create-tournament-form">
      <label for="tournament-name" style="display: block; margin-bottom: 0.5rem; color: var(--text-color);">Tournament Name:</label>
      <input type="text" id="tournament-name" required style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid var(--primary-color); border-radius: 5px; background: var(--bg-color); color: var(--text-color);">
      <label for="max-players" style="display: block; margin-bottom: 0.5rem; color: var(--text-color);">Max Players:</label>
      <select id="max-players" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid var(--primary-color); border-radius: 5px; background: var(--bg-color); color: var(--text-color);">
        <option value="">Select Players</option>
        <option value="4">4 Players</option>
        <option value="8">8 Players</option>
      </select>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button type="button" id="cancel-tournament" class="secondary-button">Cancel</button>
        <button type="submit" class="primary-button">Create Tournament</button>
      </div>
    </form>
  `;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  const form = modal.querySelector(
    "#create-tournament-form"
  ) as HTMLFormElement;
  const cancelBtn = modal.querySelector(
    "#cancel-tournament"
  ) as HTMLButtonElement;
  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showMessage("Please register first to create a tournament.", "error");
      document.body.removeChild(modal);
      navigateTo("/register");
      return;
    }
    const nameInput = modal.querySelector(
      "#tournament-name"
    ) as HTMLInputElement;
    const playersSelect = modal.querySelector(
      "#max-players"
    ) as HTMLSelectElement;
    const name = nameInput.value.trim();
    const maxPlayers = parseInt(playersSelect.value) as 4 | 8;
    if (!name || !maxPlayers) {
      showMessage("Please fill in all fields.", "error");
      return;
    }
    //will create tournament
    showLoading();
    try {
      const result = await apiService.tournaments.create(
        name,
        maxPlayers,
        currentUser.id
      );
      if (result.data) {
        showMessage(`Tournament "${name}" created successfully!`, "success");
        document.body.removeChild(modal);
        // Refresh tournament page
        if (window.location.pathname === "/tournament") {
          const app = document.getElementById("app");
          if (app) {
            setupRoutes(app);
          }
        }
      } else {
        showMessage(result.error || "Failed to create tournament.", "error");
      }
    } catch (error) {
      showMessage("Failed to create tournament. Please try again.", "error");
      console.error("Tournament creation error:", error);
    } finally {
      hideLoading();
    }
  });
}

// Router setup function
function setupRoutes(app: HTMLElement): void {
  const path = window.location.pathname;
  app.innerHTML = ""; // This clears everything inside #app
  // Create a live region for screen reader announcements.
  let liveRegion = document.getElementById("screen-reader-live-region");
  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.id = "screen-reader-live-region";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "hidden-visually";
    document.body.appendChild(liveRegion); // Append to body to ensure it's always available
  }
  // Define route mapping
  const routes: { [key: string]: () => HTMLElement } = {
    "/": renderHomePage,
    "/login": () => renderAuthPage(true),
    "/register": () => renderAuthPage(false),
    "/tournament": renderTournamentPage,
    "/profile": renderProfilePage,
    "/ACCOUNT": () => renderAuthPage(true)
    // Add other routes as they are implemented
  };
  const renderFunction = routes[path];
  // The main content container within the page that will hold dynamic content
  const pageContentContainer = document.createElement("div");
  pageContentContainer.className = "page-content-wrapper"; // A new wrapper for dynamic content
  app.appendChild(pageContentContainer);
  if (renderFunction) {
    pageContentContainer.appendChild(renderFunction());
    document.title = getPageTitle(path);
  } else {
    const notFound = document.createElement("div");
    notFound.className = "page content-section";
    notFound.id = "not-found";
    notFound.setAttribute("role", "main");
    notFound.innerHTML =
      '<h1 class="section-title">404 - Page Not Found</h1><p style="text-align:center; color: var(--text-color-light);">The page you are looking for does not exist.</p>';
    const backHomeBtn = document.createElement("button");
    backHomeBtn.className = "primary-button back-button";
    backHomeBtn.textContent = "Go to Home";
    backHomeBtn.addEventListener("click", () => navigateTo("/"));
    notFound.appendChild(backHomeBtn);
    notFound.appendChild(createFooter());
    pageContentContainer.appendChild(notFound);
    document.title = "404 - Page Not Found - Neon Pong";
  }
  // The navbar is appended to the body or a specific fixed container, not necessarily #app.
  // We need to ensure it's outside the dynamic content area if it's fixed.
  // For simplicity here, I'll still attach it to app, but if it needs to be fixed at top,
  // HTML structure needs to handle it (e.g., a div above #app or directly in body)
  // Re-append the navbar to ensure it's always there, or manage its position via CSS fixed.
  // Given your index.html has a fixed navbar outside #app's dynamic content,
  // we just need to ensure the correct element is updated.
  // Let's assume the navbar lives *outside* the #app for better fixed positioning.
  // If your index.html structure is different, please re-evaluate where createNavbar() is called.
  // For this scenario, we assume the navbar is already fixed in the DOM, and we just update its active state.
  // Update active navbar link after page render
  document.querySelectorAll(".navbar-link").forEach((link) => {
    link.classList.remove("active");
    // Ensure that '/tournament' matches both '/tournament' and the tournaments page's content ID
    const linkHref = link.getAttribute("href");
    const currentPath = window.location.pathname;
    if (linkHref === currentPath) {
      link.classList.add("active");
    } else if (linkHref === "/" && currentPath === "/") {
      link.classList.add("active");
    }
    // Specific handling for tournament link if it points to /tournament but also highlights based on content ID
    if (currentPath === "/tournament" && linkHref === "/tournament") {
      link.classList.add("active");
    } else if (currentPath === "/register" && linkHref === "/register") {
      link.classList.add("active");
    }
  });
}

// Initial page load
document.addEventListener("DOMContentLoaded", async () => {
  console.log('[App] DOM fully loaded, initializing application...');
  
  console.log('[App] Finding app container...');
  const app = document.getElementById("app");
  if (!app) {
    console.error('[App] Failed to find #app element');
    return;
  }

  // Create and append the navbar first
  console.log('[App] Creating navigation bar...');
  const navbar = createNavbar();
  document.body.insertBefore(navbar, app);
  
  // Add loading overlay if it doesn't exist
  if (!document.getElementById("loading-overlay")) {
    const loadingOverlay = createLoadingOverlay();
    document.body.appendChild(loadingOverlay);
  }

  // Set up routes
  console.log('[App] Setting up routes...');
  setupRoutes(app);
  
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    setupRoutes(app);
  });

  // Ensure home page is shown by default if no route matches
  if (window.location.pathname === '/' || window.location.pathname === '') {
    navigateTo('/');
  }

  console.log('[App] Initialization complete');
});
// Handle browser history changes (back/forward buttons)
window.addEventListener("popstate", () => {
  const app = document.getElementById("app");
  if (app) {
    setupRoutes(app);
  }
});

// Global functions for dashboard and profile features
(window as any).switchTab = switchTab;

