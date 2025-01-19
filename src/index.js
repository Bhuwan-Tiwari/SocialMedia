const bodyParser = require("body-parser");
const express = require("express");
const connect = require("./config/database.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, async () => {
  await connect();
  console.log("server started at 3000");
});
