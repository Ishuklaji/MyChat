const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


dotenv.config()
const app = express();
app.use(express.json())
app.use(cors());


connectDB()

app.get("/", (req, res) => {
    res.send("API is running")
})

app.use("/api/user", userRoutes)

app.use('/api/chat', chatRoutes)
// app.get("/api/chat", (req, res) => {
//     res.send(chats)
// })

// app.get("/api/chat/:id", (req, res) => {
//     // console.log(req.params.id)
//     const singleChat = chats.find((c) => c.id === req.params.id)
//     res.send(singleChat)
// })

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(5000, console.log(`server started at http://localhost:${PORT}`.yellow));