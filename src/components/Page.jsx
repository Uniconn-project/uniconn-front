import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import Header from './header/Header'
import { AuthContext } from '../contexts/Auth'

export default function Page({
  children,
  title,
  page,
  className = '',
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

  if (
    !loading &&
    ((loginRequired && isAuthenticated) || (!loginRequired && !isAuthenticated))
  ) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="w-screen min-h-screen">
          {header && <Header page={page} />}
          <div
            className={`w-full h-full flex flex-col justify-start items-center ${
              header ? 'pt-24 sm:pt-32' : ''
            } ${className}`}
          >
            {children}
          </div>
        </div>
      </>
    )
  }

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
