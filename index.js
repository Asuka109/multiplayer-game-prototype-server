const WebSocketServer = require('./websocket')

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', ws => {
  console.log(`[SERVER] Connection`)

  ws.on('message', msg => {
    console.log(`[SERVER] Received: ${msg}`)
    setTimeout(() => {
      wss.broadcast(msg, err => err && console.log(`[SERVER] Error: ${err}`))
    }, Math.random() * 100)
    
  })
  
  ws.send(JSON.stringify({
    id: 0,
    frameType: 'StatusFrame',
    status: [
      { userId: "asd", pos: [1000, 1000] }
    ]
  }))
})

console.log('[SERVER] Listen on port 3000')
