const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req,file,cb) =>{
        let newFilename = 'imagen-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({storage:storage});

module.exports = upload;