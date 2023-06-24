const express = require("express");
const comicsRoute = express.Router();


const { getAllComics, getComicDetail } = require("./comic.controller");


comicsRoute.get("/", getAllComics);

comicsRoute.get("/:comicId", getComicDetail);


module.exports = comicsRoute;