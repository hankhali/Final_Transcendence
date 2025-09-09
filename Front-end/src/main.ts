// This file is a TypeScript module
import "./styles/style.css"; // Ensure your CSS is imported
// import { apiService } from "./services/api.ts"; // Commented out for dummy implementation
import { createProfileSettings } from "./components/ProfileSettings";
import { languageManager } from "./translations";

// Global variables for message display
window.messageTimeout = null;
let currentUser: { id: number; username: string } | null = null;

// Translation update function
function updateAllTranslations(): void {
  const t = languageManager.getTranslations();
  
  // Update navigation links
  const homeLink = document.querySelector('.navbar-link[href="/"]') as HTMLElement;
  const tournamentsLink = document.querySelector('.navbar-link[href="/tournament"]') as HTMLElement;
  const accountLink = document.querySelector('.navbar-link[href="/ACCOUNT"], .navbar-link[href="/logout"]') as HTMLElement;
  const profileLink = document.querySelector('.navbar-link[href="/profile"]') as HTMLElement;
  
  if (homeLink) homeLink.textContent = t.nav.home;
  if (tournamentsLink) tournamentsLink.textContent = t.nav.tournaments;
  if (profileLink) profileLink.textContent = t.nav.profile;
  if (accountLink) {
    accountLink.textContent = isLoggedIn ? t.nav.logout : t.nav.account;
  }
  
  // Update logo
  const logo = document.querySelector('.navbar-logo') as HTMLElement;
  if (logo) logo.textContent = t.common.neonPong;
  
  // Update font size controls
  const fontSizeLabel = document.querySelector('.font-size-controls .sr-only') as HTMLElement;
  if (fontSizeLabel) fontSizeLabel.textContent = t.fontControls.label;
  
  const decreaseFontBtn = document.querySelector('.font-size-btn i.fa-minus') as HTMLElement;
  if (decreaseFontBtn && decreaseFontBtn.parentElement) {
    const srText = decreaseFontBtn.parentElement.querySelector('.sr-only') as HTMLElement;
    if (srText) srText.textContent = t.fontControls.decrease;
    decreaseFontBtn.parentElement.setAttribute('title', t.fontControls.decrease);
  }
  
  const increaseFontBtn = document.querySelector('.font-size-btn i.fa-plus') as HTMLElement;
  if (increaseFontBtn && increaseFontBtn.parentElement) {
    const srText = increaseFontBtn.parentElement.querySelector('.sr-only') as HTMLElement;
    if (srText) srText.textContent = t.fontControls.increase;
    increaseFontBtn.parentElement.setAttribute('title', t.fontControls.increase);
  }
  
  // Re-render current page content with new translations
  const app = document.getElementById("app");
  if (app) {
    setupRoutes(app);
  }
}

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
    case "/logout":
      return "Logged Out - Neon Pong";
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
let fontSizeMultiplier = 0.8;

// Global authentication state
let isLoggedIn = false;
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
  const savedFontSize = parseFloat(localStorage.getItem('fontSizeMultiplier') || '0.8');
  if (savedFontSize >= 0.8 && savedFontSize <= 1.5) {
    fontSizeMultiplier = savedFontSize;
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier.toString());
  } else {
    // Apply default font size if no valid saved preference
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier.toString());
  }
}
// Call init on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
}

// Function to update navbar based on login state
function updateNavbar(): void {
  const t = languageManager.getTranslations();
  const profileLink = document.querySelector('.navbar-link[href="/profile"]') as HTMLElement;
  // Look for account link by either href value since it changes between states
  let accountLink = document.querySelector('.navbar-link[href="/ACCOUNT"]') as HTMLAnchorElement;
  if (!accountLink) {
    accountLink = document.querySelector('.navbar-link[href="/logout"]') as HTMLAnchorElement;
  }
  
  if (profileLink) {
    profileLink.style.display = isLoggedIn ? 'flex' : 'none';
  }
  
  if (accountLink) {
    accountLink.textContent = isLoggedIn ? t.nav.logout : t.nav.account;
    accountLink.href = isLoggedIn ? '/logout' : '/ACCOUNT';
  }
}

// Function to handle login
function handleLogin(username: string): void {
  isLoggedIn = true;
  currentUser = { id: Date.now(), username: username };
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateNavbar();
  showMessage(`Welcome back, ${username}!`, "success");
  navigateTo("/profile");
}

// Function to handle logout
function handleLogout(): void {
  isLoggedIn = false;
  currentUser = null;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  updateNavbar();
  showMessage("Logged out successfully!", "success");
  navigateTo("/");
}

