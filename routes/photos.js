const router = require('express-promise-router')();
const fs = require('fs');
const multer = require('multer')
const path = require('path');

//imports
const PhotosController = require('../controllers/PhotosController');

//multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '..', 'UploadedFiles', `${Date.now()}`)
        fs.mkdirSync(uploadsDir)
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage});


router.route('/files')
    .post(upload.single("data"), PhotosController.uploadFile)

router.route('/download/:directoryIndex/:fileName')
    .get(PhotosController.downloadFile)

router.route('/delete/:directoryIndex')
    .delete(PhotosController.deleteDirectory)

module.exports = router

