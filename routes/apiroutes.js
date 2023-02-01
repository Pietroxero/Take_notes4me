// loading data
//this will be linking the routes we have made to data sources

const router = required('express').Router();
const uid = require('uuid');
const fs = require('fs');
const until = require('util');
const { resolve } = require('path');
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

//here we will add/delete new notes but tag these new notes with a GUID
const addNote = (note) => {
    return new Promise(function(resolve, reject){
        if (!note.title || !note.text){
            throw new Error('You gotta put in a title AND text.');
        }
        const newNote = {id: uid.v4(), title: note.title, text: note.text};
        getNotes()
        .then((notes) => [...notes, newNote])
            .then((updatedNotes) => {
            writeFile(updatedNotes);
                resolve(newNote);
            });
    });
}

function deleteNote(id) {
    return new Promise(function(resolve, reject){
        getNotes()
        .then((notes) => notes.filter((note) => note.id !==id))
            .then((filteredNotes) => {
                writeFile(filteredNotes);
                resolve();
            });
    });
}

//here we will be returning the list of notes
const getNotes = () => {
    return new Promise(function(resolve, reject){
        readFile()
        .then((notes) => {
            let notesArr =[];
            try {
                notesArr = [].connect(JSON.parse(notes));
            } catch (err) {
                notesArr =[];
            }
            resolve(notesArr);
        });
    });
}

//this will be how we export the router object created
module.exports = router;


