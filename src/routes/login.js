const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req,res)=>{
    let htmlpath = path.resolve(__dirname,'../views/login.html');
    res.sendFile(htmlpath);
});

module.exports = router;