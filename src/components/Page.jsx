import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import Header from './Header'
import { AuthContext } from '../contexts/Auth'

export default function Page({
  children,
  title,
  page,
  loginRequired = false,
  header = false
}) {
  const { isAuthenticated, loading } = useContext(AuthContext)

  useEffect(() => {
    if (loading) return

    if (
      (loginRequired && !isAuthenticated) ||
      (!loginRequired && isAuthenticated)
    ) {
      Router.replace('/')
    }
  }, [loginRequired, isAuthenticated, loading])

  if (loading) {
    return (
      <div>
        <Head>
          <title>Uniconn</title>
        </Head>
        <div className="w-screen h-screen">
          <div
            className={
              'w-full h-full flex flex-col justify-center items-center'
            }
          >
            <CircularProgress color="primary" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-screen h-screen">
        <div
          className={
            'w-full h-full flex flex-col justify-start items-center pt-28 sm:pt-32'
          }
        >
          {header && <Header page={page} />}
          {children}
        </div>
      </div>
    </div>
  )
}
