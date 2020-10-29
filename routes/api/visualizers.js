const express = require("express");
const router = express.Router();
const passport = require("passport");
const Visualizer = require("../../models/Visualizer");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newVisualizer = new Visualizer({
      name: req.body.name,
      type: req.body.type,
      typeSettings: req.body.typeSettings,
      generalSettings: req.body.generalSettings,
      userId: req.body.userId,
      songId: req.body.songId,
    });
    newVisualizer.save().then((visualizer) =>
      res.json({
        name: visualizer.name,
        type: visualizer.type,
        typeSettings: visualizer.typeSettings,
        generalSettings: visualizer.generalSettings,
        userId: visualizer.userId,
        songId: visualizer.songId,
      })
    );
  }
);

