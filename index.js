const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())
require("dotenv").config();
const port = process.env.PORT || 8000
const {readdirSync} = require("fs")
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

readdirSync("./routes").map((file)=>app.use("/",require("./routes/"+file)))

app.get("/", (req, res) => {
  res.send("Main page!");
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});