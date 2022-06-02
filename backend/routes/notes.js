const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');


// ROUTE 1: Fetch All Notes using: GET "/api/auth/fetchAllNotes". Login required.
router.get('/fetchAllNotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!")
    }

})

// ROUTE 2: Add Note using: POST "/api/auth/addNote". Login required.
router.post('/addNote', fetchUser, [
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!")
    }
})

// ROUTE 3  : Update an existing Note using: PUT "/api/auth/updateNote". Login required.
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Create a new Note Object
        const newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ success: "Note Updated Successfully." });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!")
    }

})


// ROUTE 4  : Delete an existing Note using: DELETE "/api/auth/deleteNote". Login required.
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow Deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note Has Been deleted.", note: note });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!")
    }

})




module.exports = router;
