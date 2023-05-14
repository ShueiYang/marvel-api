const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const comicSchema = new Schema({
    profile_id: {
        type: String,
        require: true
    },
    comicId: String,
    comic: Object,
})

const Comic = model("Comic", comicSchema);

module.exports = Comic;