var express = require('express');
//const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const userRouter = require('./routes/userRouter');
var mongoose = require('mongoose');



const app = express();
//app.use(morgan('dev'));
app.use(bodyParser.json());


const url = 'mongodb://localhost:27017/usersData';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then((db) => {
    console.log('Sucessfully Connected to the server');
}, (err) => {
    console.log(err);
})

const hostname = 'localhost';
const port = 3500;

app.use(express.static(__dirname + '/public'));


app.use('/api/users', userRouter);


app.use((req, res, next) => {
    res.sendStatus = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>Hey this is express server</h1></body></html>');
})

const server = http.createServer(app);
app.listen(port, hostname, () => {
    console.log(`server running on http://${hostname}:${port}`)
})