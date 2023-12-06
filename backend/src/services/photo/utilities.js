const path = require("path");
const stream = require("stream");
const { google } = require("googleapis");

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadFile = async (fileObject, gDriveFolderParent) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [gDriveFolderParent], // get the url path ending of the google drive
    },
    fields: "id,name",
  });

  console.log(`Uploaded filename: ${data.name} id: ${data.id}`);

  return data;
};

const deleteFiles = async (gDriveIds) => {
  const drive = google.drive({ version: "v3", auth });

  // Use Promise.all to delete multiple files concurrently
  const deletePromises = gDriveIds.map(async (gDriveId) => {
    await drive.files.delete({
      fileId: gDriveId,
    });

    console.log(`Deleted photo with gDriveId: ${gDriveId}`);
  });

  await Promise.all(deletePromises);

  return;
};

module.exports = { uploadFile, deleteFiles };
