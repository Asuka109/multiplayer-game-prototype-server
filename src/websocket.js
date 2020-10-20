const WebSocket = require('ws')

const returnAsIs = clients => clients
const defaultSendCallback = err => err && console.log(`[SERVER] Error: ${err}`)

class WebSocketServer extends WebSocket.Server {
  broadcast(data, filter=returnAsIs, cb=defaultSendCallback) {
    const _data = typeof data === 'string' ? data : JSON.stringify(data)
    filter(this.clients).forEach(
      client => {
        if (client.readyState === WebSocket.OPEN)
          client.send(_data, cb);
      }
    )
  }
}

module.exports = WebSocketServer
