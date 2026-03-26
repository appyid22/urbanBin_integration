const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload_directory = path.join(process.cwd(), 'uploads', 'complaints');
fs.mkdirSync(upload_directory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_directory);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const base_name = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');

    cb(null, `${Date.now()}_${base_name}${extension}`);
  }
});

const upload = multer({ storage });

module.exports = {
  upload
};
