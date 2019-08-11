const express = require('express');
const hubsRouter = require('./data/hubs-router')
const dbs = require('./data/db')

const server = express();
server.use(express.json());
server.use(('/api/posts', hubsRouter))

module.exports = server