const { getNotes, saveNote, deleteNote, renderActiveNote, handleNoteSave, handleNoteDelete, handleNoteView,
handleRenderSaveBtn, renderNoteList, createLi, getAndRenderNotes } = require('../../Develop/public/assets/js/index');
const {notes} = require('../../Develop/db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});