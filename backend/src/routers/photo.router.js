const express = require("express");
const { PhotoController } = require("../controllers");

const router = express.Router();

router.route("/uploadPhotos").post(PhotoController.uploadPhotos);
router.route("/getAllPhotos").get(PhotoController.getAllPhotos);
router.route("/editPhoto").put(PhotoController.editPhoto);
router.route("/deletePhoto").delete(PhotoController.deletePhoto);

module.exports = router;
