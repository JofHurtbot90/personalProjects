const express = require('express');
const expressJwt = require('express-jwt');
require('dotenv').config();
const User = require('../models/user');

const profileRoute = express.Router();
const auth = expressJwt({secret: process.env.SECRET});

profileRoute.use(auth);

profileRoute.route('/verify')
  .get((req, res)=>{
  User.findById(req.user._id, (err, user)=>{
    if(err){
      res.status(500).send({
        success: false,
        err
      })
    } else if(user === null){
      res.status(400).send({
        err: 'User not found'
      })
    } else{
      res.status(200).send({
        success: true,
        user: userWithoutPassword(),
      })
    }
  })
  });

  module.exports = profileRoute;
