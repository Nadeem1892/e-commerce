const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../config/sendEmail");
const varifyEmailTamplate = require("../../utils/varifyEmailTamplate");
const generateAccesstokern = require("../../utils/generatedAccessToken");
const generatedRefreshToken = require("../../utils/generatedRefreshToken");
const uploadImageCloudinary = require("../../utils/uploadImageCloudinary");
const generatedOtp = require("../../utils/generatedOtp");
const forgotPasswordTamplate = require("../../utils/forgotPasswordTamplate");
const userController = {};

// Register User
userController.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Provide Name Email Password",
        error: true,
        stutas: false,
      });
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
    const { code } = req.body;

    //user
    const userVarifyEmail = await userService.varifyEmail(code);
    if (!userVarifyEmail) {
      return res.stutas(400).send({
        message: "Invalid code",
        stutas: false,
        error: true,
      });
    }
    // update user
    const userUpdateVarifyEmail = await userService.updateOneService(code);

    return res.stutas(200).send({
      message: "Email varification done.",
      stutas: true,
      error: false,
    });
  } catch (error) {
    console.error("Error varyfy email:", error);
    return res.status(500).send({
      status: false,
      message: "An error occurred while varyfy the email.",
      error: error.message,
    });
  }
};

//  Login User
userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        message: "provide email, password",
        status: false,
      });
    }

    // Check if the user exists
    const checkUserExist = await userService.existUser(email);
    if (!checkUserExist || checkUserExist === null) {
      return res.status(400).send({
        message: "User not found",
        status: false,
      });
    }

    // Check Account Status
    if (checkUserExist.status !== "Active") {
      return res.status(400).send({
        message: "Your account is not active. Please contact support.",
        status: false,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, checkUserExist.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Incorrect password",
        status: false,
      });
    }

    //Access token .....
    const accessToken = await generateAccesstokern(checkUserExist._id);
    //Access token .....
    const refreshToken = await generatedRefreshToken(checkUserExist._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).send({
      message: "Login successfuly",
      status: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Error Login:", error);
    return res.status(500).send({
      status: false,
      message: "An error occurred while Login.",
      error: error.message,
    });
  }
};

// LogOut User
userController.logout = async (req, res) => {
  try {
    const userId = req.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    await userService.findByIdAndUpdateService(userId, { refresh_token: "" });

    return res.send({
      message: "Logout successfuly",
      status: true,
    });
  } catch (error) {
    console.error("Error logout:", error);
    return res.status(500).send({
      status: false,
      message: "An error occurred while logout.",
      error: error.message,
    });
  }
};

//Upload User Avatar
userController.uploadAvatar = async (req, res) => {
  try {
    const image = req.file; // multer middlewere
    const userId = req?.userId; // auth middlewere

    const upload = await uploadImageCloudinary(image);

    // update image  Avatar
    const updateUserAvatar = await userService.findByIdAndUpdateService(
      userId,
      { avatar: upload.url }
    );

    return res.status(200).send({
      message: "Upload profile",
      status: true,
      data: {
        id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

// update user details
userController.updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // auth middlewere
    const { name, email, mobile, password } = req.body;


    // bcrypt password
    let hashPassword = ""
    if (password) {
      const hash = await bcrypt.hashSync(password, 10);
      hashPassword = hash
    }

    // update details
    const updateUser = await userService.findByIdAndUpdateService(userId, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword }),
    });

    return res.status(200).send({
      message: "User update successfully",
      status: true,
      data: updateUser
    })

  } catch (error) {
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

// Forgot Password not login
userController.forgotPassword = async (req, res) => {
  try {
    const {email} = req.body

    // check user
    const existUser = await userService.existUser(email)
    if (!existUser) {
      return res.status(400).send({
        message: "Email not found",
        status: false
      })
    }

 // Import the generatedOtp method from utils
const otp = await generatedOtp();

// Set expiration time to 1 hour from the current time
const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

// Update the user document with the OTP and expiration time
const update = await userService.findByIdAndUpdateService(existUser?._id, {
  forgot_password_otp: otp,
  forgot_password_expiry: expireTime.toISOString() // Fix: properly call toISOString()
});
console.log(existUser?.name)
await sendEmail({
  sendTo: email,
  subject: "Forgot password from Deems-Shop",
  html: forgotPasswordTamplate({
    name: existUser?.name,
    otp: otp
  })
})

// Return a response to the client
return res.send({
  message: "OTP has been sent successfully.",
  status: true,
  otpExpirationTime: expireTime.toISOString(), // Optional: Include expiration time in the response
});


  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: error.message || error,
      status: false
    })
  }
}

module.exports = userController;
