const cors = require('cors');
const db = require('./database');
const simulateCurrencyUpdates = require('./simulateCurrencyUpdates');
const connectSocket = require('./socketIo');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:19006'
    }
});

const port = Number(process.env.npm_config_port) || 3000;

app.use(cors({ origin: 'http://localhost:19006' }));
app.use(express.json({ limit: '10mb' }))

app.get('/', (req, res) => {
    res.json({ hello: 'hello' });
});

const sockets = connectSocket(io);
simulateCurrencyUpdates((data) => sockets.notifyClients('currency', data));

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});


