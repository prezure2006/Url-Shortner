// sessions cookies

const sessionIDToUserMap = new Map();
function setUser(id, user) {
  sessionIDToUserMap.set(id, user);
}
function getUserId(id) {
  return sessionIDToUserMap.get(id);
}
export { setUser, getUserId };
