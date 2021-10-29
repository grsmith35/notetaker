const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        console.log(notes);
        return res.json(notes);
    })
});

router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        const filteredNote = notes.filter((note) => id !== note.id);
        if(filteredNote) {
            res.json(filteredNote);
        } else {
            res.send(404);
        }
    });
});

router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uniqid();
        notes.push(newNote);
        fs.writeFile(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify(notes),
            (err) => {
                if(err) throw err;
                console.log(err);
            }
        );
        res.status(200).json({message: 'Note added'});
    }) 
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        const filteredNotes = notes.filter((note) => id !== note.id);

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes), (err) => {
            if(err) throw err;
            console.log('success');
            res.status(200).json(filteredNotes);

        });
    })
    
});

module.exports = router;