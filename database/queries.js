//jshint esversion:6
const generalQueries = {
  getGames: "select * from game_view",
  getDevs: "select * from developers",
  getPlatforms: "select * from platforms",
  getGenres: "select * from genre",
  getAddGameView: "select * from add_game_selectables",
  deleteGame: function(gameid){
    return "delete from games where game_id = " + gameid;
  },
  getFullGameDetails: function(gameid){
    return "select * from full_game_view where gameid = " + gameid;
  },
  deleteGameOnPlatform: function(gameid){
    return "delete from games_on_platforms where game_id = " + gameid;
  },
  deleteGameType: function(gameid){
    return "delete from game_kind where game_id = " + gameid;
  },
  deleteGameGenre: function(gameid){
    return "delete from game_genre where game_id = " + gameid;
  },
  effectiveGameDelete: function(gameid){
    return this.deleteGameOnPlatform(gameid) + "; " + this.deleteGameType(gameid) + "; " + this.deleteGameGenre(gameid) + "; " + this.deleteGame(gameid) + ";";
  },
  insertGame: function(value){
    return "insert into games(name, image_url, description, dev_id, release_date, revenue) values ('" + value.name + "','" + value.image_url + "','" + value.desc + "'," + value.dev + ",'" + value.release + "'," + value.revenue + ");";
  },
  insertGameTypes: function(value, type){
    return "insert into game_kind(game_id, kind) values ((SELECT game_id FROM games WHERE name= '" + value + "' ), '" + type + "');";
  },
  insertGameGenre: function(value, genreid){
    return "insert into game_genre(game_id, genre_id) values ((SELECT game_id FROM games WHERE name= '" + value + "' ), " + genreid + ");";
  },
  insertGameOnPlatform: function(value, platid){
    return "insert into games_on_platforms(game_id, plat_id) values ((SELECT game_id FROM games WHERE name= '" + value + "' )," + platid + ");";
  },
  insertFullGame: function(value){
    var queryString = this.insertGame(value);
    value.plats.forEach(plat =>{
      queryString += this.insertGameOnPlatform(value.name, plat);
    });
    value.gen.forEach(genre => {
      queryString += this.insertGameGenre(value.name, genre);
    });
    value.types.forEach(type => {
      queryString += this.insertGameTypes(value.name, type);
    });
    return queryString;
  }
};

module.exports = generalQueries;
