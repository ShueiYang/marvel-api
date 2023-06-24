const axios = require("axios");


async function getAllComics(req, res) {
    try {
        const { title, skip } = req.query;
        const response = await axios.get(`${process.env.API_URL}/comics`, {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
                skip: skip,
                title: title
            }
        });
        if (response.status === 200) {
            res.json(response.data);
        }
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


async function getComicDetail(req, res) {
    try {
        const { comicId } = req.params;

        const response = await axios.get(`${process.env.API_URL}/comic/${comicId}`, {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
            }
        });
        if (response.status === 200) {
            res.json(response.data);
        }
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}



module.exports = {
    getAllComics,
    getComicDetail
}