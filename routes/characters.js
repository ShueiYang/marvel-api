const express = require("express");
const charactersRoute = express.Router();
const axios = require("axios")


charactersRoute.get("/", async (req, res) => {
    try {
        const { name, skip } = req.query

        const response = await axios.get("https://lereacteur-marvel-api.herokuapp.com/characters", {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
                skip: skip,
                name: name,
            }
        })
        if(response.status === 200) {
            res.json(response.data)
        }
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})


charactersRoute.get("/:characterId", async (req, res) => {
    try {
        const { characterId } = req.params

        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${characterId}`, {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
            }
        })
        if(response.status === 200) {
            res.json(response.data)
        }
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})



module.exports = charactersRoute;