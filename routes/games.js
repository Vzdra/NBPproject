//jshint esversion:7
const configuration = require("../data/configuration");
const tunnel = require("tunnel-ssh");
const helpers = require("../helpers/connection");
const queries = require("../database/queries");
const bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
const config = configuration.config;

var fetching = false;

router.get("/addgame", (req, res) => {
  if(fetching == false){
    fetching = true;
    var devs = [];
    var plats = [];
    var genres = [];
    helpers.getIndiscriminateResult(queries.getAddGameView, result => {
      result.rows.forEach(item => {
        switch(item.tablename){
        case 'developers':
          devs.push(item);
          break;
        case 'platform':
          plats.push(item);
          break;
        case 'genre':
          genres.push(item);
          break;
        }
      });
      res.render('addgame', {devs: devs, plats: plats, genres: genres});
      fetching = false;
    });
  }
});

router.post("/addgame", (req, res) => {
  if(fetching == false){
    fetching = true;
    var newgame = {
      name: req.body.game_name,
      image_url: req.body.img_url,
      desc: req.body.descriptiontext,
      release: req.body.release_date,
      revenue: req.body.revenue,
      dev: req.body.developer,
      plats: req.body.platforms,
      gen: req.body.genres,
      types: req.body.types.split(",")
    };

    var insertString = queries.insertFullGame(newgame);

    helpers.getIndiscriminateResult(insertString, result => {
      console.log(result);
      res.redirect("/");
      fetching = false;
    });

  }
});

router.get("/:id", (req,res) => {
  if(fetching == false){
    fetching = true;
    var id = req.params.id;
    helpers.getIndiscriminateResult(queries.getFullGameDetails(id), result =>{
      res.render('gamedetail', {item: result.rows[0]});
      fetching = false;
    });
  }
});

router.get("/:id/delete", (req,res) => {
  if(fetching == false){
    fetching = true;
    var id = req.params.id;
    var jointQuery = queries.effectiveGameDelete(id);
    helpers.getIndiscriminateResult(jointQuery, result=>{
      console.log(result);
      fetching = false;
      res.redirect("/");
    });
  }
});


module.exports = router;
