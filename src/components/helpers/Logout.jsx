import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import { AuthContext } from '../../context/Auth'

export default function Logout({ className }) {
  const { isAuthenticated, logout } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push({
        pathname: '/login',
        query: {
          success: 'Deslogado com sucesso'
        }
      })
    }
  }, [isAuthenticated])

  return (
    <div className={className} onClick={logout}>
      Sair
    </div>
  )
}
