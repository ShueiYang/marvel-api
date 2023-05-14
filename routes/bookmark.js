const express = require("express");
const bookmarkRoute = express.Router();
const Character = require("../models/Character");
const Comic = require("../models/Comic");



bookmarkRoute.get("/character", async(req, res) => {
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
})


bookmarkRoute.get("/comic", async(req, res) => {
    try {
        const { userId } = req.query
        if(!userId) {
          return res.status(200).json([]); 
        }
        const result = await Comic.find({profile_id: userId}).exec();
        return res.status(200).json(result)     
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})



bookmarkRoute.post("/character", async(req, res) => {
    try {
        const { userId, characterId, character } = req.body;
        if(!userId || !characterId) {
            throw { status: 400, message: "Missing parameter" }; 
        }     
        const newBookmark = new Character({
            profile_id: userId,
            characterId, 
            character,
        })
        const charBookmark = await newBookmark.save();
        res.status(201).json(charBookmark.character)   
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})


bookmarkRoute.post("/comic", async(req, res) => {
    try {
        const { userId, comicId, comic } = req.body;
        if(!userId || !comicId) {
            throw { status: 400, message: "Missing parameter" }; 
        }     
        const newBookmark = new Comic({
            profile_id: userId, 
            comicId,
            comic,
        })
        const comicBookmark = await newBookmark.save();
        res.status(201).json(comicBookmark.comic)   
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})


bookmarkRoute.delete("/character/:userId/:id", async(req, res) => {
    try {
        const { userId, id } = req.params;
        if(!userId || !id) {
            throw { status: 400, message: "Missing parameter" }; 
        }     
        const result = await Character.findOneAndDelete({
            profile_id: userId,
            characterId: id
        })
        if(result === null) {
            throw { status: 400, message: "Bookmark not found" }; 
        }
        res.status(200).json({ message: "Bookmark succesfully deleted"})
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})


bookmarkRoute.delete("/comic/:userId/:id", async(req, res) => {
    try {
        const { userId, id } = req.params;
        if(!userId || !id) {
            throw { status: 400, message: "Missing parameter" }; 
        }     
        const result = await Comic.findOneAndDelete({
            profile_id: userId,
            comicId: id
        })
        if(result === null) {
            throw { status: 400, message: "Bookmark not found" }; 
        }
        res.status(200).json({ message: "Bookmark succesfully deleted"})
    
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
})



module.exports = bookmarkRoute;