const jwt = require("jsonwebtoken");
const userService = require("../src/user/user.service");

const generatedRefreshToken = async (userId) => {
  // generate token
  const token = await jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: "30d",});
  // update token
  const dem0 = await userService.updateOneService({ _id: userId }, { refresh_token: token });

  return token;
};

module.exports = generatedRefreshToken;
