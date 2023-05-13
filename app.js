const express = require('express');

const cors = require("cors");
const comicsRoute = require('./routes/comic');
const charactersRoute = require('./routes/characters');

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res)=> {
    res.send("Welcome to the Marvel Api 👋🌏✨")
})

app.use("/characters", charactersRoute);
app.use("/comics",  comicsRoute);


app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});


module.exports = app;
