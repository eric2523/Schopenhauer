// For production, non-dual build code should be inserted

// create Express server in app
const express = require("express");
const app = express();

// Run locally on 5000, on variable if deployed
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Test to make sure Express is working
app.get("/", (req, res) => res.send("My name is Arthur"));

// Let's connect to the database
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Let's hook up our /users routes and configure passport

const users = require("./routes/api/users");
const passport = require('passport');
const bodyParser = require('body-parser');
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/users", users);

/// EXPERIMENT TIME

const songs = require("./routes/api/songs");

app.use("/api/songs", songs);

