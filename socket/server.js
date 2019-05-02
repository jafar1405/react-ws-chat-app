var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")


let clients = []

wss.on('connection', (connection) => {
    clients.push(connection)
    broadcast({
        username:'admin',
        message:'A USER HAS ENTERED ROOM'
    })


    console.log("websocket connection open")
    
    connection.on('message', (message) => {
        const data = JSON.parse(message)
        console.log(data)
        broadcast(data)
    })
})

setInterval(cleanUp, 100)

function broadcast(message){
    const data = JSON.stringify(message)
    clients.forEach(client => client.send(data))
}

function cleanUp(){
    const clientsLeaving = clients.filter(client => client.readyState === client.CLOSED)
    clients = clients.filter(client => client.readyState !== client.CLOSED)

    clientsLeaving.forEach(client => broadcast({
        username:'admin',
        message:'A USER HAS LEFT THE ROOM'
    }))
}