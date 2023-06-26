const express = require("express");
const bookmarkRoute = express.Router();

const { getBookmarkCharacters, getBookmarkComics } = require("./bookmarkController/getBookmarkList");
const { bookmarkCharacter, bookmarkComic } = require("./bookmarkController/createBookmark");
const { deleteBookmarkCharacter, deleteBookmarkComic } = require("./bookmarkController/deleteBookmark");
const checkLoggedIn = require("../../middleware/isAuthenticate");


bookmarkRoute.get("/character", checkLoggedIn, getBookmarkCharacters);


bookmarkRoute.get("/comic", checkLoggedIn, getBookmarkComics);


bookmarkRoute.post("/character", checkLoggedIn, bookmarkCharacter);


bookmarkRoute.post("/comic", checkLoggedIn, bookmarkComic);


bookmarkRoute.delete("/character/:id", checkLoggedIn, deleteBookmarkCharacter);


bookmarkRoute.delete("/comic/:id", checkLoggedIn, deleteBookmarkComic);


module.exports = bookmarkRoute;