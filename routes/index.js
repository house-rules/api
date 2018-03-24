const express = require("express");
const router = express.Router();


router.get("/", function(req, res) {
  console.log('<----get @ /---->');
  console.log('req---> ', req);
  res.status('200').send("Hiya");
});

router.post("/", function(req, res) {
  console.log('<----post @ /---->');
  console.log('req---> ', req.body);
  res.status('200').send(req.body);
});

router.post('/login', function(req, res) {
  console.log('<----post @ /login ---->');
  console.log('req---> ', req.body);
  // console.log('res---> ', res.body);
  res.status("200").send(req.body);
});

router.post('/signup', function(req, res) {
  console.log('<----post @ /signup ---->');
  console.log('req---> ', req.body);
  res.status('200').send(req.body);
});


module.exports = router;
