
// Base API URL - update this to match your backend
const API_BASE_URL = 'http://localhost:5001'; 

// Generic fetch wrapper
async function fetchApi(endpoint, options){
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    let headers = { ...options.headers };
    // Only set Content-Type if there is a body
    if (options.body) {
      headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("token");
    if(token){
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    // Handle different response types
    let data = null;
    const contentType = response.headers.get('content-type');
    
    if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
      data = { message: 'Success' };
    } else {
      try {
        data = await response.json();
      } catch (parseError) {
        data = { message: 'Success' };
      }
    }

    return {
      data,
      error: null,
      loading: false
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      loading: false
    };
  }
}

// API services
const apiService = {
  // User endpoints
  users: {
    //User registration 
    register: async (username, password, email)=> {
      return fetchApi("/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          email })
      });
    },

    //setting user alias 
    setAlias: async (alias) => {
      return fetchApi("/set-alias", {
        method: "POST",
        body: JSON.stringify({ alias })
      });
    },

    // Login
    login: async (username, password) => {
      return fetchApi("/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password })
      });
    },

    // Get user own profile
    getMyProfile: async ()=> {
      return fetchApi("/me", {
        method: "GET"
      });
    },

    getOthersProfile: async (userId) => {
      return fetchApi(`/users/${userId}`, {
        method: "GET"
      });
    },

    deleteMyAccount: async () => {
      return fetchApi("/me", {
        method: "DELETE"
      });
    },

    // Update user profile (username, bio, password, etc.)
    updateProfile: async (profileData) => {
      return fetchApi("/me", {
        method: "PATCH",
        body: JSON.stringify(profileData)
      });
    }
  },

  // Tournament related endpoints
  tournaments: {
    // Submit match result for a tournament
    submitMatchResult: async (tournamentId, matchId, player1Score, player2Score) => {
      return fetchApi(`/tournaments/${tournamentId}/finish`, {
        method: "POST",
        body: JSON.stringify({
          matchId,
          player1Score,
          player2Score
        })
      });
    },
    //Create tournament (4 or 8 players only)
    create: async (name, maxPlayers)=> {
      return fetchApi("/tournaments", {
        method: "POST",
        body: JSON.stringify({ 
          name, 
          maxPlayers,
        })
      });
    },

    // Get all tournaments
    getAll: async () => {
      return fetchApi("/tournaments", {
        method: "GET"
      });
    },

    // Get specific tournament details
    getById: async (tournamentId) => {
      return fetchApi("/tournaments/${tournamentId}", {
        method: "GET"
      });
    },

    // Join tournament with multiple aliases (4/8)
    join: async (tournamentId, playerAliases) => {
      return fetchApi(`/tournaments/${tournamentId}/join`, {
        method: "POST",
        body: JSON.stringify({ 
          playerAliases,  
        })
      });
    },

    //start a tournament
    start: async (tournamentId) => {
      return fetchApi(`/tournaments/${tournamentId}/start`, {
        method: "POST",
      })
    },

    // Leave tournament
    leave: async (tournamentId, playerId) => {
      return fetchApi(`/tournaments/${tournamentId}/leave`, {
        method: "DELETE",
      });
    }
  }
};


export { fetchApi, apiService };