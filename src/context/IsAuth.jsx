import React, { useState, createContext, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)

  const { data } = useFetch('profiles/is-auth')

  useEffect(() => {
    setAuth(data)
  }, [data])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}
