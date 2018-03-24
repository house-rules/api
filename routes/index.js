const express         = require("express");
const router          = express.Router();
const models          = require("../models/index");
const passport        = require('passport');
const bcrypt          = require("bcrypt");
const BasicStrategy   = require('passport-http').BasicStrategy;



passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));


router.get("/", function(req, res) {
  console.log('<----get @ /---->');
  console.log('req---> ', req);
  res.status(200).send({status: "200", message: 'Everything is fine, we\'re fine', requestBody: req.body});
});


router.post("/", function(req, res) {
  console.log('<----post @ /---->');
  console.log('req/---> ', req.body);
  res.status(200).send(req.body);
});


// login route
router.post('/login', function(req, res) {
  console.log('<----post @ /login ---->');
  console.log('req/login---> ', req.body);
  res.status(200).send(req.body);
});


// signup route
router.post('/signup', function(req, res) {
  console.log('<----post @ /signup ---->');
  console.log('req/signup---> ', req.body);

  let username = req.body.username
  let password = req.body.password
  let email     = req.body.email
  let confirmPassword = req.body.confirmPassword

  if (!username || !password) {
    res.status(403).send('User name and password must not be blank.')
  }

  let salt = bcrypt.genSaltSync(10)
  let passwordHash = bcrypt.hashSync(password, salt)

  let newUser = {
    email: email,
    username: username,
    salt: salt,
    password: passwordHash
  }

  console.log(newUser);

  if (password === confirmPassword) {
    models.User.create(newUser)
    .then(function(data) {
      res.status('201').send({status: 'success', data: data});
    })
    .catch(function(error) {
      res.status('400').send({status: 'failed', error: error});
    });
  } else {
    res.status('').send({status: "failed", error: "Passwords to not match."})
  }

  // res.status(200).send(newUser);
});


// getting the entire gamelist
router.get('/gameList', function(req, res) {
  console.log('<----get @ /gameList ---->');
  console.log('req/gameList---> ', req.body);

  // models.Game.findAll({
  //   include: [
  //     {model: models.Alternate, as: 'Alternates'}
  //   ]
  // })
  // .then(function(data) {
  //   if (data) {
  //     data = {"status": "success", data: data};
  //     res.status(200).json(data);
  //   } else {
  //     res.status(404).send("Data not found")
  //   }
  // })
  // .catch(function(err) {
  //   err = {"status": "fail", error: err};
  //   res.status(500).json(err);
  // })
  res.status(200).send({status: 'success', message: "This is a placeholder for the gamelist until the db is created"});
})


// getting a game based on id
router.get('/game/:id', function(req, res) {
  console.log('<----get @ /gameList ---->');
  console.log('req/game/:id request params---> ', req.params);
  console.log('req/game/:id request body---> ', req.body);

  // models.Game.findOne({
  //   where: {
  //     id: req.params.id
  //   }
  // }).then(function (data) {
  //   data = {'status': 'success', data: data};
  //   res.status(200).send(data);
  // });

  // models.Game.findAll({
  //   where: {id: req.params.id},
  //   order: [['createdAt', 'DESC']],
  //   include: [
  //     {model: models.Alternate, as: 'Alternates'}
  //   ]
  // })
  // .then(function(data) {
  //   if (data) {
  //     res.status(200).send({status: 'success', data: data})
  //   } else {
  //     res.status(404).send({status: 'failed', error: 'Not Found'});
  //   }
  // })
  // .catch(function(error) {
  //   res.status(500).send({status: 'failed', error: error});
  // });

  res.status(200).send({status: 'success', message: "This will one day be an actual games details", gameId: req.params.id});
});


// create a game with the details
router.post("/game/new", function(req, res) {
  console.log('<---post @ /game/new --->');
  console.log('req/game/new body---> ', req.body);

  // models.Game.create({
  //   title:           req.body.title,
  //   userId:          req.body.userId,
  //   category:        req.body.category,
  //   numberOfPlayers: req.body.numberOfPlayers,
  //   playerAgeRange:  req.body.playerAgeRange,
  //   rules:           req.body.rules,
  //   productLink:     req.body.productLink
  // })
  // .then(function(data) {
  //   data = {"status": "success", data: data};
  //   res.status(200).send(data)
  // })
  // .catch(function(err) {
  //   err = {"status": "fail", error: err};
  //   res.status(500).json(err)
  // })

});


// delete a game based on id
// dont forget to delete associated data with it (Alternates and Likes)
router.delete("/game/:gameId", function(req, res) {

  // TODO: We need to destroy any associated data (alternates and likes) before deleting the game

  // models.Game.destroy({
  //   where: {id: req.params.gameId}
  // })
  // .then(function(data) {
  //   res.status(200).send({status: 'success', data: data});
  // })
  // .catch(function(error) {
  //   res.status(500).send({status: 'failure', error: error});
  // })
})


// create an alternate version of a game based on gameId
router.post("/game/:gameid/alternate", function(req, res) {
  console.log('<---post @ /game/:gameid/alternate --->');
  console.log('req/game/:gameId/alternate body---> ', req.body);

  models.Alternate.create({
    gameId:    req.body.gameId,
    userId:    req.body.userId,
    title:     req.body.title,
    objective: req.body.objective,
    rules:     req.body.rules
  })
  .then(function(data) {
    res.status(201).send({status: 'success', data: data});
  })
  .catch(function(error) {
    res.status(500).send({status: 'failure', error: error})
  });

});


// delete an alternate version of a game based on gameId and alternateId
router.delete('game/:gameId/alternate/:alternateId/delete', function(req, res) {

  models.Alternate.destroy({
    where: {id: req.params.alternateId}
  })
  .then(function(data) {
    res.status(200).send({status: 'success', data: data});
  })
  .catch(function(error) {
    res.status(500).send({status: 'failue', error: error});
  });

});

// create a Likes route to add a like to the db
router.post("/game/:gameId/alternate/:alternateId/", function(req, res) {

  models.Like.create({
    gameId:  req.body.gameId,
    userId:  req.body.userId
  })
  .then(function(data) {
    data = {"status": "success", data: data};
    res.status(200).send(data)
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err)
  });

})


// delete a Like route to remove a like from the db
router.delete('game/:gameId/alternate/:alternate/likes/delete', function(req, res) {

  // TODO probably need to find the 'like' first then delete it.

  // models.Like.destroy({
  //   where: {id: req.params.alternateId}
  // })
  // .then(function(data) {
  //   res.status(200).send({status: 'success', data: data});
  // })
  // .catch(function(error) {
  //   res.status(500).send({status: 'failue', error: error});
  // });

});


module.exports = router;
