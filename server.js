const express = require('express')
const path = require('path')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const nextjs = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = nextjs({ dev })
const nextHandler = nextApp.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000

/**
 * SOCKET SERVER
 */
let clients = []

const checkIfNewId = (newId) => !clients.find((c) => c.id === newId)

const getNewId = () => {
  let newId
  let isNew = false
  while (isNew === false) {
    newId = Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1)
      .toUpperCase()
    isNew = checkIfNewId(newId)
  }
  return newId
}

/**
 * A class, representing a connected client.
 */
class Client {
  constructor(socket) {
    this.socket = socket
    this.id = getNewId()
    this.type = null
    this.connection = null

    this.debug = this.debug.bind(this)
    this.addEventListeners = this.addEventListeners.bind(this)
    this.onSetType = this.onSetType.bind(this)
    this.onHandShakeRequest = this.onHandShakeRequest.bind(this)
    this.handshake = this.handshake.bind(this)
    this.handshakeEnd = this.handshakeEnd.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.sendMessage = this.sendMessage.bind(this)

    this.debug(`new client (total clients: ${clients.length + 1})`)

    // let client know about assigned id
    this.socket.emit('newID', this.id)
    this.addEventListeners()
  }

  debug(str) {
    if (dev || process.env.DEBUG === 'true') {
      console.log(`client(${this.id}): ${str}`) // eslint-disable-line no-console
    }
  }

  addEventListeners() {
    this.socket.on('handshakeRequest', this.onHandShakeRequest.bind(this))
    this.socket.on('setType', this.onSetType.bind(this))
    this.socket.on('sendMessage', this.sendMessage.bind(this))
    this.socket.on('disconnect', this.onDisconnect.bind(this))
  }

  onSetType(type) {
    this.debug(`setType ${type}`)
    this.type = type
  }

  onHandShakeRequest(targetClientID) {
    // see if we can find the client with the specified id
    this.debug(`requesting handshake with client ${targetClientID}`)
    const targetClient = clients.find((client) => client.id === targetClientID)

    if (
      this.type === Client.TYPE.MOBILE &&
      targetClient &&
      targetClient.type === Client.TYPE.DESKTOP &&
      !targetClient.connection
    ) {
      this.debug('handshake success')
      this.handshake(targetClient)
      targetClient.handshake(this)
    } else {
      this.debug('handshake denied')
      this.socket.emit('handshakeDenied')
    }
  }

  handshake(client) {
    this.connection = client
    this.socket.emit('handshake')
  }

  handshakeEnd() {
    this.connection = null
    this.socket.emit('handshakeEnd')
  }

  onDisconnect() {
    if (this.connection) this.connection.handshakeEnd()
    clients = clients.filter((c) => c.id !== this.id)
    this.debug(`disconnected (total clients: ${clients.length})`)
  }

  sendMessage(data) {
    this.debug(`sending message ${data}`)
    if (this.connection) this.connection.socket.emit('messageRecieved', data)
  }
}

Client.TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
}

io.on('connection', (socket) => {
  clients.push(new Client(socket))
})

/**
 * NEXT JS APP
 */

nextApp.prepare().then(() => {
  app.set('trust proxy', 1)

  app.use(
    '/static',
    express.static(path.join(__dirname, 'public'), { maxAge: '365d' })
  )
  app.use(
    '/favicon.ico',
    express.static(path.join(__dirname, 'public', 'favicon.ico'), {
      maxAge: '365d',
    })
  )

  app.use((req, res, next) => {
    nextHandler(req, res).catch((err) => {
      next(err)
    })
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
  })
})
