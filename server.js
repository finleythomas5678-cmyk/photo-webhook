const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Webhook endpoint for photo upload
app.post('/webhook', upload.single('photo'), (req, res) => {
  console.log('Photo received:', req.file);
  res.send('Photo uploaded successfully');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
