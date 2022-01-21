const path = require('path');
const File = require('../models/file');
const {rm} = require('fs').promises;
const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
    createdAt: Date,
    fullPath: String,
    photoIndex: String,
    photoName: String
});

const Photo = mongoose.model('Photo', PhotoSchema, 'photostore');


module.exports = {

    uploadFile: async (req, res, next) => {
        const remove = await path.join(__dirname, '..', 'UploadedFiles');
        const relPath = await req.file.path.replace(remove, '');
        const newFile = await new File(req.body)
        newFile.path = await relPath;

        const photoPathInArray = newFile.path.split("\\")

        const photo1 = await new Photo({
            createdAt: newFile.createdAt,
            fullPath: relPath,
            photoIndex: photoPathInArray[1],
            photoName: photoPathInArray[2]
        });

        photo1.save(function (err, photo) {
            if (err) return console.error(err);
            console.log(photo.photoName + " saved to bookstore collection.");
        });


        res.status(200).json(relPath);
    },

    downloadFile: async (req, res, next) => {
        // http://localhost:2531/photos/download/1641205830666/experience.jpg

        const {directoryIndex, fileName} = req.params
        const pathToFileInMongoDb = await Photo.findOne({fullPath: `\\${directoryIndex}\\${fileName}`});
        const pathToDownloadFile = await path.join(__dirname, "..", "UploadedFiles", `${pathToFileInMongoDb.fullPath}`);

        res.download(pathToDownloadFile)
    },

    deleteDirectory: async (req, res, next) => {
        // POSTMAN: http://localhost:2531/photos/delete/1641205830666

        const {directoryIndex} = req.params;
        const pathToDirectoryInMongoDb = await Photo.findOne({photoIndex: directoryIndex});

        const pathToUploadedFiles = await path.join(__dirname, "..", "UploadedFiles", `${pathToDirectoryInMongoDb.photoIndex}`);

        //delete directory
        await rm(pathToUploadedFiles, {
            recursive: true,
        })

        //delete from db
        await Photo.deleteOne({photoIndex: directoryIndex})

        await res.end()
    }

}
