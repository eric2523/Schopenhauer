const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../../models/Song");
const upload = require("./song_upload_aws");
const singleUpload = upload.single("song");

// get route here for songs
// something like /songs/:user_id

router.post('/uploadSong', passport.authenticate("jwt", { session: false }), singleUpload, (req, res) => {

  singleUpload(req, res, function(err) {
    if(err) {
      return res.status(422).json({errors: err.message});
    }    
    console.log(req.body.userId)
    return res.json({'songUrl': req.file.location, 'userId': req.userId, 'fileName': req.file.originalname});
  })   
});

router.post('/uploadSongDB', (req, res) => {
  const newSong = new Song({
      userId: req.body.data.userId,
      fileName: req.body.data.fileName,
      url: req.body.data.songUrl
  });
  newSong.save()
      .then(song => res.json(song));
    
});

module.exports = router;