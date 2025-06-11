import multer from 'multer';
import path from 'path';
import fs from 'fs';
// This code sets up a middleware for handling file uploads using multer in an Express application.
// It configures multer to store uploaded files in a specified directory ('uploads') with a unique filename based on the current timestamp and the original file extension.

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

export default upload;