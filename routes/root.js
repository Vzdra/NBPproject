//jshint esversion:8
const configuration = require("../data/configuration");
const tunnel = require("tunnel-ssh");
const helpers = require("../helpers/connection");
const queries = require("../database/queries");
const bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
const config = configuration.config;

var fetching = false;

router.get("/games",(req, res) => {
  if (fetching == false) {
    fetching = true;
    helpers.getIndiscriminateResult(queries.getGames, result => {
      res.render('landing', {data: result.rows});
      fetching = false;
    });
  }else{
    console.log("WTF");
  }
});

router.get("/developers",(req, res) => {
  if(fetching == false){
    fetching = true;
    helpers.getIndiscriminateResult(queries.getDevs, result => {
      res.render('developers', {data: result.rows});
      fetching = false;
    });
  }else{
    console.log("WTF");
  }
});

router.get("/platforms",(req, res) => {
  if(fetching == false){
    fetching = true;
    helpers.getIndiscriminateResult(queries.getPlatforms, result => {
      res.render('platforms', {data: result.rows});
      fetching = false;
    });
  }else{
    console.log("WTF");
  }
});

module.exports = router;
