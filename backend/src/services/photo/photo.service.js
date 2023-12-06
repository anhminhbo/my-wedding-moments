const { PhotoModel } = require("../../models");
const { uploadFile, deleteFile } = require("./utilities");
const Error = require("../../config/constant/Error");
const { PHOTOS_PER_PAGE } = require("../../config/constant/Env");
const ResponseService = require("../response/response.service");

const {
  GROOM_FOLDER,
  BRIDE_FOLDER,
  GENERAL_FOLDER,
} = require("../../config/constant/Env");

const uploadPhotos = async (files, category) => {
  const gDriveFolderParent =
    category === "bride"
      ? BRIDE_FOLDER
      : category === "groom"
      ? GROOM_FOLDER
      : GENERAL_FOLDER;

  // Upload each photo
  for (let f = 0; f < files.length; f += 1) {
    const result = await uploadFile(files[f], gDriveFolderParent);

    if (!result || !Object.keys(result).length) {
      throw ResponseService.newError(
        Error.UnableToUploadPhoto.errCode,
        Error.UnableToUploadPhoto.errMessage
      );
    }

    // **Calculate index**
    // Calculate the total count of documents in PhotoModel
    const totalCount = await PhotoModel.countDocuments();

    // Calculate index based on total count
    const index = totalCount + 1;

    // **Calculate page**
    const page =
      Math.ceil(index / parseInt(PHOTOS_PER_PAGE)) < 1
        ? 1
        : Math.ceil(index / parseInt(PHOTOS_PER_PAGE));

    // Save photo document
    const photoToBeCreate = new PhotoModel({
      gDriveId: result.id,
      name: result.name,
      gDriveUrl: `https://drive.google.com/uc?export=view&id=${result.id}`,
      index,
      page,
      category,
    });
    await photoToBeCreate.save();
  }

  return true;
};

const getAllPhotos = async () => {
  const photos = await PhotoModel.find() // Get all photos
    .sort({ index: -1 }); // Sort in descending order based on index

  if (!photos || !Object.keys(photos).length) {
    throw ResponseService.newError(
      Error.NoPhotosFound.errCode,
      Error.NoPhotosFound.errMessage
    );
  }

  console.log(photos);

  return photos;
};

const getPhotosByPage = async (page) => {
  const photos = await PhotoModel.find({ page }) // Filter by page
    .sort({ index: -1 }); // Sort in descending order based on index

  if (!photos || !Object.keys(photos).length) {
    throw ResponseService.newError(
      Error.NoPhotosFound.errCode,
      Error.NoPhotosFound.errMessage
    );
  }

  console.log(photos);

  return photos;
};

const deletePhoto = async (gDriveId) => {
  // Find and delete the photo by gDriveId in Mongo
  const deletedPhoto = await PhotoModel.findOneAndDelete({ gDriveId });
  if (!deletedPhoto || !Object.keys(deletedPhoto).length) {
    throw ResponseService.newError(
      Error.NoPhotosFound.errCode,
      Error.NoPhotosFound.errMessage
    );
  }
  // Delete in google drive
  const result = await deleteFile(gDriveId);
  if (!result) {
    throw ResponseService.newError(
      Error.DeletePhotoOnDriveFailed.errCode,
      Error.DeletePhotoOnDriveFailed.errMessage
    );
  }

  return;
};

module.exports = { uploadPhotos, getAllPhotos, getPhotosByPage, deletePhoto };
