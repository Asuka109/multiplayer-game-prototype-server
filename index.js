const { Server } = require('ws')

const wss = new Server({ port: 3000 })

wss.on('connection', ws => {
  console.log(`[SERVER] connection()`)
  ws.send(JSON.stringify({
    id: 0,
    frameType: 'StatusFrame',
    status: [
      { id: "asd", pos: [1000, 1000] }
    ]
  }))
  ws.on('message', msg => {
    console.log(`[SERVER] Received: ${msg}`)
    ws.send(msg, err => err && console.log(`[SERVER] error: ${err}`));
  })
})
