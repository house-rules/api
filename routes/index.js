const express         = require("express");
const router          = express.Router();
const models          = require("../models/index");
const passport        = require('passport');
const BasicStrategy   = require('passport-http').BasicStrategy;


router.get("/", function(req, res) {
  console.log('<----get @ /---->');
  console.log('req---> ', req);
  res.status('200').send("Hiya");
});

router.post("/", function(req, res) {
  console.log('<----post @ /---->');
  console.log('req/---> ', req.body);
  res.status('200').send(req.body);
});

// login route
router.post('/login', function(req, res) {
  console.log('<----post @ /login ---->');
  console.log('req/login---> ', req.body);
  res.status("200").send(req.body);
});

// signup route
router.post('/signup', function(req, res) {
  console.log('<----post @ /signup ---->');
  console.log('req/signup---> ', req.body);
  res.status('200').send(req.body);
});


module.exports = router;
