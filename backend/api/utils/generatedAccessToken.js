const jwt = require("jsonwebtoken");

const generateAccesstoken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {expiresIn: '5h'});

  return token
};

module.exports = generateAccesstoken