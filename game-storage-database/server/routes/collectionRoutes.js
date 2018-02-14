const express = require('express');
const collectionRoutes = require('../models/collection');
const collectionRouter = express.Router();
const expressJwt = require('express-jwt');
require('dotenv').config();
const auth = expressJwt({secret: process.env.SECRET});

collectionRouter.use(auth);

collectionRouter.route('/')
  .get((req, res)=>{
    Collection.find(({user: req.user._id}),
    (err, collections)=>{
      if(err) return res.status(500).send(err);
      return res.status(200).send(collections);
    });
  })

  .post((req, res)=>{
    const collection = new Collection(req.body);
    todo.user = req.user;
    collection.save((err, newCollection)=>{
      if(err) return res.status(500).send(err);
      return res.status(201).send(newCollection);
    });
  });


collectionRouter.route('/:collectionId')
  .get((req, res)=>{
    Collection.findOne({_id: req.params.collectionId, user: req.user._id}, (err, collection)=>{
      if(err) return res.status(500).send(err);
      if(!collection) return res.status(404).send('No collection item found.');
      return res.status(200).send(collection);
    });
  })

  .put((req,res)=>{
    Collection.findOneAndUpdate({_id: req.params.collectionId, user: req.user._id}, req.body, {new: true}, (err, collection)=>{
      if(err) return res.status(500).send(err);
      return res.status(200).send(collection);
    });
  })

  .delete((req, res)=>{
    Collection.findOneAndRemove({_id: req.params.collectionId, user: req.user._id}, (err, collection)=>{
      if(err) return res.status(500).send(err);
      return res.status(200).send(collection);
    });
  });

module.exports = collectionRouter;
