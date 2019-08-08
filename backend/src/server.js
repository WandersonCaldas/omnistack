const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server =  express();

mongoose.connect('mongodb+srv://<user>:<pass>@cluster0-ixxhf.mongodb.net/<schema>?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
