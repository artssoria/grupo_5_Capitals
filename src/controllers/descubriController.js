const path = require('path');

const descubriController = {
    puna : (req,res) =>{
        res.sendFile(path.join(__dirname, '../views/puna.html'))
    },

    valles : (req,res) =>{
        res.sendFile(path.join(__dirname, '../views/valles.html'))
    },

    quebrada : (req,res) =>{
        res.sendFile(path.join(__dirname,'../views/quebrada.html'))
    },

    yungas : (req,res) =>{
        res.sendFile(path.join(__dirname, '../views/yungas.html'))
    }
};

module.exports = descubriController;