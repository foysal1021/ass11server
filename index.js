const express = require("express");
const app = express();
const port = 5000 || process.env.PROT;
var cors = require("cors");
require("dotenv").config();

//midle were start
app.use(cors());
app.use(express.json());
//midle were end

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
