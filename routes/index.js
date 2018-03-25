const express         = require("express");
const router          = express.Router();
const models          = require("../models/index");
const passport        = require('passport');
const bcrypt          = require("bcrypt");
const jwt               = require('jsonwebtoken');
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
  if ((!req.body.email) || (!req.body.password)) {
    res.status(403).send({error: 'Fields must not be empty.'})
  } else {
    models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        res.status(200).send({user: user, auth_token: token});
      } else {
        res.status(403).send({error: "Username or password does not match."})
      }
    }).catch(function(err) {
      res.status(404).send({error: err});
    })
  }
});


// √√√√ signup route
router.post('/signup', function(req, res) {
  let username         = req.body.username;
  let password         = req.body.password;
  let email            = req.body.email;
  let confirmPassword  = req.body.confirmPassword;

  if (!username || !password) {
    res.status(403).send({error: 'User name and password must not be blank.'})
  }

  let salt = bcrypt.genSaltSync(10)
  let passwordHash = bcrypt.hashSync(password, salt)

  let newUser = {
    email: email,
    username: username,
    salt: salt,
    password: passwordHash
  }

  if (password === confirmPassword) {
    models.User.create(newUser)
    .then(function(data) {
      res.status('201').send(data);
    })
    .catch(function(error) {
      res.status('400').send({error: error});
    });
  } else {
    res.status('403').send({error: "Passwords do not match.", body: req.body})
  }
});


// get all users
router.get('/user', function(req, res) {
  models.User.findAll({})
  .then(function(data) {
    res.status(200).json(data);
  })
  .catch(function(error) {
    res.status(500).json(error);
  })
})

// delete a user from the db
//in the future we must delete associated data first
router.delete('/user/:username', function(req, res) {
  models.User.destroy({
    where: {username: req.params.username}
  })
  .then(function(data) {
    res.status(200).send(req.params.username + " deleted.");
  })
  .catch(function(error) {
    res.status(500).send(error);
  });
})


// √√√√ getting the entire gamelist with alternates and likes
router.get('/gameList', function(req, res) {
  models.Game.findAll({
    include: [{
       model: models.Alternate,
       as: 'Alternates',
       include: [{
         model: models.Like, as: "Likes"
       }]
     }]
  })
  .then(function(data) {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("No games found")
    }
  })
  .catch(function(err) {
    res.status(500).json(err);
  })
});


// √√√√ getting a game based on id
router.get('/game/:id', function(req, res) {
  models.Game.findOne({
    where: {id: req.params.id},
    include: [{
      model: models.Alternate, as: 'Alternates',
      include: [{
        model: models.Like, as: "Likes"
      }]
    }]
  })
  .then(function(data) {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send('Not Found');
    }
  })
  .catch(function(error) {
    res.status(500).send(error);
  });
});


// √√√√ create a game with the details
router.post("/game/new", function(req, res) {
  models.Game.create({
    title:           req.body.title,
    userId:          req.body.userId,
    category:        req.body.category,
    objective:       req.body.objective,
    numberOfPlayers: req.body.numberOfPlayers,
    playerAgeRange:  req.body.playerAgeRange,
    rules:           req.body.rules,
    productLink:     req.body.productLink
  })
  .then(function(data) {
    res.status(200).json(data)
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
});


// delete a game based on id
// dont forget to delete associated data with it (Alternates and Likes)
router.delete("/game/:gameId", function(req, res) {

  // TODO: We need to destroy any associated data (alternates and likes) before deleting the game
  models.Game.destroy({
    where: {id: req.params.gameId}
  })
  .then(function(data) {
    res.status(200).send({status: 'success', data: data});
  })
  .catch(function(error) {
    res.status(500).send({status: 'failure', error: error});
  })
})


// √√√√√ create an alternate version of a game based on gameId
router.post("/game/:gameid/alternate", function(req, res) {
  models.Alternate.create({
    gameId:    req.body.gameId,
    userId:    req.body.userId,
    title:     req.body.title,
    objective: req.body.objective,
    rules:     req.body.rules
  })
  .then(function(data) {
    res.status(201).send(data);
  })
  .catch(function(error) {
    res.status(500).send(error)
  });
});


// delete an alternate version of a game based on gameId and alternateId
router.delete('game/:gameId/alternate/:alternateId/delete', function(req, res) {
  models.Alternate.destroy({
    where: {id: req.params.alternateId}
  })
  .then(function(data) {
    res.status(200).send(data);
  })
  .catch(function(error) {
    res.status(500).send(error);
  });
});

// √√√√ create a Likes route to add a like to the db
router.post("/game/:userId/alternate/:alternateId/", function(req, res) {
  models.Like.findOrCreate({
    where: {
      userId: req.params.userId,
      alternateId: req.params.alternateId
    },
      defaults: {
        userId: req.params.userId,
        alternateId: req.params.alternateId
      }
  })
  .then(function(data) {
    res.status(200).send(data)
  })
  .catch(function(err) {
    res.status(500).json(err)
  });
})


// delete a Like route to remove a like from the db
router.delete('game/:gameId/alternate/:alternate/:likeId/', function(req, res) {

  // TODO probably need to find the 'like' first then delete it.
  models.Like.destroy({
    where: {id: req.params.likeId}
  })
  .then(function(data) {
    res.status(200).send({status: 'success', data: data});
  })
  .catch(function(error) {
    res.status(500).send({status: 'failure', error: error});
  });

});


// get all alternates
router.get('/alternates', function(req, res) {
  models.Alternate.findAll({
    include: [
      {model: models.Like, as: 'Likes'}
    ]
  })
  .then(function(data) {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Data not found")
    }
  })
  .catch(function(err) {
    res.status(500).json(err);
  })
})


module.exports = router;
