require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// *** socket.io import  ****
const { createServer } = require('node:http');
const { Server } = require('socket.io');


// *** env var ***
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}))

const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: true
    },
    methods: ["GET", "POST"]
  });

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', data)
    })
})

app.get('/', () => {
    console.log('working')
})

server.listen(port, () => {
    console.log(`listening to port: ${port}`);
})