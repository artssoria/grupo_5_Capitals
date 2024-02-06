const path = require('path');

const descubriController = {
    puna : (req,res) =>{
        res.render('puna')
    },

    valles : (req,res) =>{
        res.render('valles')
    },

    quebrada : (req,res) =>{
        res.render('quebrada')
    },

    yungas : (req,res) =>{
        res.render('yungas')
    }
};

module.exports = descubriController;