const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000;
var mongoose = require('mongoose')

var express = require('express')
var mongoose = require('mongoose')
const bodyparser = require("body-parser")
const passport = require("passport")
port =  5000
//bring all the routes
const auth = require("./routes/api/auth")
const profile = require("./routes/api/profile")

const server = express();


const db = require("./setup/myurl").mongoURL

//attempt to connect to database
mongoose.connect(db).then(() => console.log("connected"))
.catch((err)=> console.log(err))

//actal
//passport middleware
app.use(passport.initialize());
//jwt stratagy configration
require("./strategy/jsonstratagy")(passport)


const cors = require('cors');
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'client-bundle', 'build')));

const apiRouter = require('./routes/api');
server.use('/api', apiRouter);

server.get('/*', (req, res) => {
    const filePath = path.join(__dirname, 'client-bundle', 'build', 'index.html');
    res.sendFile(filePath);
});

server.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

server.use((err, req, res, next) => {
    // set locals, only providing error in development
    const env = req.app.get('env');
    const response = {
        message: err.message,
        err: env === 'development' ? err : {},
    };
    res.status(err.status || 500).send(response);
});

server.use('/api/auth', auth)
server.use('/api/profile', profile)

server.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});
