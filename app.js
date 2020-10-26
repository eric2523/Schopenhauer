


// create Express server in app
const express = require("express");
const app = express();

// Run locally on 5000, on variable if deployed
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Test to make sure Express is working
app.get("/", (req, res) => res.send("My name is Arthur"));

