import React, { useContext } from 'react'
import Head from 'next/head'
import Header from '../components/header/Header'
import { AuthContext } from '../contexts/Auth'

export default function InternalServerError500() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>500 | Uniconn</title>
      </Head>
      <div className="w-screen h-screen">
        {isAuthenticated && <Header />}
        <div className="h-full flex justify-center items-center">
          <h1>
            <span className="color-secondary">500. </span> Erro interno do
            servidor
          </h1>
        </div>
      </div>
    </>
  )
}
