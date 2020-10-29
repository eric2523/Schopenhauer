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

router.get("/", (req, res) => {
  Visualizer.find({ userId: req.query.user_id })
    .then((visualizers) => res.json(visualizers))
    .catch((err) => restart.status(404).json(err));
});

router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.visualizer.id };
    const update = {
      name: req.body.name,
      typeSettings: req.body.typeSettings,
      generalSettings: req.body.generalSettings,
      songId: req.body.songId,
    };
    Visualizer.findOneAndUpdate(filter, update, { new: true })
      .then((visualizer) => res.json(visualizer))
      .catch((err) => res.status(422).json(err));
  }
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Visualizer.findByIdAndDelete(req.visualizerId)
      .then(() => res.status(200))
      .catch((err) => res.status(404).json(err));
  }
);
