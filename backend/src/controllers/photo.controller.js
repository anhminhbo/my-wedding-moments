const { ResponseService, PhotoService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getAllPhotos = catchAsync(async (req, res) => {
  const photos = await PhotoService.getAllPhotos();

  res.status(200).json(ResponseService.newSucess(photos));
});

const getPhotosByPage = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter, default to 1 if not provided
  const photos = await PhotoService.getPhotosByPage(page);

  res.status(200).json(ResponseService.newSucess(photos));
});

const uploadPhotos = catchAsync(async (req, res) => {
  const { files } = req;
  if (!files || !Object.keys(files).length) {
    throw ResponseService.newError(
      Error.MissingPhotos.errCode,
      Error.MissingPhotos.errMessage
    );
  }
  const { category } = req.body;

  await PhotoService.uploadPhotos(files, category);

  res.status(200).json(ResponseService.newSucess());
});

const editPhoto = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const photo = await PhotoService.getPhotoByPhotoname(username);
  if (photo) {
    throw ResponseService.newError(
      Error.PhotoAlreadyExists.errCode,
      Error.PhotoAlreadyExists.errMessage
    );
  }
  const newPhoto = await PhotoService.createPhoto(username, password);
  res.status(200).json(ResponseService.newSucess(newPhoto));
});

const deletePhoto = catchAsync(async (req, res) => {
  const { gDriveId } = req.params;
  if (!gDriveId) {
    throw ResponseService.newError(
      Error.MissingPhotosGdriveId.errCode,
      Error.MissingPhotosGdriveId.errMessage
    );
  }
  await PhotoService.deletePhoto(gDriveId);

  res.status(200).json(ResponseService.newSucess());
});

module.exports = {
  getAllPhotos,
  uploadPhotos,
  editPhoto,
  deletePhoto,
  getPhotosByPage,
};
