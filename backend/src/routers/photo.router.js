const express = require("express");
const multer = require("multer");
const upload = multer();
const { PhotoController } = require("../controllers");

const router = express.Router();

router.route("/uploadPhotos").post(upload.any(), PhotoController.uploadPhotos);
router.route("/getAllPhotos").get(PhotoController.getAllPhotos);
router.route("/getPhotosByPage").get(PhotoController.getPhotosByPage);

router.route("/editPhoto").put(PhotoController.editPhoto);
router.route("/deletePhotos").delete(PhotoController.deletePhotos);

module.exports = router;
