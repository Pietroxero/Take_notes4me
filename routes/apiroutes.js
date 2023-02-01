// loading data
//this will be linking the routes we have made to data sources

const router = required('express').Router();
const uid = require('uuid');
const fs = require('fs');
const until = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFile = data => {return writeFileAsync('../Develop/db/db.json', JSON.stringify(data))};
const readFile = () => {return readFileAsync('./Develop/db/db.json', 'utf8')};

//routes
//return notes
router.get('/notes', (req, res) => {
    getNotes().then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//post request for adding/remove notes
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id)
    .then(() => res.json({status: true}))
    .catch((err) =>res.status(500).json(err))
});

router.post('/notes', (req, res) => {
    getNotes(req.body)
.then((note) => res.json(note))
.catch((err) => res.status(500).json(err))
});

//here we return a list of notes


