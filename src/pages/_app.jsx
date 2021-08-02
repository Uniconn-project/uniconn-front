import '../styles/global.scss'
import '../styles/header.scss'
import '../styles/landing-page/landing_page.scss'
import '../styles/utils/background.scss'
import '../styles/utils/border.scss'
import '../styles/utils/breakpoints.scss'
import '../styles/utils/color.scss'
import '../styles/utils/hover.scss'
import '../styles/utils/transition.scss'
import '../styles/utils/image.scss'
import '../styles/material-ui/alert.scss'
import '../styles/material-ui/badge.scss'
import '../styles/material-ui/checkbox.scss'
import '../styles/material-ui/icon.scss'
import '../styles/material-ui/input.scss'
import '../styles/material-ui/list_item.scss'
import '../styles/material-ui/loader.scss'
import '../styles/material-ui/mobile_menu.scss'
import '../styles/material-ui/popover.scss'
import '../styles/material-ui/switch.scss'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import AuthProvider from '../contexts/Auth'
import MyProfileProvider from '../contexts/MyProfile'
import NotificationsProvider from '../contexts/Notifications'
import ThemeProvider from '../contexts/Theme'
import Header from '../components/header/Header'

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = url => {
      if (!url.includes) return
      if (
        url.includes('/project/') ||
        url.includes('/projects/') ||
        url.includes('/user/')
      ) {
        setLoading(true)
      }
    }
    const end = url => {
      if (!url.includes) return
      if (
        url.includes('/project/') ||
        url.includes('/projects/') ||
        url.includes('/user/')
      ) {
        setLoading(false)
      }
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <AuthProvider>
        <MyProfileProvider>
          <NotificationsProvider>
            <ThemeProvider>
              {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                  <Header />
                  <CircularProgress />
                </div>
              ) : (
                <Component {...pageProps} />
              )}
            </ThemeProvider>
          </NotificationsProvider>
        </MyProfileProvider>
      </AuthProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
