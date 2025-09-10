import type { ApiResponse, Tournament, User } from '../types/index.js';

// Base API URL - update this to match your backend
const API_BASE_URL = 'http://localhost:8000'; 

// Toggle mock mode to bypass backend for local testing
const USE_MOCK_API = true;

// Helper: simulate latency in mock mode
function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// Generic fetch wrapper
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  if (USE_MOCK_API) {
    // In mock mode, this function should generally not be called.
    // But if it is, return a generic error to indicate missing mock route.
    return delay({ data: null as any, error: `No mock for ${endpoint}`, loading: false } as ApiResponse<T>, 50);
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data,
      error: null,
      loading: false
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      loading: false
    };
  }
}

// API services
export const apiService = {
  // User endpoints
  users: {
    //User registration 
    register: async (username: string, password: string, email: string): Promise<ApiResponse<{ userId: number }>> => {
      if (USE_MOCK_API) {
        if (!username?.trim() || !password?.trim() || !email?.trim()) {
          return delay({ data: null, error: 'All fields are required', loading: false }, 200);
        }
        const mockUserId = Date.now();
        // stash a minimal current user for demo
        try {
          localStorage.setItem('mock_user', JSON.stringify({ id: mockUserId, username }));
        } catch {}
        return delay({ data: { userId: mockUserId }, error: null, loading: false }, 350);
      }
      return fetchApi('/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email })
      });
    },

    //setting user alias 
    setAlias: async (userId: number, alias: string): Promise<ApiResponse<{ message: string; alias: string }>> => {
      if (USE_MOCK_API) {
        return delay({ data: { message: 'Alias set successfully', alias }, error: null, loading: false }, 200);
      }
      return fetchApi('/set-alias', {
        method: 'POST',
        body: JSON.stringify({ userId, alias })
      });
    },

    // Login
    login: async (username: string, password: string): Promise<ApiResponse<{ userId: number; username: string }>> => {
      if (USE_MOCK_API) {
        if (!username?.trim() || !password?.trim()) {
          return delay({ data: null, error: 'Please enter both username and password', loading: false }, 200);
        }
        const mockUserId = Date.now();
        try {
          localStorage.setItem('mock_user', JSON.stringify({ id: mockUserId, username }));
        } catch {}
        return delay({ data: { userId: mockUserId, username }, error: null, loading: false }, 300);
      }
      return fetchApi('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },

    // Get user profile
    getProfile: async (userId: number): Promise<ApiResponse<User>> => {
      if (USE_MOCK_API) {
        const mock: User = {
          id: userId,
          username: 'player_' + String(userId).slice(-4),
          displayName: 'Demo Player',
          wins: 0,
          losses: 0,
        } as any;
        return delay({ data: mock, error: null, loading: false }, 250);
      }
      return fetchApi(`/users/${userId}`, {
        method: 'GET'
      });
    }
  },

  // Tournament related endpoints
  tournaments: {
    // 3. Create tournament (4 or 8 players only)
    create: async (name: string, maxPlayers: 4 | 8, userId: number): Promise<ApiResponse<Tournament>> => {
      if (USE_MOCK_API) {
        const t: Tournament = {
          id: Date.now(),
          name,
          max_players: maxPlayers,
          created_by: userId,
          status: 'active'
        } as any;
        return delay({ data: t, error: null, loading: false }, 300);
      }
      return fetchApi('/tournaments', {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          max_players: maxPlayers,
          created_by: userId 
        })
      });
    },

    // Get all tournaments
    getAll: async (): Promise<ApiResponse<Tournament[]>> => {
      if (USE_MOCK_API) {
        return delay({ data: [], error: null, loading: false }, 200);
      }
      return fetchApi('/tournaments', {
        method: 'GET'
      });
    },

    // Get specific tournament details
    getById: async (tournamentId: number): Promise<ApiResponse<{ tournament: Tournament; players: any[] }>> => {
      if (USE_MOCK_API) {
        return delay({ data: { tournament: { id: tournamentId } as any, players: [] }, error: null, loading: false }, 200);
      }
      return fetchApi(`/tournaments/${tournamentId}`, {
        method: 'GET'
      });
    },

    // 4. Join tournament with multiple aliases (4/8)
    join: async (tournamentId: number, playerAliases: string[], userId: number): Promise<ApiResponse<{
      message: string;
      tournament_id: number;
      players: string[];
      status: string;
    }>> => {
      if (USE_MOCK_API) {
        return delay({ data: { message: 'Joined tournament', tournament_id: tournamentId, players: playerAliases, status: 'active' }, error: null, loading: false }, 250);
      }
      return fetchApi(`/tournaments/${tournamentId}/join`, {
        method: 'POST',
        body: JSON.stringify({ 
          playerAliases, 
          userId 
        })
      });
    },

    // Leave tournament
    leave: async (tournamentId: number, playerId: number): Promise<ApiResponse<{ message: string }>> => {
      if (USE_MOCK_API) {
        return delay({ data: { message: 'Left tournament' }, error: null, loading: false }, 200);
      }
      return fetchApi(`/tournaments/${tournamentId}/leave`, {
        method: 'DELETE',
        body: JSON.stringify({ player_id: playerId })
      });
    }
  }
};