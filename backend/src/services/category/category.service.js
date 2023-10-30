const { CategoryModel } = require("../../models");

// Recursive function to populate all levels of parentCategory
async function populateParentCategories(category) {
  if (category.parentCategory) {
    await category.populate("parentCategory");
    await populateParentCategories(category.parentCategory);
  }
}

const createCategory = async (name, parentCategory) => {
  const categoryToBeCreate = new CategoryModel({
    name,
    parentCategory,
  });

  const category = await categoryToBeCreate.save();
  return category;
};

const getAllCategories = async () => {
  const categories = await CategoryModel.find();

  // Populate all levels of parentCategory for each category
  for (const category of categories) {
    await populateParentCategories(category);
  }

  return categories;
};

const updateCategory = async (name, parentCategory, newName) => {
  const params = [name];

  if (results[0][0].eligible == 1) {
    CategoryModel.findOneAndUpdate(
      { name: name },
      { name: newName },
      (err, doc) => {
        if (err) {
          console.error(err);
          return { result: err.message };
        }
        console.log("Updated document:", doc);
      }
    );
  } else {
    return "Unable to delete or update this category";
  }

  return results[0][0];
};

const deleteCategory = async (name) => {
  const params = [name];

  if (results[0][0].eligible == 1) {
    const result = await CategoryModel.deleteOne({ name: name });
    return result;
  } else {
    return "Unable to delete or update this category";
  }

  return results[0][0];
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
