

const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Users has two routes /signin and /signup

const validateSignUpInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
