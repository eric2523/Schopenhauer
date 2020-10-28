// create Express server in app
const express = require("express");
const app = express();

// Run locally on 5000, on variable if deployed
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port ${port}`));


// Let's build differently for deployment
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

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

// Let's get rudimentary songs AWS-uploading and URL-fetching 

const songs = require("./routes/api/songs");
app.use("/api/songs", songs);

