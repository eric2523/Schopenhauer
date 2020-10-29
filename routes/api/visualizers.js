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


router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = { _id: req.visualizer.id };
    Visualizer.findOneAndUpdate(query, {
      name: req.body.name,
      typeSettings: req.body.typeSettings,
      generalSettings: req.body.generalSettings,
      songId: req.body.songId,
    })
      .then((visualizer) => res.json(visualizer))
      .catch((err) => res.status(422).json(err));
  }
);