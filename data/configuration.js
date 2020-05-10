//jshint esversion:8
const owner = require("./cred.js");

const configuration = {
    config: {
      username: owner.sshuser,
      password: owner.sshpw,
      host: owner.remoteServer,
      port: owner.sshport,
      dstPort: owner.defaultPgPort,
      localPort: owner.localdbPort
    },
    localConnString: 'postgressql://' + owner.user + ':' + owner.pw + '@localhost:' + owner.localdbPort + '/' + owner.myDb
};

module.exports = configuration;
