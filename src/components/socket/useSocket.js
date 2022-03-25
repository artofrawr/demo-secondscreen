/* global io */
/* eslint-disable no-console */
import { useRef, useCallback, useEffect, useState } from 'react'

const useSocket = (clientType, onMessage) => {
  const socket = useRef()
  const [connected, setConnected] = useState(false)
  const [handshake, setHandshake] = useState(false)
  const [handshakeDenied, setHandshakeDenied] = useState(false)
  const [id, setId] = useState('')

  const onConnect = useCallback(() => {
    console.log('SOCKET: connected')
    socket.current.emit('setType', clientType)
    setConnected(true)
  }, [clientType])

  const onDisconnect = useCallback(() => {
    console.log('SOCKET: disconnected')
    setConnected(false)
    setHandshake(false)
    setHandshakeDenied(false)
  }, [])

  const onIDReceived = useCallback((newId) => {
    console.log('SOCKET: id received', newId)
    setId(newId)
  }, [])

  const onHandshake = useCallback(() => {
    console.log('SOCKET: handshake')
    setHandshake(true)
    setHandshakeDenied(false)
  }, [])

  const onHandshakeDenied = useCallback(() => {
    console.log('SOCKET: handshake denied')
    setHandshakeDenied(true)
  }, [])

  const onHandshakeEnd = useCallback(() => {
    console.log('SOCKET: handshake ended')
    setHandshake(false)
  }, [])

  const sendMessage = useCallback(
    (data) => {
      if (connected) {
        console.log('SOCKET: send message', data)
        socket.current.emit('sendMessage', JSON.stringify(data))
      }
    },
    [connected]
  )

  const requestHandshake = useCallback((targetID) => {
    setHandshakeDenied(false)
    socket.current.emit('handshakeRequest', targetID)
  }, [])

  const onMessageReceived = useCallback(
    (data) => {
      const parsedData = JSON.parse(data)
      console.log('SOCKET: received message:', parsedData)
      onMessage(parsedData)
    },
    [onMessage]
  )

  const connect = useCallback(() => {
    const newSocket = io()
    socket.current = newSocket

    newSocket.on('connect', onConnect)
    newSocket.on('newID', onIDReceived)
    newSocket.on('messageRecieved', onMessageReceived)
    newSocket.on('handshake', onHandshake)
    newSocket.on('handshakeEnd', onHandshakeEnd)
    newSocket.on('handshakeDenied', onHandshakeDenied)
    newSocket.on('disconnect', onDisconnect)
  }, [
    onConnect,
    onIDReceived,
    onMessageReceived,
    onHandshake,
    onDisconnect,
    onHandshakeEnd,
    onHandshakeDenied,
  ])

  const disconnect = useCallback(() => {
    socket.current.disconnect()
  }, [])

  useEffect(() => {
    connect()
  }, [connect])

  return {
    connected,
    handshake,
    handshakeDenied,
    sendMessage,
    requestHandshake,
    id,
    disconnect,
    connect,
  }
}

export default useSocket
/* eslint-enable no-console */
