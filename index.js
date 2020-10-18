const WebSocketServer = require('./websocket')

const wss = new WebSocketServer({ port: 3000 })

const send = (ws, data) => {
  const _data = typeof data === 'string' ? data : JSON.stringify(data)
  ws.send(_data)
}

let playerCount = 0
let actionPool = []

wss.on('connection', (ws, req) => {
  console.log(`[SERVER] Connection: [${req.connection.remoteAddress}]`)

  ws.on('message', msg => {
    console.log(`[SERVER] Received: ${msg}`)
    const frame = JSON.parse(msg)
    if (frame.frameType === 'InfoFrame') {
      if (frame.info === 'ready') {
        playerCount ++
        if (playerCount >= 2)
          wss.broadcast(msg, err => err && console.log(`[SERVER] Error: ${err}`))
      }
      return
    }
    if (frame.frameType === 'ActionFrame') {
      actionPool.push(frame.actions)
    }
  })
  
  send(ws, {
    id: 0,
    frameType: 'StatusFrame',
    status: [
      { userId: "asd", pos: [1000, 1000] }
    ]
  })
})

setInterval(() => {
  const actionsDict = {}
  actionPool.forEach(actions => {
    actions.forEach(action => {
      if (action.userId in actionsDict) {
        const [x, y] = actionsDict[action.userId].movement
        const [_x, _y] = action.movement
        actionsDict[action.userId].movement = [x + _x, y + _y]
      } else {
        actionsDict[action.userId] = action
      }
    })
  })
  actionPool = []
  const actions = Object.values(actionsDict)
  const frame = {
    id: 0,
    frameType: 'ActionFrame',
    actions
  }
  wss.broadcast(frame)

}, 1000 / 30)

console.log('[SERVER] Listen on port 3000')
