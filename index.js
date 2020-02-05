require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// const passport = require('passport')
const router = require('./Config/routes')
const http = require('http').createServer(app)
const io = require('socket.io').listen(http)

//for heroku 
const path = require("path")
const port = process.env.PORT

http.listen(3001, function(){
  console.log('listening on *:3001')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg, user)
  })
  socket.on("disconnect", () => 
    console.log("Client disconnected"))
})

// app.use(passport.initialize())
// require('./Middlewares/passport-local')
// require('./Middlewares/passport-jwt')

app.use(express.json())
app.use(cors())

app.use('/chat', router)

app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port ,() =>{
    console.log('Listening on port', port)
})
