const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { chats } = require('./data/data');

const app = express();
app.use(express.json())
app.use(cors());

dotenv.config()

app.get("/", (req, res) => {
    res.send("API is running")
})

app.get("/api/chat", (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c.id === req.params.id)
    res.send(singleChat)
})


const PORT = process.env.PORT || 3000
app.listen(5000, console.log(`server started at http://localhost:${PORT}`));