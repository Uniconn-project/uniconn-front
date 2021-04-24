import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Header from './Header'
import { AuthContext } from '../contexts/Auth'

export default function Page({
  children,
  title,
  loginRequired = false,
  center = false,
  header = false
}) {
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (
      (loginRequired && !isAuthenticated) ||
      (!loginRequired && isAuthenticated)
    ) {
      Router.replace('/')
      console.log('page in', loginRequired, isAuthenticated, title)
    }
  }, [loginRequired, isAuthenticated])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-screen h-screen">
        <div
          className={`w-full h-full flex flex-col justify-${
            center ? 'center' : 'start'
          } items-center`}
        >
          {header && <Header />}
          {children}
        </div>
      </div>
    </div>
  )
}
