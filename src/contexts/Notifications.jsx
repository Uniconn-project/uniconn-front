import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { AuthContext } from './Auth'
import { fetcher } from '../hooks/useFetch'

export const NotificationsContext = createContext()

export default function NotificationsProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const [notificationsNumber, setNotificationsNumber] = useState(null)

  const fetchNotificationsNumber = useCallback(async () => {
    const number = await fetcher('profiles/get-notifications-number', {
      Authorization: 'JWT ' + (await getToken())
    })
    setNotificationsNumber(number)
  }, [getToken])

  useEffect(() => {
    if (!isAuthenticated) return

    fetchNotificationsNumber()
    const interval = setInterval(fetchNotificationsNumber, 10000)

    return () => clearInterval(interval)
  }, [isAuthenticated, fetchNotificationsNumber])

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
