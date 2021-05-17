import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { fetcher } from '../hooks/useFetch'

export const MyProfileContext = createContext()

export default function MyProfileProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const [myProfile, setMyProfile] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchMyProfile = async () => {
      if (!myProfile) {
        const data = await fetcher('profiles/get-my-profile', {
          Authorization: 'JWT ' + (await getToken())
        })
        setMyProfile(data)
      }
    }

    fetchMyProfile()
  }, [isAuthenticated, myProfile, getToken])

  return (
    <MyProfileContext.Provider value={{ myProfile, setMyProfile }}>
      {children}
    </MyProfileContext.Provider>
  )
}
