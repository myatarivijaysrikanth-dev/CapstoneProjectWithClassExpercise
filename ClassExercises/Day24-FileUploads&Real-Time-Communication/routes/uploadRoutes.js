const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"));
    }
  },
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/upload.html"));
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

module.exports = router;