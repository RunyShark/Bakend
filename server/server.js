const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT_SERVER } = process.env;
const { conn } = require("../db/db");
const { auth, characters, movies, gender } = require("../routers/index");

require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = PORT_SERVER;
    this.paths = {
      routerAuth: "/auth",
      routerCharacters: "/characters",
      routerMovies: "/movies",
      routerGender: "/gender",
    };

    this.middelwares();
    this.routet();
  }

  middelwares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  routet() {
    this.app.use(this.paths.routerAuth, auth);
    this.app.use(this.paths.routerGender, gender);
    this.app.use(this.paths.routerMovies, movies);
    this.app.use(this.paths.routerCharacters, characters);
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
