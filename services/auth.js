const JWT = require("jsonwebtoken");
const secret = "superman!@#";

function createTokenForUser(user) {
  const payload = {
    id: user.id,
    email: user.email,
    profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
