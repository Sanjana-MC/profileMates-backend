var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.post("/addname", (req, res) => {
  const myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send("Name saved to database");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});