const User = require("./user.model")

const userService = {}

//Register User Service
userService.createUser = async (userDetails) => {
    return await User.create(userDetails)
}

// Check User Exist Service
userService.existUser = async (email) => {
return await User.findOne({email})
}


// Varify Email Check Service
userService.varifyEmail = async (code) => {
    return await User.findOne({_id: code})
}

module.exports = userService