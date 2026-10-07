import jwt from "jsonwebtoken";
const secret = "piyush1233";
// Recommended: Pass only what you need
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
}
function getUser(token) {
  // Return null if token is missing or a literal "undefined"/"null" string
  if (!token || token === "undefined" || token === "null") return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    // Gracefully handle expired, tampered, or malformed tokens
    return null;
  }
}
// sessions cookies
export { setUser, getUser };
