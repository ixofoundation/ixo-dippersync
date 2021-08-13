require('dotenv').config();
require('log-timestamp');
import * as http from 'http';
import App from './app';
import MongoUtils from './db/mongo_utils';

// Set the port
const port = (process.env.PORT || 8080);

App.set('port', port);
const server = http.createServer(App);
export var io = require('socket.io')(server);

io.on('connection', function (socket) {
  io.emit('success', 'app to explorer connected');
});

let mongoDB = new MongoUtils(server, Number(port));

mongoDB.connectToDb();
