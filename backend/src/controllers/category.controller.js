const { ResponseService, CategoryService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getAllCategories();

  res.status(200).json(ResponseService.newSucess(categories));
});

const createCategory = catchAsync(async (req, res) => {
  const { name, parentCategory } = req.body;
  const newCategory = await CategoryService.createCategory(
    name,
    parentCategory
  );

  res.status(200).json(ResponseService.newSucess(newCategory));
});

const updateCategory = catchAsync(async (req, res) => {
  const { name, parentCategory, newName } = req.body;
  const results = await CategoryService.updateCategory(name, parentCategory, newName);

  if (results === "Unable to delete or update this category"){
    throw ResponseService.newError(
      Error.UnableToDeleteOrUpdateCategory.errCode,
      Error.UnableToDeleteOrUpdateCategory.errMessage
    );
  }

  res.status(200).json(ResponseService.newSucess(results));
});

const deleteCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  const results = await CategoryService.deleteCategory(name);

  if (results === "Unable to delete or update this category"){
    throw ResponseService.newError(
      Error.UnableToDeleteOrUpdateCategory.errCode,
      Error.UnableToDeleteOrUpdateCategory.errMessage
    );
  }

  res.status(200).json(ResponseService.newSucess(results));
});

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
