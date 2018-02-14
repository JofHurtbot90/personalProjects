const express = require('express');
const User = require('../models/user');
const authRouter = express.Router();
const passport = require('passport');
const Strategy = require('passport-local');
require('dotenv').config();

passport.use(new Strategy((usernameAttempt, passwordAttempt, done) =>{
  User.findOne({
    username: usernameAttempt
  }, (err, currentUser)=>{
    if(err){
      done(err, false);
    }else if(currentUser === null){
      done(null, false);
    }else{
      currentUser.auth(passwordAttempt, (isCorrect)=>{
        done(null, isCorrect)
      });
    }
  });
}));

authRouter.post('/signup', (req, res)=>{
  User.findOne({
    username: req.body.username
  }, (err, result)=>{
    if(err){
      res.status(500).send({
        success: false,
        err
      });
    }else if(result !== null){
      res.status(400).send({
        success: false,
        err: 'That username already exists'
      });
    } else {
      const newUser = new User(req.body);
        if(err){
          res.status(500).send({
            success: false,
            err
          });
        } else {
          res.status(201).send({
            success: true,
            user: user.withoutPassword(),
            token: jwt.sign(user.withoutPassword(), process.env.SECRET, {
              expiresIn: 30 * 60
            })
          });
        }
      };
  });
});

authRouter.use(passport.initialize());

authRouter.post('/login', passport.authenticate('local', {session: false}), (req, res)=>{
  User.findOne({
    username: req.body.username
  }, (err, user)=>{
    if(err){
      res.status(500).send({
        success: false,
        err
      });
    } else if(user === null){
      res.status(404).send({
        success: false,
        err: "That user doesn't exist"
      })
    } else {
      res.status(201).send({
        success: true,
        user: user.withoutPassword(),
        token: jwt.sign(user.withoutPassword(), process.env.SECRET, {
          expiresIn: 30 * 60
        })
      });
    }
  })
});

module.exports = authRouter;
