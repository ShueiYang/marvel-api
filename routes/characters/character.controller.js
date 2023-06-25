const axios = require("axios");


async function getAllCharacter(req, res) {
    try {
        const { name, skip } = req.query

        const response = await axios.get(`${process.env.API_URL}/characters`, {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
                skip: skip,
                name: name,
            }
        })
        if (response.status === 200) {
            res.json(response.data)
        }
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}


async function getCharacterDetail(req, res) {
    try {
        const { characterId } = req.params

        const response = await axios.get(`${process.env.API_URL}/character/${characterId}`, {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
            }
        })
        if (response.status === 200) {
            res.json(response.data)
        }
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}


module.exports = {
    getAllCharacter,
    getCharacterDetail
}