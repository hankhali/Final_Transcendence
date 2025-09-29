// hanieh added: AI match endpoints
const ai = {
  submitResult: async (playerScore, aiScore) => {
    return fetchApi('/ai/finish', {
      method: 'POST',
      body: JSON.stringify({ playerScore, aiScore })
    });
  }
};
// hanieh added: Standalone 1v1 match endpoints
const onevone = {
  start: async (player2Username) => {
    return fetchApi('/onevone/start', {
      method: 'POST',
      body: JSON.stringify({ player2Username })
    });
  },
  submitResult: async (matchId, player1Score, player2Score) => {
    return fetchApi('/onevone/finish', {
      method: 'POST',
      body: JSON.stringify({ matchId, player1Score, player2Score })
    });
  }
};



// Base API URL - update this to match your backend   //check account deletion
const API_BASE_URL = 'http://localhost:5001'; 

// Generic fetch wrapper
async function fetchApi(endpoint, options){
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Only set Content-Type if body is present and method is not DELETE
    const headers = { ...options.headers };
    if (options.method !== "DELETE" && options.body) {
      headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("token");
    if(token){
      headers["Authorization"] = `Bearer ${token}`;
      console.log(token);
    }

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

    // Update user profile (send only provided fields)
    updateProfile: async (profileData) => {
      // profileData: { username?, email?, alias?, password?, avatar? }
      return fetchApi("/me", {
        method: "PATCH",
        body: JSON.stringify(profileData)
      });
    },

    // Get user own profile (returns avatar URL if present)
    getMyProfile: async () => {
      const result = await fetchApi("/me", {
        method: "GET"
      });
      // result.data.avatar may contain the avatar filename or URL
      return result;
    },

    // Get another user's public profile (returns avatar URL if present)
    getOthersProfile: async (userId) => {
      const result = await fetchApi(`/users/${userId}`, {
        method: "GET"
      });
      // result.data.avatar may contain the avatar filename or URL
      return result;
    },


    searchForFriends: async () => {
      return fetchApi("/search-friends", {
        method: "GET"
      });
    },

    addFriends: async (friendId) => {
      return fetchApi("/add-friends", {
        method: "POST",
        body: JSON.stringify({ friendId })
      });
    },


    sendRequestResponse: async (requestId, action) => {
      return fetchApi(`/friend/requests/${requestId}/respond`, {
        method: "POST",
        body: JSON.stringify({ action })
      });
    },


    listRequests: async () => {
      return fetchApi("/friend/requests", {
        method: "GET"
      })
    },

      // hanieh changed: Add sent requests API for sender
      listSentRequests: async () => {
        return fetchApi("/friend/requests/sent", {
          method: "GET"
        });
      },
    
    // Upload avatar (expects a File object, returns uploaded filename)
    uploadAvatar: async (file) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: "POST",
        // Do NOT set Content-Type header; browser will set it for FormData
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
      }
      // Response: { message, file } where file is the avatar filename
      return response.json();
    }
  },

  // Tournament related endpoints
  tournaments: {
    // Submit match result (update scores and winner)
    submitMatchResult: async (tournamentId, matchId, player1Score, player2Score) => {
      console.log('[DEBUG] submitMatchResult called:', { tournamentId, matchId, player1Score, player2Score });
      try {
        const response = await fetchApi(`/tournaments/${tournamentId}/finish`, {
          method: 'POST',
          body: JSON.stringify({ matchId, userScore: player1Score, opponentScore: player2Score })
        });
        console.log('[DEBUG] submitMatchResult response:', response);
        return response;
      } catch (error) {
        console.error('[DEBUG] submitMatchResult error:', error);
        return { data: null, error, loading: false };
      }
    },
    //Create tournament (local, with 4 player names)
    create: async (name, maxPlayers, playerNames) => {
      return fetchApi("/tournaments", {
        method: "POST",
        body: JSON.stringify({ 
          name,
          maxPlayers,
          playerNames
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
      return fetchApi(`/tournaments/${tournamentId}` , {
        method: "GET"
      });
    },

    // Join tournament with a single alias
    join: async (tournamentId, tournament_alias) => {
      return fetchApi(`/tournaments/${tournamentId}/join`, {
        method: "POST",
        body: JSON.stringify({ 
          tournament_alias
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
      ,
        // Update user profile (send only provided fields)
        updateProfile: async (profileData) => {
          return fetchApi("/me", {
            method: "PATCH",
            body: JSON.stringify(profileData)
          });
      }
  }
};


export { fetchApi, apiService, onevone, ai }; // hanieh added
