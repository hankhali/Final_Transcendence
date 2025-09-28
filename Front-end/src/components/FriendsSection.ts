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

  searchBtn// @ts-ignore
          .onclick = () => {
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
          userCard.querySelector(".primary-button")!// @ts-ignore
          .onclick = () => {
            apiService.users.addFriends(parseInt(user.id)).then((res) => {
              showMessage(res.data?.message || "Request sent!");
              loadPendingRequests();
            });
          };
          searchResults.appendChild(userCard);
        });
      }
    });
  };

  // Friends List
  const friendsList = document.createElement("div");
  friendsList.className = "friends-list";
  container.appendChild(friendsList);

  // Pending Requests
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
      const friends = res.data?.user?.friends || [];
      console.log('[hanieh debug] Loaded friends:', friends);
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
          friendCard.querySelector(".remove-friend-btn")!// @ts-ignore
          .onclick = () => removeFriend(friend.id);
          friendsList.appendChild(friendCard);
        });
      }
    });
  }

  // Load pending requests
  // Create sent requests section once
  const sentSection = document.createElement("div");
  sentSection.className = "sent-requests-section";
  const sentTitle = document.createElement("h3");
  sentTitle.textContent = "Sent Friend Requests";
  sentSection.appendChild(sentTitle);
  const sentList = document.createElement("div");
  sentList.className = "sent-list";
  sentSection.appendChild(sentList);
  container.appendChild(sentSection);

  function loadPendingRequests() {
    pendingList.innerHTML = "";
    apiService.users.listRequests().then((res) => {
      // Extra debug: print full API response and type
      console.log('[hanieh debug] FULL pending requests API response:', res);
      console.log('[hanieh debug] typeof res.data:', typeof res.data);
      console.log('[hanieh debug] pendingRequests:', res.data?.pendingRequests);
      let pending = [];
      // Defensive: handle both {pendingRequests: Array} and {pendingRequests: {pendingRequests: Array}}
      if (Array.isArray(res.data?.pendingRequests)) {
        pending = res.data.pendingRequests;
      } else if (Array.isArray(res.data?.pendingRequests?.pendingRequests)) {
        pending = res.data.pendingRequests.pendingRequests;
      }
      if (pending.length > 0) {
        pending.forEach((req: any) => {
          const reqCard = document.createElement("div");
          reqCard.className = "pending-card";
          reqCard.innerHTML = `
            <span>From: ${req.sender_username} (${req.sender_id})</span>
            <button class="accept-btn">Accept</button>
            <button class="reject-btn">Reject</button>
          `;
          reqCard.querySelector(".accept-btn")!// @ts-ignore
          .onclick = () => respondToRequest(req.id, "accepted");
          reqCard.querySelector(".reject-btn")!// @ts-ignore
          .onclick = () => respondToRequest(req.id, "rejected");
          pendingList.appendChild(reqCard);
        });
      } else {
        pendingList.innerHTML = "<div class='no-pending'>No friend requests.</div>";
      }
    });
    // Update sent requests section only (do not create again)
    sentList.innerHTML = "";
    apiService.users.listSentRequests().then((res) => {
      const sent = res.data?.sentRequests || [];
      if (sent.length > 0) {
        sent.forEach((req: any) => {
          const sentCard = document.createElement("div");
          sentCard.className = "sent-card";
          sentCard.innerHTML = `<span>To: ${req.receiver_username} (${req.receiver_id})</span> <span class='sent-status'>Pending</span>`;
          sentList.appendChild(sentCard);
        });
      } else {
        sentList.innerHTML = "<div class='no-sent'>No sent requests.</div>";
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
        apiService.users.addFriends(parseInt(friendId)).then((res) => {
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
    showMessage("Friend removed successfully.");
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
    let msgBar = document.querySelector('.custom-message-bar') as HTMLElement;
    if (!msgBar) {
      msgBar = document.createElement('div');
      msgBar.className = 'custom-message-bar';
      document.body.appendChild(msgBar);
    }
    msgBar.textContent = msg;
    msgBar.style.display = 'block';
    setTimeout(() => {
      msgBar.style.display = 'none';
    }, 2500);
  }

  // Initial load
  loadFriends();
  loadPendingRequests();

  return container;
}
