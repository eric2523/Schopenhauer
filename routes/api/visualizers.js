const express = require("express");
const router = express.Router();
const passport = require("passport");
const Visualizer = require("../../models/Visualizer");

router.post(
  "/",
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
    newVisualizer.save().then((visualizer) => {
      // update User embedding
      User.findById(visualizer.userId, function (err, userOwner) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Visualizer belongs to " + userOwner.username);
        userOwner.visualizers.push(visualizer._id)
        userOwner.save()
      });

      return res.json({
        _id: visualizer._id,
        name: visualizer.name,
        type: visualizer.type,
        typeSettings: visualizer.typeSettings,
        generalSettings: visualizer.generalSettings,
        userId: visualizer.userId,
        songId: visualizer.songId,
      });
    });
  }
);

router.get("/", (req, res) => {
  Visualizer.find({ userId: req.query.userId })
    .then((visualizers) => {
      res.json(visualizers);
    })
    .catch((err) => res.status(404).json(err));
});

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.body._id };
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
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Remove from user's list of visualizers
      Visualizer.findById(req.query.id, function(err, visualizer) {
        User.findById(visualizer.userId, function(err, userOwner) {
          if (err) {
            console.log(err);
            return;
          }
          userOwner.visualizers.pull({_id: visualizer._id});
          userOwner.save().then(() => {
            Visualizer.findByIdAndDelete(req.query.id)
            .then(() => res.status(200).json("success!"))
            .catch((err) => res.status(404).json(err));
          });
        })
      });
  }
);

module.exports = router;
