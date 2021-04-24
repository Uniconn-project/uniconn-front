import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import Router from 'next/router'
import { AuthContext } from '../contexts/Auth'

export default function Index() {
  const { loading, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    console.log('index')
    if (loading) return

    if (isAuthenticated) {
      Router.replace('/home')
    } else {
      Router.replace('/login')
    }
  }, [loading, isAuthenticated])

  return (
    <div>
      <Head>
        <title>Uniconn</title>
      </Head>
      <div className="w-screen h-screen">
        <div
          className={'w-full h-full flex flex-col justify-center items-center'}
        >
          <CircularProgress color="primary" />
        </div>
      </div>
    </div>
  )
}
