const uploadImageCloudinary = require("../../utils/uploadImageCloudinary");
const categoryService = require("./category.service");

const categoryController = {};

// Add category
categoryController.addCategory = async (req, res) => {
  try {
    const { name } = req.body; // Name is passed via req.body

    let image = null;

    // Check if the image is sent as a file (for multipart/form-data)
    if (req.file) {
      // If the image comes from file upload (multipart/form-data), handle file upload
      const uploadResult = await uploadImageCloudinary(req.file);
      image = uploadResult.secure_url; // Get the URL of the uploaded image
    }
    // If the image is passed as a base64 image in the body (for JSON body)
    else if (req.body.image) {
      // If the image comes from a base64 string (JSON body), handle the base64 string upload
      const uploadResult = await uploadImageCloudinary(req.body.image);
      image = uploadResult.secure_url; // Get the URL of the uploaded image
    }

    // Check if the category already exists
    const existingCategory = await categoryService.findOneService({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (existingCategory) {
      return res.status(400).send({
        status: false,
        message: `Category '${name}' already exists.`,
      });
    }

    // Add the new category
    const addCategory = await categoryService.add({ image, name });

    // Check if the category was successfully added
    if (!addCategory) {
      return res.status(400).send({
        message: "Failed to add category. Please try again.",
        status: false,
      });
    }

    // Return success response
    return res.status(201).send({
      status: true,
      message: "Category created successfully!",
      data: addCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message:
        "Oops! Something went wrong while adding the category. Please try again.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

module.exports = categoryController;
