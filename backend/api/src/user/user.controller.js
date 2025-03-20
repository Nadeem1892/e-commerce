const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../config/sendEmail");
const varifyEmailTamplate = require("../../utils/varifyEmailTamplate");
const generateAccesstoken = require("../../utils/generatedAccessToken");
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
      return res.send({
        message: "Provide Name Email Password",
        error: true,
        stutas: false,
      });
    }

    //check user exist
    const existinUser = await userService.existUser(email);

    if (existinUser) {
      return res.send({
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
      return res.send({
        message: "provide email, password",
        status: false,
      });
    }

    // Check if the user exists
    const checkUserExist = await userService.existUser(email);
    if (!checkUserExist || checkUserExist === null) {
      return res.send({
        message: "User not found",
        status: false,
      });
    }

    // Check Account Status
    if (checkUserExist.status !== "Active") {
      return res.send({
        message: "Your account is not active. Please contact support.",
        status: false,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, checkUserExist.password);
    if (!isMatch) {
      return res.send({
        message: "Incorrect password",
        status: false,
      });
    }

    //Access token .....
    const accessToken = await generateAccesstoken(checkUserExist._id);
    //Access token .....
    const refreshToken = await generatedRefreshToken(checkUserExist._id);
    //  update User Date In Login
    await userService.findByIdAndUpdateService(checkUserExist?._id, {
      last_login_date: new Date(),
    });

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
    let hashPassword = "";
    if (password) {
      const hash = await bcrypt.hashSync(password, 10);
      hashPassword = hash;
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
      data: updateUser,
    });
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
    const { email } = req.body;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.send({
        message: "Invalid email address.",
        status: false,
      });
    }

    // check user
    const existUser = await userService.existUser(email);
    if (!existUser) {
      return res.send({
        message: "User not found with the provided email address.",
        status: false,
      });
    }

    // Import the generatedOtp method from utils
    const otp = await generatedOtp();

    // Set expiration time to 1 hour from the current time
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update the user document with the OTP and expiration time
    const update = await userService.findByIdAndUpdateService(existUser?._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime.toISOString(), // Fix: properly call toISOString()
    });
    
    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Deems-Shop",
      html: forgotPasswordTamplate({
        name: existUser?.name,
        otp: otp,
      }),
    });

    // Return a response to the client
    return res.send({
      message: "OTP has been sent successfully.",
      status: true,
      otpExpirationTime: expireTime.toISOString(), // Optional: Include expiration time in the response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

// Verify Forgot Password OTP
userController.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.send({
        message: "Invalid email address.",
        status: false,
      });
    }

    // Validate OTP
    if (!otp || otp.length !== 6 || isNaN(otp)) {
      return res.send({
        message: "Invalid OTP. Please enter a 6-digit OTP.",
        status: false,
      });
    }



    const existUser = await userService.existUser(email);
    if (!existUser) {
      return res.send({
        message: "User not found with the provided email address.",
        status: false,
      });
    }

    // Get the current date
    const currentDate = new Date().toISOString();

    // Check if the OTP expiry has passed
    if (existUser.forgot_password_expiry < currentDate) {
      return res.send({
        message: "The OTP has expired. Please request a new OTP.",
        status: false,
      });
    }

    // Check if the provided OTP does not match the stored OTP
    if (otp !== existUser.forgot_password_otp) {
      // If OTP doesn't match, send an error response with a message
      return res.send({
        message: "Invalid OTP. Please try again.",
        status: false,
      });
    }

    // empty forgot otp and pass
    await userService.findByIdAndUpdateService(existUser?._id, {
      forgot_password_otp:"",
      forgot_password_expiry: ""
    }) 

    // OTP verification successful
    return res.send({
      message:
        "OTP verified successfully. ",
      status: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

//Reset Password
userController.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.send({
        message: "Invalid email address.",
        status: false,
      });
    }

    // Validate newPassword and confirmPassword
    if (!newPassword || !confirmPassword) {
      return res.send({
        message: "Both new password and confirm password are required.",
        status: false,
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.send({
        message: "Passwords do not match. Please try again.",
        status: false,
      });
    }

    // // Optionally, validate password strength (example: minimum length of 8)
    // if (newPassword.length < 8) {
    //   return res.send({
    //     message: "Password must be at least 8 characters long.",
    //     status: false,
    //   });
    // }

    const existUser = await userService.existUser(email);
    if (!existUser) {
      return res.send({
        message: "User not found with the provided email address.",
        status: false,
      });
    }

    // bcrypt password
    const hash = await bcrypt.hashSync(newPassword, 10);

    //  update Password
    await userService.findByIdAndUpdateService(existUser?._id, {
      password: hash,
    });

    return res.send({
      message: "Your password has been reset successfully.",
      status: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

//Refresh Token
userController.refreshToken = async (req, res) => {
  try {
    // Extract the refresh token from cookies or authorization header
    const refreshToken =
      req.cookies.refreshToken ||
      (req?.header?.authorization && req.header.authorization.split(" ")[1]);

    // Check if the refresh token is not provided
    if (!refreshToken) {
      return res.send({
        message: "Refresh token is missing. Please login again.",
        status: false,
      });
    }

    //Verify Refresh token
    const verifyRefreshToken = await jwt.verify(
      refreshToken,
      process.env.TOKEN_SECRET
    );
    if (!verifyRefreshToken) {
      return res.status(401).send({
        message: "Token is expire",
        status: false,
      });
    }

    // new Access token
    const userId = verifyRefreshToken?._id;

    const newAccessToken = await generateAccesstoken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.send({
      message: "New Access token generated",
      status: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

//get login user details
userController.userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userService.findByIdService(userId);
    return res.send({
      message: "User details",
      status: true,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || error,
      status: false,
    });
  }
};

module.exports = userController;
