const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT_SERVER } = process.env;
const { conn } = require("../db/db");
const { auth, characters, movies } = require("../routers/index");

require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = PORT_SERVER;
    this.paths = {
      routerAuth: "/auth",
      routerCharacters: "/characters",
      routerMovies: "/movies",
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
    this.app.use(this.paths.routerAuth, auth);
    this.app.use(this.paths.routerMovies, characters);
    this.app.use(this.paths.routerCharacters, movies);
  }
  lister() {
    conn.sync({ force: false }).then(() => {
      this.app.listen(this.port, (error) => {
        if (error) console.log(`${"status 500 lister sv".red} ${error}`);
        console.log(
          `${"server corriendo en el purto".rainbow} ${this.port.green}`
        );
      });
    });
  }
}

module.exports = Server;
