// Global type definitions for the application

export interface User {
  id: number;
  username: string;
  email: string;
  alias?: string;
}

export interface Tournament {
  id: number;
  name: string;
  max_players: number;
  status: 'pending' | 'started' | 'completed';
  created_by: number;
}

export interface UserProfile {
  username: string;
  displayName: string;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
  bio: string;
  avatar: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface JoinTournamentRequest {
  playerAliases: string[];
  userId: number;
}

// Global window extensions
declare global {
  interface Window {
    showMessage: (text: string, type?: 'success' | 'error' | 'info') => void;
    messageTimeout: number | null;
  }
}
