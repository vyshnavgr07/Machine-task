const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/notepad")
    .then(() => console.log("DB connected"))
    .catch(err => console.error("DB connection error:", err));

app.use(bodyParser.json());

const notesSchema = mongoose.Schema({
    id: Number,
    text: String
});

const Note = mongoose.model("Note", notesSchema);     


app.post("/note", async (req, res) => {
    try {
        const { id, text } = req.body;
        const newNote = new Note({ id, text }); 
        await newNote.save(); 
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error saving note:", error); 
        res.status(500).json({ error: "Failed to save note" });   
    }
});

app.get("/note", async (req, res) => {
    try {
        const notes = await Note.find();
        console.log(notes);
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error retrieving notes:", error);
        res.status(500).json({ error: "Failed to retrieve notes" });
    }
});

app.listen(3006, () => console.log(`Server running on port 3006`));
