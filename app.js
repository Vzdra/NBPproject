//jshint esversion:8
const bodyParser = require("body-parser");
const games = require("./routes/games");
const root = require("./routes/root");
const express = require("express");
const ejs = require("ejs");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use("/", root);
app.use("/games", games);

app.get("/", (req, res) => {
  res.redirect("/games");
});

app.listen(port);
