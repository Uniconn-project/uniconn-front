import React, { createContext, useState } from 'react'

export const MyProfileContext = createContext()

export default function MyProfileProvider({ children }) {
  const [myProfile, setMyProfile] = useState(null)

  return (
    <MyProfileContext.Provider value={{ myProfile, setMyProfile }}>
      {children}
    </MyProfileContext.Provider>
  )
}
