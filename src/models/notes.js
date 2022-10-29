const mongoose = require("mongoose");
const {
    config
} = require("dotenv");
require("dotenv").config();

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        lowercase: true,
        // unique: true,
    },
    subtitle: {
        type: String,
    },


    images: [{
        type: String
    }],

    tags: [{
        type:String
    }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dateadded: {
        type: Date,
    }
}, {
    timestamps: true,
});

const Note = new mongoose.model('Note', NotesSchema)

module.exports = Note