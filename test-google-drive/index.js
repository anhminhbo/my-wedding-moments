const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(5050, () => {
  console.log("Form running on port 5050");
});

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

app.post("/upload", upload.any(), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { body, files } = req;

    for (let f = 0; f < files.length; f += 1) {
      await uploadFiles(files[f]);
    }

    res.status(200).send("Form Submitted");
  } catch (f) {
    res.send(f.message);
  }
});

const uploadFiles = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1SA0BgHIE_CwW8XT2MO5wVbIzJl4-20-g"], // get the url path ending of the google drive
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

//  Here to test retrieve image from google drive
// Create a new instance of the Drive API
const drive = google.drive({ version: "v3", auth });

// Function to list all files in Google Drive
async function listFiles() {
  try {
    const response = await drive.files.list({
      pageSize: 10, // Set the number of files to retrieve per request
      fields: "nextPageToken, files(id, name)",
    });

    const files = response.data.files;
    if (files.length) {
      console.log("Files:");
      files.forEach((file) => {
        console.log(file);
        // console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log("No files found.");
    }
  } catch (error) {
    console.error("Error retrieving files:", error.message);
  }
}

// Call the function to list files
listFiles();