// Function to check stored login state
function checkLoginState(): void {
  const storedLoginState = localStorage.getItem('isLoggedIn');
  const storedUser = localStorage.getItem('currentUser');
  
  if (storedLoginState === 'true' && storedUser) {
    isLoggedIn = true;
    currentUser = JSON.parse(storedUser);
    updateNavbar();
  }
}
// Navbar Component
function createNavbar(): HTMLElement {
  const t = languageManager.getTranslations();
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.setAttribute("aria-label", "Main navigation");
  
  const logo = document.createElement("a");
  logo.className = "navbar-logo";
  logo.textContent = t.common.neonPong;
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
  homeLink.textContent = t.nav.home;
  homeLink.setAttribute("role", "menuitem");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/");
  });
  const tournamentsLink = document.createElement("a");
  tournamentsLink.href = "/tournament";
  tournamentsLink.className = "navbar-link";
  tournamentsLink.textContent = t.nav.tournaments;
  tournamentsLink.setAttribute("role", "menuitem");
  tournamentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/tournament");
  });
  // Combined ACCOUNT tab that toggles between login/register
  const ACCOUNTLink = document.createElement("a");
  ACCOUNTLink.href = "/ACCOUNT";
  ACCOUNTLink.className = "navbar-link";
  ACCOUNTLink.textContent = t.nav.account;
  ACCOUNTLink.setAttribute("role", "menuitem");
  ACCOUNTLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // Handle logout
      handleLogout();
    } else {
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/register") {
        // Toggle between login and register
        const newPath = currentPath === "/login" ? "/register" : "/login";
        navigateTo(newPath);
      } else {
        // Default to login page
        navigateTo("/login");
      }
    }
  });
  navLinks.appendChild(homeLink);
  navLinks.appendChild(tournamentsLink);
  navLinks.appendChild(ACCOUNTLink);
  
  // Profile Link
  const profileLink = document.createElement("a");
  profileLink.href = "/profile";
  profileLink.className = "navbar-link";
  profileLink.textContent = t.nav.profile;
  profileLink.setAttribute("role", "menuitem");
  profileLink.style.display = "none"; // Initially hidden
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/profile");
  });
  
  navLinks.appendChild(profileLink);
  
  // Language Selector
  const languageSelector = document.createElement('div');
  languageSelector.className = 'language-selector';
  languageSelector.setAttribute('aria-label', 'Language selection');
  
  const languageBtn = document.createElement('button');
  languageBtn.className = 'language-btn';
  languageBtn.innerHTML = '🌐 <span class="language-text">EN</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>';
  languageBtn.setAttribute('aria-label', 'Select language');
  languageBtn.setAttribute('aria-expanded', 'false');
  
  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'language-dropdown';
  languageDropdown.setAttribute('role', 'menu');
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  
  languages.forEach(lang => {
    const langOption = document.createElement('button');
    langOption.className = 'language-option';
    langOption.innerHTML = `${lang.flag} ${lang.name}`;
    langOption.setAttribute('role', 'menuitem');
    langOption.dataset.lang = lang.code;
    
    langOption.addEventListener('click', () => {
      languageManager.setLanguage(lang.code);
      languageBtn.innerHTML = `🌐 <span class="language-text">${lang.code.toUpperCase()}</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
      languageDropdown.style.display = 'none';
      languageBtn.setAttribute('aria-expanded', 'false');
      updateAllTranslations();
    });
    
    languageDropdown.appendChild(langOption);
  });
  
  languageBtn.addEventListener('click', () => {
    const isOpen = languageDropdown.style.display === 'block';
    languageDropdown.style.display = isOpen ? 'none' : 'block';
    languageBtn.setAttribute('aria-expanded', (!isOpen).toString());
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageSelector.contains(e.target as Node)) {
      languageDropdown.style.display = 'none';
      languageBtn.setAttribute('aria-expanded', 'false');
    }
  });
  
  languageSelector.appendChild(languageBtn);
  languageSelector.appendChild(languageDropdown);
  
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
  fontSizeLabel.textContent = t.fontControls.label;
  fontSizeContainer.appendChild(fontSizeLabel);
  // Decrease button with minus icon
  const decreaseFontBtn = document.createElement('button');
  decreaseFontBtn.className = 'font-size-btn';
  decreaseFontBtn.innerHTML = `<i class="fas fa-minus" aria-hidden="true"></i> <span class="sr-only">${t.fontControls.decrease}</span>`;
  decreaseFontBtn.setAttribute('aria-label', t.fontControls.decrease);
  decreaseFontBtn.setAttribute('title', t.fontControls.decrease);
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
  increaseFontBtn.innerHTML = `<i class="fas fa-plus" aria-hidden="true"></i> <span class="sr-only">${t.fontControls.increase}</span>`;
  increaseFontBtn.setAttribute('aria-label', t.fontControls.increase);
  increaseFontBtn.setAttribute('title', t.fontControls.increase);
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
  
  // Add language selector first
  controlsContainer.appendChild(languageSelector);
  
  // Add font size controls second
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
  const t = languageManager.getTranslations();
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
  heroTitle.textContent = t.home.title;
  
  const heroSubtitle = document.createElement("h2");
  heroSubtitle.className = "hero-subtitle";
  heroSubtitle.textContent = t.home.tagline;
  
  const heroDescription = document.createElement("p");
  heroDescription.className = "hero-description";
  heroDescription.textContent = t.home.description;
  const heroCta = document.createElement("div");
  heroCta.className = "hero-cta";
  const registerCtaBtn = document.createElement("button");
  registerCtaBtn.className = "primary-button register-cta-button";
  registerCtaBtn.innerHTML = `<i class="fas fa-user-plus"></i> ${t.home.registerNow}`;
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
  teamTitle.textContent = t.home.meetTheTeam;
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
  const t = languageManager.getTranslations();
  const tournamentPage = document.createElement("div");
  tournamentPage.className = "page content-section";
  tournamentPage.id = "tournaments-page";
  tournamentPage.setAttribute("role", "main");
  
  // Premium Hero section for tournaments
  const heroSection = document.createElement("div");
  heroSection.className = "tournament-hero-premium";
  heroSection.innerHTML = `
    <div class="hero-background-effects">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>
    
    <div class="tournament-hero-content">
      <div class="premium-badge">
        <span>${t.tournaments.elite}</span>
      </div>
      
      <div class="tournament-icon-premium">
        <div class="icon-glow"></div>
        <i class="fas fa-crown"></i>
      </div>
      
      <h1 class="tournament-hero-title-premium">
        <span class="title-line-1">${t.tournaments.championship}</span>
        <span class="title-line-2">${t.tournaments.arena}</span>
      </h1>
      
      <p class="tournament-hero-subtitle-premium">
        ${t.tournaments.subtitle}
      </p>
      
      <div class="tournament-stats-grid">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">4</span>
            <span class="stat-label">${t.tournaments.stats.elitePlayers}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">1</span>
            <span class="stat-label">${t.tournaments.stats.champion}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">∞</span>
            <span class="stat-label">${t.tournaments.stats.glory}</span>
          </div>
        </div>
      </div>
      
      <div class="tournament-features-premium">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-chess"></i>
          </div>
          <h3>${t.tournaments.features.strategic.title}</h3>
          <p>${t.tournaments.features.strategic.description}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-medal"></i>
          </div>
          <h3>${t.tournaments.features.prestige.title}</h3>
          <p>${t.tournaments.features.prestige.description}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-fire"></i>
          </div>
          <h3>${t.tournaments.features.competition.title}</h3>
          <p>${t.tournaments.features.competition.description}</p>
        </div>
      </div>
    </div>
  `;
  tournamentPage.appendChild(heroSection);
  
  // Premium Create tournament section
  const createSection = document.createElement("div");
  createSection.className = "tournament-create-section-premium";
  
  console.log("Tournament page - isLoggedIn:", isLoggedIn, "currentUser:", currentUser);
  
  if (isLoggedIn && currentUser) {
    createSection.innerHTML = `
      <div class="create-tournament-card-premium">
        <div class="card-shimmer"></div>
        <div class="card-content">
          <div class="create-icon-premium">
            <div class="icon-rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
            </div>
            <i class="fas fa-plus"></i>
          </div>
          
          <div class="create-text-content">
            <h2 class="create-title-premium">${t.tournaments.createCard.title}</h2>
            <p class="create-description-premium">
              ${t.tournaments.createCard.description}
            </p>
            
            <div class="tournament-benefits">
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${t.tournaments.createCard.benefits.bracket}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${t.tournaments.createCard.benefits.progress}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${t.tournaments.createCard.benefits.ceremony}</span>
              </div>
            </div>
          </div>
          
          <button class="create-tournament-btn-premium" id="create-tournament-btn">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-crown"></i>
              <span>${t.tournaments.createCard.button}</span>
            </span>
          </button>
        </div>
      </div>
    `;
    
    const createBtn = createSection.querySelector('#create-tournament-btn') as HTMLButtonElement;
    createBtn?.addEventListener("click", showCreateTournamentModal);
  } else {
    createSection.innerHTML = `
      <div class="create-tournament-card-premium login-required">
        <div class="card-shimmer"></div>
        <div class="card-content">
          <div class="create-icon-premium locked">
            <div class="icon-rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
            </div>
            <i class="fas fa-lock"></i>
          </div>
          
          <div class="create-text-content">
            <h2 class="create-title-premium">${t.tournaments.loginRequired.title}</h2>
            <p class="create-description-premium">
              ${t.tournaments.loginRequired.description}
            </p>
            
            <div class="login-benefits">
              <div class="benefit-item">
                <i class="fas fa-star"></i>
                <span>${t.tournaments.loginRequired.benefits.access}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-star"></i>
                <span>${t.tournaments.loginRequired.benefits.status}</span>
              </div>
            </div>
          </div>
          
          <button class="create-tournament-btn-premium" onclick="navigateTo('/ACCOUNT')">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-key"></i>
              <span>${t.tournaments.loginRequired.button}</span>
            </span>
          </button>
        </div>
      </div>
    `;
  }
  
  tournamentPage.appendChild(createSection);
  tournamentPage.appendChild(createFooter());
  return tournamentPage;
}

// Combined Login/Register Page
function renderAuthPage(isLogin = true): HTMLElement {
  const t = languageManager.getTranslations();
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
  toggleLink.textContent = isLogin ? t.auth.login.createAccount : t.auth.register.signIn;
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
  textNode.textContent = isLogin ? t.auth.login.noAccount : t.auth.register.hasAccount;
  
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
  title.textContent = isLogin ? t.auth.login.title : t.auth.register.title;
  
  // Form element
  const form = document.createElement("form");
  form.noValidate = true;

  // Email field (only for registration)
  let emailInput: HTMLInputElement | null = null;
  if (!isLogin) {
    const emailLabel = document.createElement("label");
    emailLabel.className = "form-label";
    emailLabel.textContent = t.auth.register.email;
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
  usernameLabel.textContent = isLogin ? t.auth.login.username : t.auth.register.username;
  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.className = "form-input";
  usernameInput.required = true;
  usernameInput.placeholder = "Choose a username";
  
  // Password field (always shown)
  const passwordLabel = document.createElement("label");
  passwordLabel.className = "form-label";
  passwordLabel.textContent = isLogin ? t.auth.login.password : t.auth.register.password;
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
    confirmLabel.textContent = t.auth.register.confirmPassword;
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
  submitButton.textContent = isLogin ? t.auth.login.button : t.auth.register.button;

  // Back button
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "secondary-button w-full mt-2";
  backButton.textContent = isLogin ? t.auth.login.backToHome : t.auth.register.backToHome;
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
        // Dummy login - just check if username and password are not empty
        if (usernameInput.value.trim() && passwordInput.value.trim()) {
          handleLogin(usernameInput.value);
        } else {
          showMessage("Please enter both username and password", "error");
        }
      } else if (emailInput) {
        // Dummy registration - just check if all fields are filled
        if (usernameInput.value.trim() && passwordInput.value.trim() && emailInput.value.trim()) {
          handleLogin(usernameInput.value);
          showMessage("Registration successful!", "success");
        } else {
          showMessage("Please fill in all fields", "error");
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
  const t = languageManager.getTranslations();
  const profilePage = document.createElement("div");
  profilePage.className = "page content-section";
  profilePage.id = "profile";
  profilePage.setAttribute("role", "main");
  
  // Add a page title
  const pageTitle = document.createElement("h1");
  pageTitle.className = "section-title";
  pageTitle.textContent = t.profile.title;
  profilePage.appendChild(pageTitle);
  
  // Create tabs for different sections
  const tabContainer = document.createElement("div");
  tabContainer.className = "profile-tabs";
  
  const tabButtons = document.createElement("div");
  tabButtons.className = "tab-buttons";
  
  const tabs = [
    { id: "dashboard", label: t.profile.tabs.dashboard, icon: "fa-tachometer-alt" },
    { id: "profile-info", label: t.profile.tabs.settings, icon: "fa-user-edit" },
    { id: "stats", label: t.profile.tabs.statistics, icon: "fa-chart-bar" },
    { id: "friends", label: t.profile.tabs.friends, icon: "fa-users" },
    { id: "match-history", label: t.profile.tabs.history, icon: "fa-history" }
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
  const t = languageManager.getTranslations();
  const dashboardContainer = document.createElement("div");
  dashboardContainer.className = "dashboard-section";
  
  // Dashboard Header with Welcome Message
  const dashboardHeader = document.createElement("div");
  dashboardHeader.className = "dashboard-header";
  dashboardHeader.innerHTML = `
    <div class="welcome-banner">
      <h2>${t.profile.dashboard.welcome}</h2>
      <p>${t.profile.dashboard.overview}</p>
    </div>
  `;
  dashboardContainer.appendChild(dashboardHeader);
  
  // Key Performance Indicators (KPIs)
  const kpiSection = document.createElement("div");
  kpiSection.className = "dashboard-kpis";
  
  const kpiTitle = document.createElement("h3");
  kpiTitle.textContent = t.profile.dashboard.overview;
  kpiTitle.className = "dashboard-section-title";
  kpiSection.appendChild(kpiTitle);
  
  const kpiGrid = document.createElement("div");
  kpiGrid.className = "kpi-grid";
  
  const kpis = [
    { 
      label: t.profile.dashboard.rank, 
      value: `#${userData.ranking}`, 
      subtitle: `${t.profile.dashboard.of} ${userData.totalPlayers} ${t.profile.dashboard.players}`,
      icon: "fa-crown", 
      color: "gold",
      trend: "up"
    },
    { 
      label: t.profile.dashboard.winRate, 
      value: `${userData.winRate}%`, 
      subtitle: `${userData.wins}W / ${userData.losses}L`,
      icon: "fa-trophy", 
      color: "success",
      trend: "up"
    },
    { 
      label: t.profile.dashboard.streak, 
      value: userData.currentStreak, 
      subtitle: `${t.profile.dashboard.best}: ${userData.longestStreak}`,
      icon: "fa-fire", 
      color: "warning",
      trend: "up"
    },
    { 
      label: t.profile.dashboard.playTime, 
      value: `${Math.floor(userData.totalPlayTime / 60)}h ${userData.totalPlayTime % 60}m`, 
      subtitle: `${t.profile.dashboard.avg}: ${userData.averageMatchDuration}min/game`,
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
  analyticsTitle.textContent = t.profile.dashboard.analytics;
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
  const t = languageManager.getTranslations();
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container weekly-chart";
  
  const chartTitle = document.createElement("h4");
  chartTitle.textContent = t.profile.dashboard.weekly;
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
      <span>${t.profile.dashboard.wins}</span>
    </div>
    <div class="legend-item">
      <div class="legend-color losses"></div>
      <span>${t.profile.dashboard.losses}</span>
    </div>
  `;
  chartContainer.appendChild(chartLegend);
  
  return chartContainer;
}

// Skill Progression Chart
function createSkillProgressionChart(skillProgression: any[]): HTMLElement {
  const t = languageManager.getTranslations();
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container skill-chart";
  
  const chartTitle = document.createElement("h4");
  chartTitle.textContent = t.profile.dashboard.rating;
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
  const t = languageManager.getTranslations();
  const container = document.createElement("div");
  container.className = "recent-matches-summary";
  
  const title = document.createElement("h4");
  title.textContent = t.profile.dashboard.recent;
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
  viewAllBtn.textContent = t.profile.dashboard.viewAll;
  viewAllBtn.addEventListener("click", () => switchTab("match-history"));
  container.appendChild(viewAllBtn);
  
  return container;
}

// Advanced Statistics Panel
function createAdvancedStatsPanel(userData: any): HTMLElement {
  const t = languageManager.getTranslations();
  const container = document.createElement("div");
  container.className = "advanced-stats-panel";
  
  const title = document.createElement("h4");
  title.textContent = t.profile.dashboard.advanced;
  container.appendChild(title);
  
  const statsGrid = document.createElement("div");
  statsGrid.className = "advanced-stats-grid";
  
  const advancedStats = [
    { label: t.profile.dashboard.avgScore, value: userData.averageScore, unit: "pts" },
    { label: t.profile.dashboard.perfectGames, value: userData.perfectGames, unit: "" },
    { label: t.profile.dashboard.comebacks, value: userData.comebacks, unit: "" },
    { label: t.profile.dashboard.preferredMode, value: userData.preferredGameMode, unit: "" }
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
  const t = languageManager.getTranslations();
  const container = document.createElement("div");
  container.className = "achievements-section";
  
  const title = document.createElement("h3");
  title.textContent = t.profile.dashboard.achievements;
  title.className = "dashboard-section-title";
  container.appendChild(title);
  
  const achievementsGrid = document.createElement("div");
  achievementsGrid.className = "achievements-grid";
  
  const achievements = [
    {
      title: t.profile.dashboard.winStreakMaster,
      description: t.profile.dashboard.winStreakDesc,
      progress: userData.currentStreak,
      target: 10,
      icon: "fa-fire",
      unlocked: userData.longestStreak >= 10
    },
    {
      title: t.profile.dashboard.centuryClub,
      description: t.profile.dashboard.centuryDesc,
      progress: userData.gamesPlayed,
      target: 100,
      icon: "fa-medal",
      unlocked: userData.gamesPlayed >= 100
    },
    {
      title: t.profile.dashboard.perfectPlayer,
      description: t.profile.dashboard.perfectDesc,
      progress: userData.perfectGames,
      target: 1,
      icon: "fa-star",
      unlocked: userData.perfectGames >= 1
    },
    {
      title: t.profile.dashboard.socialButterfly,
      description: t.profile.dashboard.socialDesc,
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
  const t = languageManager.getTranslations();
  const statsContainer = document.createElement("div");
  statsContainer.className = "stats-section";
  
  const statsTitle = document.createElement("h2");
  statsTitle.textContent = t.profile.statistics.title;
  statsContainer.appendChild(statsTitle);
  
  const statsGrid = document.createElement("div");
  statsGrid.className = "stats-grid";
  
  const stats = [
    { label: t.profile.statistics.gamesPlayed, value: userData.gamesPlayed, icon: "fa-gamepad" },
    { label: t.profile.statistics.wins, value: userData.wins, icon: "fa-trophy", color: "success" },
    { label: t.profile.statistics.losses, value: userData.losses, icon: "fa-times-circle", color: "danger" },
    { label: t.profile.statistics.winRate, value: `${userData.winRate}%`, icon: "fa-percentage", color: "info" }
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
  const t = languageManager.getTranslations();
  const friendsContainer = document.createElement("div");
  friendsContainer.className = "friends-section";
  
  const friendsHeader = document.createElement("div");
  friendsHeader.className = "section-header";
  
  const friendsTitle = document.createElement("h2");
  friendsTitle.textContent = t.profile.friends.title;
  
  const addFriendBtn = document.createElement("button");
  addFriendBtn.className = "primary-button";
  addFriendBtn.innerHTML = `<i class="fas fa-user-plus"></i> ${t.profile.friends.addFriend}`;
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
      const lastSeenText = friend.isOnline ? t.profile.friends.online : 
        friend.lastSeen ? `${t.profile.friends.lastSeen} ${friend.lastSeen.toLocaleDateString()}` : 'Offline';
      
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
            <i class="fas fa-gamepad"></i> ${t.profile.friends.challenge}
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
  const t = languageManager.getTranslations();
  const historyContainer = document.createElement("div");
  historyContainer.className = "match-history-section";
  
  const historyTitle = document.createElement("h2");
  historyTitle.textContent = t.profile.history.title;
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
    const resultText = match.result === 'win' ? t.profile.history.victory : t.profile.history.defeat;
    
    matchCard.innerHTML = `
      <div class="match-result">
        <i class="fas ${resultIcon}"></i>
        <span class="result-text">${resultText}</span>
      </div>
      <div class="match-opponent">
        <img src="${match.opponentAvatar}" alt="${match.opponent}'s avatar" class="opponent-avatar" />
        <div class="opponent-info">
          <div class="opponent-name">${match.opponent}</div>
          <div class="game-type">${match.gameType === '1v1' ? t.profile.history.match1v1 : t.profile.history.tournament}</div>
        </div>
      </div>
      <div class="match-details">
        <div class="match-score">${match.score}</div>
        <div class="match-date">${match.date.toLocaleDateString()}</div>
        <div class="match-duration">${match.duration} ${t.profile.history.min}</div>
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
  console.log("showCreateTournamentModal called - isLoggedIn:", isLoggedIn, "currentUser:", currentUser);
  
  // Check if user is logged in
  if (!isLoggedIn || !currentUser) {
    showMessage("Please login to create tournaments.", "error");
    navigateTo("/ACCOUNT");
    return;
  }

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
    background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98));
    backdrop-filter: blur(20px);
    border: 2px solid rgba(0, 230, 255, 0.3);
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 230, 255, 0.2);
    max-height: 90vh;
    overflow-y: auto;
  `;
  
  modalContent.innerHTML = `
    <h2 style="color: #00e6ff; margin-bottom: 1.5rem; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Create Local Tournament</h2>
    
    <form id="create-tournament-form">
      <div style="margin-bottom: 1.5rem;">
        <label for="tournament-name" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.9); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.9rem;">Tournament Name:</label>
        <input type="text" id="tournament-name" required placeholder="Enter tournament name..." style="width: 100%; padding: 1rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 8px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 0.95rem;">
      </div>
      
      <div style="background: linear-gradient(135deg, rgba(0, 230, 255, 0.05), rgba(255, 0, 255, 0.05)); border: 1px solid rgba(0, 230, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="color: #00e6ff; margin-bottom: 1rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fas fa-users"></i> Enter 4 Player Names
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label for="player1" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 1:</label>
            <input type="text" id="player1" required placeholder="Enter player 1 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player2" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 2:</label>
            <input type="text" id="player2" required placeholder="Enter player 2 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player3" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 3:</label>
            <input type="text" id="player3" required placeholder="Enter player 3 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player4" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 4:</label>
            <input type="text" id="player4" required placeholder="Enter player 4 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 230, 255, 0.1); border-radius: 8px; border: 1px solid rgba(0, 230, 255, 0.2);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <i class="fas fa-trophy" style="color: #ffd700;"></i>
            <span style="color: rgba(255, 255, 255, 0.9); font-weight: 600; font-size: 0.9rem;">Tournament Format:</span>
          </div>
          <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem; line-height: 1.4;">
            <strong>Semi-Finals:</strong> Player 1 vs Player 2, Player 3 vs Player 4<br>
            <strong>Finals:</strong> Winners advance to championship match
          </p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
        <button type="button" id="cancel-tournament" class="secondary-button" style="padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Cancel</button>
        <button type="submit" class="primary-button" style="padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background: linear-gradient(135deg, #00e6ff, #ff00ff);">
          <i class="fas fa-trophy"></i> Start Tournament
        </button>
      </div>
    </form>
  `;
  
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  const form = modal.querySelector("#create-tournament-form") as HTMLFormElement;
  const cancelBtn = modal.querySelector("#cancel-tournament") as HTMLButtonElement;
  
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
    
    const nameInput = modal.querySelector("#tournament-name") as HTMLInputElement;
    const player1Input = modal.querySelector("#player1") as HTMLInputElement;
    const player2Input = modal.querySelector("#player2") as HTMLInputElement;
    const player3Input = modal.querySelector("#player3") as HTMLInputElement;
    const player4Input = modal.querySelector("#player4") as HTMLInputElement;
    
    const tournamentName = nameInput.value.trim();
    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();
    const player3 = player3Input.value.trim();
    const player4 = player4Input.value.trim();
    
    if (!tournamentName || !player1 || !player2 || !player3 || !player4) {
      showMessage("Please fill in all fields.", "error");
      return;
    }
    
    // Check for duplicate names
    const players = [player1, player2, player3, player4];
    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== 4) {
      showMessage("All player names must be unique.", "error");
      return;
    }
    
    // Create tournament
    showLoading();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create tournament data
      const tournament = {
        id: Date.now(),
        name: tournamentName,
        players: [player1, player2, player3, player4],
        createdBy: currentUser?.username || 'Unknown',
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active',
        bracket: {
          semifinals: [
            { player1: player1, player2: player2, winner: null },
            { player1: player3, player2: player4, winner: null }
          ],
          finals: { player1: null, player2: null, winner: null }
        }
      };
      
      // Store tournament in localStorage for demo
      const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
      tournaments.push(tournament);
      localStorage.setItem('tournaments', JSON.stringify(tournaments));
      
      document.body.removeChild(modal);
      showMessage(`Tournament "${tournamentName}" created successfully! 🏆`, "success");
      
      // Navigate to tournament bracket view
      showTournamentBracket(tournament);
      
    } catch (error) {
      showMessage("Error creating tournament. Please try again.", "error");
    } finally {
      hideLoading();
    }
  });
}

// Function to show tournament bracket
function showTournamentBracket(tournament: any) {
  const app = document.getElementById("app");
  if (!app) return;
  
  app.innerHTML = `
    <div class="tournament-bracket-page">
      <div class="tournament-header">
        <div class="back-button" onclick="navigateTo('/tournament')">
          <i class="fas fa-arrow-left"></i> Back to Tournaments
        </div>
        <h1 class="tournament-title">${tournament.name}</h1>
        <div class="tournament-meta">
          <span>Created by: ${tournament.createdBy}</span>
          <span>Date: ${tournament.createdDate}</span>
        </div>
      </div>
      
      <div class="bracket-container">
        <div class="bracket-round">
          <h2 class="round-title">Semi-Finals</h2>
          
          <div class="match-container">
            <div class="match" id="match-1">
              <div class="match-header">Match 1 - Semi-Final</div>
              <div class="players">
                <div class="player ${tournament.bracket.semifinals[0].winner === tournament.bracket.semifinals[0].player1 ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[0].player1}">
                  ${tournament.bracket.semifinals[0].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${tournament.bracket.semifinals[0].winner === tournament.bracket.semifinals[0].player2 ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[0].player2}">
                  ${tournament.bracket.semifinals[0].player2}
                </div>
              </div>
              ${!tournament.bracket.semifinals[0].winner ? `
                <div class="match-actions">
                  <button class="start-match-btn" onclick="startMatch(0, '${tournament.bracket.semifinals[0].player1}', '${tournament.bracket.semifinals[0].player2}')">
                    <i class="fas fa-play"></i> Start Match 1
                  </button>
                </div>
              ` : `
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${tournament.bracket.semifinals[0].winner}
                </div>
              `}
            </div>
            
            <div class="match ${!tournament.bracket.semifinals[0].winner ? 'match-locked' : ''}" id="match-2">
              <div class="match-header">
                Match 2 - Semi-Final
                ${!tournament.bracket.semifinals[0].winner ? '<span class="locked-indicator"><i class="fas fa-lock"></i> Locked</span>' : ''}
              </div>
              <div class="players">
                <div class="player ${tournament.bracket.semifinals[1].winner === tournament.bracket.semifinals[1].player1 ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[1].player1}">
                  ${tournament.bracket.semifinals[1].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${tournament.bracket.semifinals[1].winner === tournament.bracket.semifinals[1].player2 ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[1].player2}">
                  ${tournament.bracket.semifinals[1].player2}
                </div>
              </div>
              ${!tournament.bracket.semifinals[1].winner ? `
                <div class="match-actions">
                  ${tournament.bracket.semifinals[0].winner ? `
                    <button class="start-match-btn" onclick="startMatch(1, '${tournament.bracket.semifinals[1].player1}', '${tournament.bracket.semifinals[1].player2}')">
                      <i class="fas fa-play"></i> Start Match 2
                    </button>
                  ` : `
                    <button class="start-match-btn locked-btn" disabled>
                      <i class="fas fa-lock"></i> Waiting for Match 1
                    </button>
                    <p class="waiting-message">Match 1 must finish first</p>
                  `}
                </div>
              ` : `
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${tournament.bracket.semifinals[1].winner}
                </div>
              `}
            </div>
          </div>
        </div>
        
        <div class="bracket-arrow">
          <i class="fas fa-arrow-right"></i>
        </div>
        
        <div class="bracket-round">
          <h2 class="round-title">Finals</h2>
          
          <div class="match-container">
            <div class="match finals-match" id="finals-match">
              <div class="match-header">Championship Finals</div>
              ${tournament.bracket.semifinals[0].winner && tournament.bracket.semifinals[1].winner ? `
                <div class="players">
                  <div class="player ${tournament.bracket.finals.winner === tournament.bracket.semifinals[0].winner ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[0].winner}">
                    ${tournament.bracket.semifinals[0].winner}
                  </div>
                  <div class="vs">VS</div>
                  <div class="player ${tournament.bracket.finals.winner === tournament.bracket.semifinals[1].winner ? 'winner' : ''}" data-player="${tournament.bracket.semifinals[1].winner}">
                    ${tournament.bracket.semifinals[1].winner}
                  </div>
                </div>
                ${!tournament.bracket.finals.winner ? `
                  <div class="match-actions">
                    <button class="start-match-btn" onclick="startFinalsMatch('${tournament.bracket.semifinals[0].winner}', '${tournament.bracket.semifinals[1].winner}')">
                      <i class="fas fa-crown"></i> Start Finals
                    </button>
                  </div>
                ` : `
                  <div class="champion-announcement">
                    <i class="fas fa-crown"></i>
                    <span>Tournament Champion:</span>
                    <div class="champion-name">${tournament.bracket.finals.winner}</div>
                  </div>
                `}
              ` : `
                <div class="waiting-players">
                  <div class="waiting-text">Waiting for semi-final winners...</div>
                  <div class="vs">VS</div>
                  <div class="waiting-text">Waiting for semi-final winners...</div>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Store current tournament in global scope for match functions
  (window as any).currentTournament = tournament;
}

// Match handling functions
(window as any).startMatch = function(matchIndex: number, player1: string, player2: string) {
  showMessage(`Starting match: ${player1} vs ${player2}`, "info");
  
  // Show match selection modal
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
  
  modal.innerHTML = `
    <div class="modal-content" style="background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98)); backdrop-filter: blur(20px); border: 2px solid rgba(0, 230, 255, 0.3); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; text-align: center;">
      <h2 style="color: #00e6ff; margin-bottom: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        <i class="fas fa-play"></i> Semi-Final Match
      </h2>
      <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem;">
        Who won the match?
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
        <button class="winner-btn" onclick="declareWinner(${matchIndex}, '${player1}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${player1}
        </button>
        <button class="winner-btn" onclick="declareWinner(${matchIndex}, '${player2}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${player2}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
};

(window as any).declareWinner = function(matchIndex: number, winner: string) {
  const tournament = (window as any).currentTournament;
  
  // Update tournament data
  tournament.bracket.semifinals[matchIndex].winner = winner;
  
  // Update localStorage
  const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
  const tournamentIndex = tournaments.findIndex((t: any) => t.id === tournament.id);
  if (tournamentIndex !== -1) {
    tournaments[tournamentIndex] = tournament;
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
  }
  
  // Remove modal
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
  
  // Refresh bracket display
  showTournamentBracket(tournament);
  
  // Show appropriate message based on which match finished
  if (matchIndex === 0) {
    showMessage(`🏆 ${winner} wins Match 1! Match 2 is now unlocked! 🎉`, "success");
  } else {
    showMessage(`🏆 ${winner} wins Match 2! Both semi-finals complete! 🎉`, "success");
  }
};

(window as any).startFinalsMatch = function(player1: string, player2: string) {
  showMessage(`Starting Finals: ${player1} vs ${player2}`, "info");
  
  // Show finals selection modal
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
  
  modal.innerHTML = `
    <div class="modal-content" style="background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98)); backdrop-filter: blur(20px); border: 2px solid rgba(255, 215, 0, 0.3); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; text-align: center;">
      <h2 style="color: #ffd700; margin-bottom: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        <i class="fas fa-crown"></i> Championship Finals
      </h2>
      <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem;">
        Who is the Tournament Champion?
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
        <button class="winner-btn" onclick="declareChampion('${player1}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${player1}
        </button>
        <button class="winner-btn" onclick="declareChampion('${player2}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${player2}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
};

(window as any).declareChampion = function(champion: string) {
  const tournament = (window as any).currentTournament;
  
  // Update tournament data
  tournament.bracket.finals.winner = champion;
  tournament.status = 'completed';
  
  // Update localStorage
  const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
  const tournamentIndex = tournaments.findIndex((t: any) => t.id === tournament.id);
  if (tournamentIndex !== -1) {
    tournaments[tournamentIndex] = tournament;
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
  }
  
  // Remove modal
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
  
  // Refresh bracket display
  showTournamentBracket(tournament);
  
  showMessage(`🏆 ${champion} is the Tournament Champion! 🏆`, "success");
};

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
    "/ACCOUNT": () => renderAuthPage(true),
    "/logout": () => {
      handleLogout();
      return renderHomePage();
    }
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
  
  // Initialize translation system
  console.log('[App] Initializing translation system...');
  languageManager.addListener(() => {
    // Update the navbar when language changes
    updateNavbar();
  });
  
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
  
  // Check login state after navbar is created
  console.log('[App] Checking login state...');
  checkLoginState();
  
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

