import React, { useContext } from 'react'
import Head from 'next/head'
import Header from '../components/header/Header'
import { AuthContext } from '../contexts/Auth'

export default function NotFound404() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>404 | Uniconn</title>
      </Head>
      <div className="w-screen h-screen">
        {isAuthenticated && <Header />}
        <div className="h-full flex justify-center items-center">
          <h1>
            <span className="color-secondary">404. </span> Página não encontrada
          </h1>
        </div>
      </div>
    </>
  )
}
