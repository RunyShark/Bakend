const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT_SERVER } = process.env;

require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = PORT_SERVER;
    this.paths = {
      prueva: "/",
    };

    this.conectarDB();
    this.middelwares();
    this.routet();
  }
  async conectarDB() {}
  middelwares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  routet() {
    this.app.use(this.paths.prueva, require("../routers/authLogin.routes"));
  }
  lister() {
    this.app.listen(this.port, (error) => {
      if (error) console.log(`${"status 500 lister sv".red} ${error}`);
      console.log(
        `${"server corriendo en el purto".rainbow} ${this.port.green}`
      );
    });
  }
}

module.exports = Server;
