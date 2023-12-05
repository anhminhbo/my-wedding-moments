const { ResponseService, PhotoService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getAllPhotos = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const photo = await PhotoService.login(username, password);

  res.status(200).json(ResponseService.newSucess(photo));
});

const uploadPhotos = catchAsync(async (req, res) => {
  const { files } = req;
  if (!files) {
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

module.exports = { getAllPhotos, uploadPhotos, editPhoto, deletePhoto };
