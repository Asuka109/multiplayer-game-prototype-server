const WebSocket = require('ws')

const returnAsIs = clients => clients

class WebSocketServer extends WebSocket.Server {
  broadcast(data, cb, filter=returnAsIs) {
    filter(this.clients).forEach(
      client => {
        if (client.readyState === WebSocket.OPEN)
          client.send(data, cb);
      }
    )
  }
}

module.exports = WebSocketServer
