const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 3002;

SERVER_SECRET = "dAB4BCa27d1fEEFaff09cf6213E21183";

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use(express.static("uploads"));
app.post("/", (req, res) => {
  res.send("hello!");
});
// Handle image upload
app.post("/upload", upload.single("file"), (req, res) => {
  const uploadedFile = req.file;
  console.log(uploadedFile);
  res.send(uploadedFile.filename);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
