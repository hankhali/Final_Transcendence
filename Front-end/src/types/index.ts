// Global type definitions for the application

export interface User {
  id: number;
  username: string;
  email: string;
  alias?: string;
  isOnline?: boolean;
  lastSeen?: Date;
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
  wins: number;
  losses: number;
  gamesPlayed: number;
  winRate: number;
  friends: Friend[];
  matchHistory: MatchRecord[];
}

export interface Friend {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface MatchRecord {
  id: number;
  opponent: string;
  opponentAvatar: string;
  result: 'win' | 'loss';
  score: string;
  date: Date;
  gameType: '1v1' | 'tournament';
  duration: number; // in minutes
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
