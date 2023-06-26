const Character = require("../../../models/Character");
const Comic = require("../../../models/Comic");



async function deleteBookmarkCharacter(req, res) {
    try {
        const userId = req.user.id; 
        const { id } = req.params;
        if (!id) {
            throw { status: 400, message: "Missing parameter" };
        }
        const result = await Character.findOneAndDelete({
            profile_id: userId,
            characterId: id
        });
        if (result === null) {
            throw { status: 400, message: "Bookmark not found" };
        }
        res.status(200).json({ message: "Bookmark succesfully deleted" });

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


async function deleteBookmarkComic(req, res) {
    try {
        const userId = req.user.id; 
        const { id } = req.params;
        if (!id) {
            throw { status: 400, message: "Missing parameter" };
        }
        const result = await Comic.findOneAndDelete({
            profile_id: userId,
            comicId: id
        });
        if (result === null) {
            throw { status: 400, message: "Bookmark not found" };
        }
        res.status(200).json({ message: "Bookmark succesfully deleted" });

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


module.exports = {
    deleteBookmarkCharacter,
    deleteBookmarkComic
}