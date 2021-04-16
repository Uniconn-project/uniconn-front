import React, { useState, createContext } from 'react'

export const IsAuthContext = createContext()

export default function IsAuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <IsAuthContext.Provider value={[isAuth, setIsAuth]}>
      {children}
    </IsAuthContext.Provider>
  )
}
