const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

const broadcast = (data, cb) => wss.clients.forEach(
  client => {
    if (client.readyState === WebSocket.OPEN)
      client.send(data, cb);
  }
)

wss.on('connection', ws => {
  console.log(`[SERVER] Connection`)

  ws.on('message', msg => {
    console.log(`[SERVER] Received: ${msg}`)
    setTimeout(() => {
      broadcast(msg, err => err && console.log(`[SERVER] Error: ${err}`));
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

console.log('[SERVER] Listen on port 3000');
