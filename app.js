var express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const userRouter = require('./routes/userRouter');
var mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const hostname = 'https://git.heroku.com/nodejs-crud.git';
const port = process.env.PORT || 3000

const url = 'mongodb://sandeshvanwadi:sandesh246@ds039175.mlab.com:39175/heroku_kj33pdl1';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then((db) => {
    console.log('Sucessfully Connected to the server');
},(err) => { console.log(err); })

//app.use(express.static(__dirname + '/public'));
app.use('/api/users', userRouter);

app.use((req, res, next) => {
    res.sendStatus = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>Hey this is express server</h1></body></html>');
})

const server = http.createServer(app);
app.listen(port, () => {
    console.log(`server running on ${port}`)
})