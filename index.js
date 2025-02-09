require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// *** socket.io import  ****
const { createServer } = require('node:http');
const { Server } = require('socket.io');


// *** env var ***
const port = process.env.PORT;

// *** server init ***
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}))

// *** express & socket init ***

const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: true
    },
    methods: ["GET", "POST"]
  });
const connectedUser = {};

io.on('connection', (socket) => {
    console.log(`A user connected with socket id: ${socket.id}`);
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', data)
    })
    socket.on('loggedin-user', (data) => {
        connectedUser[data.userId] = socket.id;
    });
    socket.on('private-msg', (data) => {
        io.to(connectedUser[data.receiverId]).emit('private-msg', data);
    })
})

app.get('/', () => {
    console.log('working')
})

server.listen(port, () => {
    console.log(`listening to port: ${port}`);
})