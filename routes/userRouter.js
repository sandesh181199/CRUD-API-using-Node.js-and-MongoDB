const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/').
all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    next();
}).
get((req, res, next) => {
    res.end('Will send you details of all the users!!')
}).
post((req, res, next) => {
    res.end(`will post the new user with username as ${req.body.username} and password as ${req.body.password}`);
})

userRouter.route('/:userID').
all((req,res,next)=>{
    res.sendStatus = 200;
    res.setHeader('content-type','text/plain');
    next();
})
.put((req,res,next)=>{
    res.end(`will update the details with userid = ${req.params.userID}`);
})
.delete((req,res,next)=>{

    res.end(`Will delete the user with userID = ${req.params.userID}`)
})


module.exports = userRouter;