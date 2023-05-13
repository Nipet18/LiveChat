const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const MongoClient = require('mongodb').MongoClient;
//const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';
const uri = 'mongodb+srv://admin:nxybjdfDrgWWvABi@chatdbcluster.0ykx1rd.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// create a new map to store connected users
const usersMAP = new Map();

client.connect(err => {
    const collection = client.db("ChatDB").collection("messages");
    // perform actions on the collection object
    client.close();
});

// Set up Socket.IO event listeners
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('new-user', (data) => {
        console.log(`${data} has joined room: ${data}`);
        usersMAP.set(socket.id, data);
        io.emit('user-connected', Array.from(usersMAP.values()));
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        usersMAP.delete(socket.id);
        io.emit('user-disconnected', Array.from(usersMAP.values()));
    });

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('addUser', (user) => {
        const collection = client.db("test").collection("users");
        collection.insertOne(user, (err, result) => {
            if (err) throw err;
            socket.emit('userAdded', result.ops[0]);
        });
    });

    socket.on('getUsers', () => {
        const collection = client.db("test").collection("users");
        collection.find({}).toArray((err, docs) => {
            if (err) throw err;
            socket.emit('usersList', docs);
        });
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});



// Start the server
server.listen(3001, () => {
    console.log("SERVER RUNNING");
});