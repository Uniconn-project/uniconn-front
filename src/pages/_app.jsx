import '../styles/global.scss'
import '../styles/header.scss'
import '../styles/utils/background.scss'
import '../styles/material-ui/alert.scss'
import '../styles/material-ui/icon.scss'
import '../styles/material-ui/input.scss'
import '../styles/material-ui/loader.scss'
import '../styles/material-ui/mobile_menu.scss'

import React, { useEffect } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import AuthProvider from '../contexts/Auth'
import MyProfileProvider from '../contexts/MyProfile'

export default function MyApp(props) {
  const { Component, pageProps } = props

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
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
          <Component {...pageProps} />
        </MyProfileProvider>
      </AuthProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
