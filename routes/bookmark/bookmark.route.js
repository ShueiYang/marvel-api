const express = require("express");
const bookmarkRoute = express.Router();

const { getBookmarkCharacters, getBookmarkComics } = require("./bookmarkController/getBookmarkList");
const { bookmarkCharacter, bookmarkComic } = require("./bookmarkController/createBookmark");
const { deleteBookmarkCharacter, deleteBookmarkComic } = require("./bookmarkController/deleteBookmark");


bookmarkRoute.get("/character", getBookmarkCharacters);


bookmarkRoute.get("/comic", getBookmarkComics);


bookmarkRoute.post("/character", bookmarkCharacter);


bookmarkRoute.post("/comic", bookmarkComic);


bookmarkRoute.delete("/character/:userId/:id", deleteBookmarkCharacter);


bookmarkRoute.delete("/comic/:userId/:id", deleteBookmarkComic);


module.exports = bookmarkRoute;