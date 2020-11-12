const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../../models/Song");
const upload = require("./song_upload_aws");
const singleUpload = upload.single("song");

router.get("/users", (req, res) => {
  Song.find({ userId: req.query.userId })
    .then((songs) => res.json(songs))
    .catch((err) => res.status(400).json(err));
});

router.post(
  "/uploadSong",
  passport.authenticate("jwt", { session: false }),
  singleUpload,
  (req, res) => {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).json({ errors: err.message });
      }
      console.log(req.body.userId);
      return res.json({
        songUrl: req.file.location,
        userId: req.userId,
        fileName: req.file.originalname,
      });
    });
  }
);

router.post("/uploadSongDB", (req, res) => {
  const newSong = new Song({
    userId: req.body.userId,
    title: req.body.title,
    artist: req.body.artist,
    fileName: req.body.fileName,
    songUrl: req.body.songUrl,
  });
  newSong.save().then((song) => { 
  res.json({
      id: song.id,
      userId: song.userId,
      title: song.title,
      artist: song.artist,
      fileName: song.fileName,
      songUrl: song.songUrl,
    })}
  );
});

module.exports = router;
