// Use express for router

const express = require("express");
const router = express.Router();
const User = require("../../models/User");

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
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, email: user.email };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
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
        const payload = { id: user.id, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
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

module.exports = router;