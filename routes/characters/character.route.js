const express = require("express");
const charactersRoute = express.Router();

const { getAllCharacter, getCharacterDetail } = require("./character.controller");


charactersRoute.get("/", getAllCharacter);

charactersRoute.get("/:characterId", getCharacterDetail);


module.exports = charactersRoute;