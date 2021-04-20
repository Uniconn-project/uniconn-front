import React, { useState, useEffect, createContext } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_HOST

const makeUrl = endpoint => {
  return API_BASE + endpoint
}

const fetchToken = (username, password) => {
  const url = makeUrl('/token/')
  console.log(url)
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}

const fetchNewToken = () => {
  const url = makeUrl('/token/refresh/')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(0)

  const accessTokenIsValid = () => {
    if (accessToken === '') {
      return false
    }
    const expiry = new Date(accessTokenExpiry)
    console.log('Checking token expiry:', expiry)
    return expiry.getTime() > Date.now()
  }

  const initAuth = async () => {
    setLoading(true)
    if (!accessTokenIsValid()) {
      console.log('Invalid access token so refetching')
      await refreshToken()
    } else {
      setIsAuthenticated(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  const refreshToken = async () => {
    setLoading(true)
    const resp = await fetchNewToken()
    if (!resp.ok) {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }
    const tokenData = await resp.json()
    handleNewToken(tokenData)
    return tokenData.access
  }

  const handleNewToken = data => {
    setAccessToken(data.access)
    const expiryInt = data.access_expires * 1000
    setAccessTokenExpiry(expiryInt)
    setIsAuthenticated(true)
    setLoading(false)
  }

  const login = async (username, password) => {
    const resp = await fetchToken(username, password)
    if (resp.ok) {
      const tokenData = await resp.json()
      handleNewToken(tokenData)
    } else {
      setIsAuthenticated(false)
      setLoading(true)
      // Let the page handle the error
    }
    return resp
  }

  const getToken = async () => {
    // Returns an access token if there's one or refetches a new one
    console.log('Getting access token..')
    if (accessTokenIsValid()) {
      console.log('Getting access token.. existing token still valid')
      return Promise.resolve(accessToken)
    } else if (loading) {
      while (loading) {
        console.log('Getting access token.. waiting for token to be refreshed')
      }
      // Assume this means the token is in the middle of refreshing
      return Promise.resolve(accessToken)
    } else {
      console.log('Getting access token.. getting a new token')
      const token = await refreshToken()
      return token
    }
  }

  const logout = () => {
    setAccessToken('')
    setAccessTokenExpiry(null)
    setIsAuthenticated(false)
    setLoading(true)
    const url = makeUrl('/token/logout/')
    fetch(url, {
      method: 'POST',
      credentials: 'include'
    })
    // TODO: call endpoint to delete cookie
  }

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    getToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
