import { apiService } from "../services/api";

export function createFriendsSection(): HTMLElement {
  const container = document.createElement("div");
  container.className = "friends-section";

  // Title
  const title = document.createElement("h2");
  title.className = "friends-title";
  title.textContent = "FRIENDS LIST";
  container.appendChild(title);

  // Add/Search Friend UI
  const addFriendSection = document.createElement("div");
  addFriendSection.className = "add-friend-section";
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search users by username...";
  searchInput.className = "search-friend-input";
  const searchBtn = document.createElement("button");
  searchBtn.className = "primary-button";
  searchBtn.textContent = "Search";
  addFriendSection.appendChild(searchInput);
  addFriendSection.appendChild(searchBtn);
  container.appendChild(addFriendSection);

  // Search results
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
  container.appendChild(searchResults);

  searchBtn.onclick = () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = "<div class='search-empty'>Enter a username to search.</div>";
      return;
    }
    searchResults.innerHTML = "Searching...";
    apiService.users.searchForFriends().then((res) => {
      const users = res.data?.users || [];
      const filtered = users.filter((u: any) => u.username.toLowerCase().includes(query.toLowerCase()));
      if (filtered.length === 0) {
        searchResults.innerHTML = "<div class='search-empty'>No users found.</div>";
      } else {
        searchResults.innerHTML = "";
        filtered.forEach((user: any) => {
          const userCard = document.createElement("div");
          userCard.className = "search-user-card";
          userCard.innerHTML = `
            <span class='search-username'>${user.username}</span>
            <button class='primary-button'>Send Friend Request</button>
          `;
          userCard.querySelector(".primary-button")!.onclick = () => {
            apiService.users.addFriends(user.id).then((res) => {
              showMessage(res.data?.message || "Request sent!");
              loadPendingRequests();
            });
          };
          searchResults.appendChild(userCard);
        });
      }
    });
  };

  // Friends List Section
  const friendsListSection = document.createElement("div");
  friendsListSection.className = "friends-list-section";
  const friendsListTitle = document.createElement("h3");
  friendsListTitle.textContent = "Your Friends";
  friendsListTitle.style.color = "#00e6ff";
  friendsListTitle.style.marginBottom = "1rem";
  friendsListSection.appendChild(friendsListTitle);
  const friendsList = document.createElement("div");
  friendsList.className = "friends-list";
  friendsListSection.appendChild(friendsList);
  container.appendChild(friendsListSection);

  // Pending Requests Section
  const pendingSection = document.createElement("div");
  pendingSection.className = "pending-requests-section";
  const pendingTitle = document.createElement("h3");
  pendingTitle.textContent = "Friend Requests";
  pendingSection.appendChild(pendingTitle);
  const pendingList = document.createElement("div");
  pendingList.className = "pending-list";
  pendingSection.appendChild(pendingList);
  container.appendChild(pendingSection);

  // Search and load friends
  function loadFriends() {
    friendsList.innerHTML = "";
    apiService.users.getMyProfile().then((res) => {
      // hanieh debug: print friends array received from backend
      console.log('[hanieh debug] getMyProfile response:', res);
  // hanieh fixed: read friends from top-level res.data.friends
  const friends = res.data?.friends || [];
      console.log('[hanieh debug] friends array:', friends);
      if (friends.length === 0) {
        friendsList.innerHTML = `<div class='no-friends'>No friends yet. Start by adding some friends!</div>`;
      } else {
        friends.forEach((friend: any) => {
          const friendCard = document.createElement("div");
          friendCard.className = "friend-card";
          friendCard.innerHTML = `
            <div class="friend-info">
              <span class="friend-username">${friend.username}</span>
              <span class="friend-status">${friend.current_status || "offline"}</span>
            </div>
            <button class="remove-friend-btn">Remove</button>
          `;
          friendCard.querySelector(".remove-friend-btn")!.onclick = () => removeFriend(friend.id);
          friendsList.appendChild(friendCard);
        });
      }
    });
  }

  // Load pending requests
  function loadPendingRequests() {
    pendingList.innerHTML = "";
    apiService.users.listRequests().then((res) => {
      // Debug log: print API response for pending requests
      // hanieh debug: print pendingRequests type, length, and contents
      // hanieh added: always treat pendingRequests as array for compatibility
      let pendingRequests = res.data?.pendingRequests;
      if (!Array.isArray(pendingRequests)) {
        if (pendingRequests && typeof pendingRequests === 'object' && 'length' in pendingRequests) {
          pendingRequests = Array.from(pendingRequests);
        } else if (pendingRequests && typeof pendingRequests === 'object') {
          pendingRequests = Object.values(pendingRequests);
        } else {
          pendingRequests = [];
        }
      }
      console.log('[hanieh debug] pending requests API response:', res.data);
      console.log('[hanieh debug] Array.isArray:', Array.isArray(pendingRequests));
      console.log('[hanieh debug] pendingRequests:', pendingRequests);
      const pending = pendingRequests;
      if (pending.length > 0) {
        pending.forEach((req: any) => {
          // Fetch sender's username if not present
          if (!req.sender_username) {
            apiService.users.getOthersProfile(req.sender_id).then((profileRes: any) => {
              const username = profileRes.data?.user?.username || `User #${req.sender_id}`;
              renderPendingCard(req, username);
            });
          } else {
            renderPendingCard(req, req.sender_username);
          }
        });
      } else {
        pendingList.innerHTML = "<div class='no-pending'>No friend requests.</div>";
      }

      function renderPendingCard(req: any, username: string) {
        const reqCard = document.createElement("div");
        reqCard.className = "pending-card";
        reqCard.innerHTML = `
          <span>From: ${username}</span>
          <button class="accept-btn">Accept</button>
          <button class="reject-btn">Reject</button>
        `;
        reqCard.querySelector(".accept-btn")!.onclick = () => respondToRequest(req.id, "accepted");
        reqCard.querySelector(".reject-btn")!.onclick = () => respondToRequest(req.id, "rejected");
        pendingList.appendChild(reqCard);
      }
    });
  }

  // Add Friend Modal
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
          <input type="text" id="friend-id" placeholder="Enter friend ID..." />
        </div>
        <div class="modal-footer">
          <button class="secondary-button modal-close">Cancel</button>
          <button class="primary-button" id="send-friend-request">Send Request</button>
        </div>
      </div>
    `;
    modal.querySelectorAll(".modal-close").forEach(btn => btn.addEventListener("click", () => modal.remove()));
    modal.querySelector("#send-friend-request")!.addEventListener("click", () => {
      const friendId = (modal.querySelector("#friend-id") as HTMLInputElement).value.trim();
      if (friendId) {
        apiService.users.addFriends(friendId).then((res) => {
          showMessage(res.data?.message || "Request sent!");
          modal.remove();
          loadPendingRequests();
        });
      }
    });
    document.body.appendChild(modal);
  }

  // Remove friend
  function removeFriend(friendId: number) {
    // TODO: Implement backend remove friend endpoint
    showMessage("Friend removed (demo only)");
    loadFriends();
  }

  // Respond to request
  function respondToRequest(requestId: number, action: string) {
    apiService.users.sendRequestResponse(requestId, action).then((res) => {
      showMessage(res.data?.message || "Response sent!");
      loadPendingRequests();
      loadFriends();
    });
  }

  // Helper: show message
  function showMessage(msg: string) {
    // Custom toast notification
    let toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // Initial load
  loadFriends();
  loadPendingRequests();

  return container;
}
