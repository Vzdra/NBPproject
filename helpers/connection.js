//jshint esversion:8
const configuration = require("../data/configuration");
const tunnel = require("tunnel-ssh");
const { Client } = require("pg");

const config = configuration.config;

module.exports = {
  newClient: function (){
    return new Client({
      connectionString: configuration.localConnString
    });
  },
  getIndiscriminateResult:function (querry, callback){
    var tnl = tunnel(config, (err, tnl) => {
      var client = this.newClient();

      client.connect();
      client.query(querry).then(items => {
        callback(items);
      }).catch(err => {
        console.log(err);
      }).then(() => {
        client.end();
        tnl.close();
      });
    });
  }
};
