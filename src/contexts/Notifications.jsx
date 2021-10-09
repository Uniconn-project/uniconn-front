import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './Auth'
import { WebSocketsContext } from './WebSockets'
import { fetcher } from '../hooks/useFetch'

export const NotificationsContext = createContext()

export default function NotificationsProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const { socketEvent } = useContext(WebSocketsContext)
  const [notificationsNumber, setNotificationsNumber] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return

    fetchNotificationsNumber()
  }, [isAuthenticated]) // eslint-disable-line

  useEffect(() => {
    console.log(socketEvent)
    if (socketEvent.type === 'notification') {
      fetchNotificationsNumber()
    }
  }, [socketEvent]) // eslint-disable-line

  const fetchNotificationsNumber = async () => {
    const number = await fetcher('profiles/get-notifications-number', {
      Authorization: 'JWT ' + (await getToken())
    })
    setNotificationsNumber(number)
  }

  return (
    <NotificationsContext.Provider
      value={{
        notificationsNumber,
        fetchNotificationsNumber
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
