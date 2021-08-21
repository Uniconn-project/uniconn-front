import React, { createContext, useContext, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { AuthContext } from './Auth'
import { fetcher } from '../hooks/useFetch'

const isDev = process.env.NODE_ENV === 'development'

export const WebSocketsContext = createContext()

export default function WebSocketsProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io('ws://localhost:3030')

    socketRef.current.on('connect', () => {
      isDev && console.log('WebSockets connected')
    })

    socketRef.current.on('message', data => {
      fetchMessages()
      fetchChats()
    })

    return () => socketRef.current.disconnect()
  }, [])

  return (
    <WebSocketsContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </WebSocketsContext.Provider>
  )
}
