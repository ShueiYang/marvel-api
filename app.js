const express = require('express');
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./auth/passport");

const comicsRoute = require('./routes/comic');
const charactersRoute = require('./routes/characters');
const loginRouter = require('./routes/auth');
const fixSessionWithPassport = require("./middleware/fixSession");
const bookmarkRoute = require('./routes/bookmark');

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieSession({
    name: "session", 
    maxAge: 1000 * 60 * 60 * 24, //24 hours
    keys: [ process.env.COOKIE_SECRET ],
}));


// fix passport 0.6V issue to register regenerate & save after the cookieSession middleware initialization
app.use(fixSessionWithPassport);

app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res)=> {
    res.send("Welcome to the Marvel Api 👋🌏✨")
})

app.use("/characters", charactersRoute);
app.use("/comics",  comicsRoute);
app.use("/auth", loginRouter);
app.use("/bookmark", bookmarkRoute);


app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});


module.exports = app;
