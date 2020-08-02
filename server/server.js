require('dotenv').config();
const express = require("express");
const path = require("path");
const CURR_PATH =
  process.env.NODE_ENV === "prod"
    ? path.join(__dirname, "../dist/")
    : path.join(__dirname, "../dev/");

const db = require('./database')
const mysql = require('mysql');
const {
  getItems,
  getBoxes,
  getLots,
  getBox,
  getItemByBoxID,
} = require("./dbfunctions");
const { addLot, addItem, addBox } = require("./new");
const prompt = require("prompt");

//console.log(process.env.USERNAME)
//console.log(process.env.PASSWORD)

/*
var schema = {
  properties: {
    username: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: "Name must be only letters, spaces, or dashes",
      required: true,
      description: "Please enter MySQL Username:",
    },
    password: {
      hidden: true,
      description: "Please enter MySQL Password",
    },
  },
};

prompt.start();

prompt.get(schema, function (err, result) {
  process.env.USERNAME = result.username;
  process.env.PASSWORD = result.password;
  console.log(result.username);

  const testConnect = mysql.createConnection({
  host: 'rswerner.com',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  connectTimeout: 1000,
  database: 'werner_inventory'
})

/*testConnect.ping(function(err, result) {
      if (err) {
          throw (err)
      } else {
          console.log(result)
      }
  })
  
  testConnect.end()

  
});*/

console.log(process.env.NODE_ENV);

  const App = express();

  App.use(express.json());

  const imgRouter = express.Router();
  const newRouter = express.Router();
  const boxRouter = express.Router();
  const loadRouter = express.Router();

  App.use("/img", imgRouter);
  App.use("/new", newRouter);
  App.use("/box", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });
  App.use("/load", loadRouter);

  App.get("/index.js", (req, res) => {
    res.sendFile(CURR_PATH + "index.js");
  });

  App.get("/", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/overview", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/new", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/allBoxes", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/tags", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/item/:id", (req, res) => {
    res.sendFile(CURR_PATH + "index.html");
  });

  App.get("/items", (req, res) => {
    getItems()
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  App.get("/boxes", (req, res) => {
    getBoxes()
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  App.get("/lots", (req, res) => {
    getLots()
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  imgRouter.get("/*?", (req, res) => {
    //console.log(CURR_PATH + '/img/' + req.params[0])
    res.sendFile(CURR_PATH + "/img/" + req.params[0]);
  });

  newRouter.post("/lot", (req, res) => {
    addLot(req.body)
      .then((success) => {
        res.status(201).json(success);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  newRouter.post("/box", (req, res) => {
    addBox(req.body)
      .then((success) => {
        console.log(success.insertId);
        res.status(201).json(success);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  newRouter.post("/item", (req, res) => {
    addItem(req.body)
      .then((success) => {
        res.status(201).json(success);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  loadRouter.get("/box", (req, res) => {
    const id = req.query.id;
    getBox(id)
      .then((ans) => {
        res.json(ans);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  loadRouter.get("/itemsofbox", (req, res) => {
    const id = req.query.id;
    getItemByBoxID(id)
      .then((ans) => {
        res.json(ans);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  App.listen(process.env.PORT, () => {
    console.log("Application is running on port " + process.env.PORT);
  });

  process.on("SIGINT", function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    process.exit(1);
  });
