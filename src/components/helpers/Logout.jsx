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

  const handleLogout = () => {
    if (
      window.confirm(
        'Tem certeza que deseja sair? \n Você poderá voltar quando quiser.'
      )
    ) {
      logout()
    }
  }

  return (
    <div className={className} onClick={handleLogout}>
      Sair
    </div>
  )
}
