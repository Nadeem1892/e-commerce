const CategoryModel  = require("./category.model")


const categoryService = {}

// Check if the flavour already exists (and is not marked as deleted)
categoryService.findOneService = async (data) =>{
  return await CategoryModel.findOne(data)
}

// add service Category
categoryService.add = async (categoryName) => {
return await CategoryModel.create(categoryName)
}

// Get all  Category Service
categoryService.get = async () => {
    return await Category.find({ isDeleted: { $ne: true }}).sort({ categoryName: 1 })
}

// //get Category by id 
categoryService.getCategoryById = async (id) => {
  
    // Fetch the user by ID from the database
    return await Category.findOne({ _id: id, isDeleted: false });
  },


  // //find by category is deleting
  // categoryService.findByDeleteCategory = async (id) => {
  //   return await Category.findById({ _id: id})
  // }

//update Category
categoryService.update = async (id,{categoryName}) => {
    return await Category.findOneAndUpdate({ _id: id, isDeleted: false},{categoryName},{ new: true })
}


//Delete Category
categoryService.delete= async (id) => {
return await Category.findOneAndUpdate({ _id: id, isDeleted: false},{ isDeleted: true },{new:true})
}

module.exports = categoryService