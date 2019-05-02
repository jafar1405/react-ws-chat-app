const WebSocketServer = require('ws').Server

const port = process.env.PORT || 8080;

const wss = new WebSocketServer({port:port})


let clients = []

wss.on('connection', (connection) => {
    clients.push(connection)
    broadcast({
        username:'admin',
        message:'A USER HAS ENTERED ROOM'
    })
    
    connection.on('message', (message) => {
        const data = JSON.parse(message)
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