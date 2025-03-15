const jwt = require("jsonwebtoken");

const generateAccesstokern = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {expiresIn: '5h'});

  return token
};

module.exports = generateAccesstokern