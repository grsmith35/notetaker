const express = require('express');
const path = require('path');
const app = express();
const uniqid = require('uniqid');
const fs = require('fs');
//const{ getNotes, saveNote, deleteNote, renderActiveNote, handleNoteSave, handleNoteDelete, handleNoteView,
    //handleRenderSaveBtn, renderNoteList, createLi, getAndRenderNotes } = require('./Develop/public/assets/js/index');
const { notes } = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3003;

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    const allNotes = notes;
    res.json(allNotes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    console.log(req.body);
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({notes: notes})
    )
});

//Should be last since its the catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

