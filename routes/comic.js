const express = require("express");
const comicsRoute = express.Router();
const axios = require("axios")


comicsRoute.get("/", async (req, res) => {
    try {
        const { title, skip } = req.query;
        const response = await axios.get("https://lereacteur-marvel-api.herokuapp.com/comics", {
            params: {
                apiKey: process.env.MARVEL_API_KEY,
                skip: skip,
                title: title
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


comicsRoute.get("/:comicId", async (req, res) => {
    try {
        const { comicId } = req.params;

        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}`, {
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



module.exports = comicsRoute;