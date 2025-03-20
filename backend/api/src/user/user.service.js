const User = require("./user.model")

const userService = {}

//Register User Service
userService.createUser = async (userDetails) => {
    return await User.create(userDetails)
}

// find by id service
userService.findByIdService = async (userId) => {
    return await User.findById(userId).select('-password -refresh_token')
}

// Check User Exist Service
userService.existUser = async (email) => {
return await User.findOne({email})
}


// Varify Email Check Service
userService.varifyEmail = async (code) => {
    return await User.findOne({_id: code})
}

// Update Veryfy Email Service
userService.updateOneService = async (data, value) => {
    return await User.updateOne(data,value)
}

// findByIdAndUpdate service
userService.findByIdAndUpdateService = async (data, value) => {
    return await User.findByIdAndUpdate(data, value, {new: true})
}

module.exports = userService