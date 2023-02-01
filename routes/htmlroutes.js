//list of dependencies needed
//this will include the path package to get us the correct
//file path for the html file

const path = require('path');
const router = require('express').Router();

//here we will be creating the GET requests
//this will show a user the content of the html

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
});

//export the object
module.exports = router;