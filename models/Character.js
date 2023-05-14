const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const characterSchema = new Schema({
    profile_id: {
        type: String,
        require: true
    },
    characterId: String,
    character: Object,
})

const Character = model("Character", characterSchema);

module.exports = Character;