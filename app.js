const express = require("express");
const db = require("./models");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// cors 的預設為全開放
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

require("./routes")(app);
