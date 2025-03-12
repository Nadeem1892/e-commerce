const User = require("./user.model")

const userService = {}

//Register User
userService.createUser = async (userDetails) => {
    return await User.create(userDetails)
}

userService.existUser = async (email) => {
return await User.findOne({email})
}

module.exports = userService