// Use express for router

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Song = require("../../models/Song");

// Users has four routes /signin, /signup, /follow, and /unfollow

const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

// authentication and passport

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              
              const newDefaultSong = new Song({
                userId: user.id,
                title: "Bensounds -- Going Higher",
                fileName: "bensound-goinghigher.mp3",
                songUrl: "https://schopenhauer-pro.s3-us-west-2.amazonaws.com/1604098109951-bensound-goinghigher.mp3",
              });
              newDefaultSong.save()
              
              const payload = {
                username: user.username, 
                id: user.id, 
                email: user.email, 
                followers: user.followers,
                follows: user.follows
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 36000 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    username: user.username
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { 
          username: user.username,
          id: user.id, 
          email: user.email,
          followers: user.followers,
          follows: user.follows 
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              username: user.username,
              photoUrl: user.photoUrl
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// Follow route

router.post("/follow", (req, res) => {
  const followerId = req.body.followerId;
  const followedId = req.body.followedId;
  console.log(`Fielding request that ${followerId} follow ${followedId}`);

  let errors = {};

  User.findById(followerId, function (err, follower) { 
    if (err) { 
      errors.follow = "No such follower id";
      console.log(errors); 
      return res.status(400).json(errors);
    }
    console.log(follower)
    User.findById(followedId, function (err, followed) {
      if (err) {
        errors.follow = "No such user to follow";
        console.log(errors);
        return res.status(400).json(errors);
      }
      console.log(followed);
      if (followed.followers.includes(followerId)) {
        errors.follow = "User already follows that user";
        return res.status(400).json(errors);
      }

      followed.followers.push(followerId);
      followed.save();
      follower.follows.push(followedId);
      follower.save();

      return res.json(follower.follows);
    }); 
  }); 
});

// Unfollow route

router.post("/unfollow", (req, res) => {
  const followerId = req.body.followerId;
  const followedId = req.body.followedId;
  console.log(`Fielding request that ${followerId} unfollow ${followedId}`);

  let errors = {};

  User.findById(followerId, function (err, follower) { 
    if (err) { 
      errors.follow = "No such follower id";
      console.log(errors); 
      return res.status(400).json(errors);
    }
    console.log(follower)
    User.findById(followedId, function (err, followed) {
      if (err) {
        errors.follow = "No such followed id";
        console.log(errors);
        return res.status(400).json(errors);
      }
      console.log(followed);
      if (!followed.followers.includes(followerId)) {
        errors.follow = "User does not follow that user";
        return res.status(400).json(errors);
      }

      followed.followers.pull({_id: followerId});
      followed.save();
      follower.follows.pull({_id: followedId});
      follower.save();

      return res.json(follower.follows);
    }); 
  }); 
});

// Get follows route

router.get("/follows", (req, res) => {
  const followerId = req.query.followerId;
  console.log(`Fielding request for those followed by ${followerId}`);

  let errors = {};

  User.findById(followerId, function (err, follower) { 
    if (err) { 
      errors.follow = "No such follower id";
      console.log(errors); 
      return res.status(400).json(errors);
    }
    console.log(follower)
      return res.json(follower.follows);
  }); 
});

//get followers 

router.get("/followers", (req,res) => {
  const userId = req.query.userId;
  let errors = {};
  User.findById(userId, function (err, user) {
    if (err) {
      error.followers = "No such user";
      return res.status(400).json(errors);
    }
    return res.json(user.followers)
  })
})

// get user 

router.get("/", (req, res) => {
  User.findById(req.query.id, function (err, user) {
    if (err) {
      errors.user = "No user with queried id";
      return res.status(400).json(errors);
    }
    const payload = { 
      username: user.username,
      id: user.id, 
      email: user.email,
      photoUrl: user.photoUrl,
      followers: user.followers,
      follows: user.follows 
    };
    return res.json(payload);
  })
});

// photo uploading capability

const upload = require("./photo_upload_aws");
const singleUpload = upload.single("image");

router.post(
  "/uploadPhoto",
  passport.authenticate("jwt", { session: false}), 
  singleUpload,
  (req, res) => {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).json({errors: err.message});
      }
      return res.json({
        photoUrl: req.file.location
      });
    });
  }
);

router.post(
  "/uploadPhotoDB",
  (req, res) => {
    console.log("Request to update photo for " + req.body.userId + " with " + req.body.photoUrl);
    User.findById(req.body.userId, function (err, user) {
      if (err) {
        errors.user = "No user with queried id";
        return res.status(400).json(errors);
      }
      user.photoUrl = req.body.photoUrl;
      user.save().then((user) => {
        res.json({
          username: user.username,
          id: user.id, 
          email: user.email,
          photoUrl: user.photoUrl,
          followers: user.followers,
          follows: user.follows 
        });
      });
    });
  }
);

module.exports = router;
