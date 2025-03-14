const varifyEmailTamplate = ({name, url}) => {
    return `
           <p>Dear ${name}</p>
           <p>Thank you for register Deems-Shop</p>
           <a href=${url} style="color:white;background : blue;margin-top : 10px">Varify Email</a>
           `
} 

module.exports = varifyEmailTamplate