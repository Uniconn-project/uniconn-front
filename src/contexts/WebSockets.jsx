import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useRef
} from 'react'
import io from 'socket.io-client'
import { MyProfileContext } from './MyProfile'

const isDev = process.env.NODE_ENV === 'development'

export const WebSocketsContext = createContext()

export default function WebSocketsProvider({ children }) {
  const { myProfile } = useContext(MyProfileContext)
  const [socketEvent, setSocketEvent] = useState({
    type: ''
  })

  const socketRef = useRef(null)

  useEffect(() => {
    if (!myProfile.id) return

    socketRef.current = io('ws://localhost:3030')

    socketRef.current.on('connect', () => {
      socketRef.current.emit('initialize', myProfile.id)
      isDev && console.log('WebSockets connected')
    })

    socketRef.current.on('message', chatId => {
      setSocketEvent({
        type: 'message',
        chatId
      })
    })

    socketRef.current.on('notification', () => {
      setSocketEvent({
        type: 'notification'
      })
    })

    socketRef.current.on(
      'message-visualization',
      ({ viewerProfileId, chatId }) => {
        setSocketEvent({
          type: 'message-visualization',
          viewerProfileId,
          chatId
        })
      }
    )

    return () => {
      isDev && console.log('WebSockets disconnected')
      socketRef.current.disconnect()
    }
  }, [myProfile.id])

  return (
    <WebSocketsContext.Provider
      value={{ socket: socketRef.current, socketEvent }}
    >
      {children}
    </WebSocketsContext.Provider>
  )
}
