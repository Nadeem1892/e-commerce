const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLODE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY

})

const uploadImageCloudinary = async(image) => {
const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

const uploadImage = await new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream({folder: "Deems-Shop"}, (error, uploadResult) => {
        return resolve(uploadResult)
    }).end(buffer)
})

return uploadImage
}

module.exports = uploadImageCloudinary