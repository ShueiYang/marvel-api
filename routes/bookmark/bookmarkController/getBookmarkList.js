const Character = require("../../../models/Character");
const Comic = require("../../../models/Comic");



const getBookmarkCharacters = async(req, res) => {
    try {
        const { userId } = req.query   
        if(!userId) {
          return res.status(200).json([]);
        }
        const result = await Character.find({profile_id: userId}).exec();    
        return res.status(200).json(result)     
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


async function getBookmarkComics(req, res) {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(200).json([]);
        }
        const result = await Comic.find({ profile_id: userId }).exec();
        return res.status(200).json(result);

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


module.exports = {
    getBookmarkCharacters,
    getBookmarkComics
}