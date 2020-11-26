

export const isFollowing = (state, currentUserId, followedId) => {
  return state.entities.users[currentUserId] &&
    state.entities.users[currentUserId].follows &&
    state.entities.users[currentUserId].follows.includes(followedId);
}
