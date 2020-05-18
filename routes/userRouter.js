const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/Users');
const mongoose = require('mongoose');

const app = express();

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/').
get((req, res, next) => {
    Users.find({})
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(user)
        }, (err) => next(err))
        .catch((err) => {
            next(err)
        })
}).
post((req, res, next) => {
    Users.create(req.body).
    then((user)=>{
        console.log('User Created');
        res.sendStatus = 200;
        res.setHeader('content-type', 'application/json');
        res.json(user);
    }, (err)=> console.log(err))
})

userRouter.route('/:userID')
.get((req, res, next) => {
    Users.findById(req.params.userID)
    .then((user) => {
        if(!user) {
            res.statusCode = 404;
            res.setHeader('content-type', 'text/plain');
            res.send('User with given ID is not available');
        }
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(user);
    }, (err) => next(err)).catch((err) => next(err));
})
.put((req,res,next)=>{
    mongoose.set('useFindAndModify', false);
    Users.findByIdAndUpdate(req.params.userID, { $set: req.body}, {new: true })
        .then((user) => {
            if (!user) {
                res.statusCode = 404;
                res.setHeader('content-type', 'text/plain');
                res.send('User with given ID is not available');
            }
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(user);
        }, (err) => next(err)).catch((err) => next(err));
})
.delete((req,res,next)=>{
    Users.findByIdAndRemove(req.params.userID).then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(resp);
    }, (err) => next(err)).catch((err) => next(err));
})


module.exports = userRouter;