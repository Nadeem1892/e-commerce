const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {};

userController.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user exist
    const existinUser = await userService.existUser(email);

    if (existinUser) {
      return res.status(400).send({
        status: false,
        message: "Email is already taken. Please choose a different one.",
      });
    }

    // bcrypt password
    const hash = bcrypt.hashSync(password, 10);

    // create new user
    const registerUser = await userService.createUser({
      name,
      email,
      password: hash,
    });

    // token genarate
    const token = jwt.sign({ _id: registerUser?._id }, process.env.TOKEN_SECRET);

    return res.status(200).send({
      status: true,
      message: "User registered successfully!",
      userId: registerUser._id,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send({
      status: false,
      message: "An error occurred while registering the user.",
      error: error.message,
    });
  }
};
