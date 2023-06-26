const Character = require("../../../models/Character");
const Comic = require("../../../models/Comic");



async function bookmarkCharacter(req, res) {
    try {
        const userId = req.user.id; 
        const { characterId, character } = req.body;
        if (!characterId) {
            throw { status: 400, message: "Missing parameter" };
        }
        const newBookmark = new Character({
            profile_id: userId,
            characterId,
            character,
        });
        const charBookmark = await newBookmark.save();
        res.status(201).json(charBookmark);

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


async function bookmarkComic(req, res) {
    try {
        const userId = req.user.id; 
        const { comicId, comic } = req.body;
        if (!comicId) {
            throw { status: 400, message: "Missing parameter" };
        }
        const newBookmark = new Comic({
            profile_id: userId,
            comicId,
            comic,
        });
        const comicBookmark = await newBookmark.save();
        res.status(201).json(comicBookmark);

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


module.exports = {
    bookmarkCharacter,
    bookmarkComic
}