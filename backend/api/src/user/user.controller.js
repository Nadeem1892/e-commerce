const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../config/sendEmail")
const varifyEmailTamplate = require("../../utils/varifyEmailTamplate");
const userController = {};

// Register User
userController.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        message : "Provide Name Email Password",
        error: true,
        stutas: false
      })
    }

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

    // Varify Email
    const varifyEmailUrl = `${process.env.FRONTEND_URL}/varify-email?code=${registerUser?._id}`;

    const varifyEmail = await sendEmail({
      sendTo: email,
      subject: "Varify Email from Deems-Shop",
      html: varifyEmailTamplate({
        name,
        url: varifyEmailUrl,
      }),
    });

    // token genarate
    const token = jwt.sign(
      { _id: registerUser?._id },
      process.env.TOKEN_SECRET
    );

    return res.status(200).send({
      status: true,
      error: false,
      message: "User registered successfully!",
      data: registerUser,
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

// Varify Email
userController.varifyEmail = async (req, res) => {
try {
  const {code} = req.body

  //user
  const userVarifyEmail = await userService.varifyEmail(code)
  if (!userVarifyEmail) {
    return res.stutas(400).send({
      message:"Invalid code",
      stutas: false,
      error: true
    })
  }
  // update user
   const userUpdateVarifyEmail = await userService.updateVarifyEmail(code)

   return res.stutas(200).send({
    message:"Email varification done.",
    stutas: true,
    error: false
   })

} catch (error) {
  console.error("Error varyfy email:", error);
    return res.status(500).send({
      status: false,
      message: "An error occurred while varyfy the email.",
      error: error.message,
    });
}
}

module.exports = userController
