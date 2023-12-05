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

module.exports = { uploadFile };
