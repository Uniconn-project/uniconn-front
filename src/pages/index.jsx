import React, { useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Router from 'next/router'
import { AuthContext } from '../context/Auth'
import Page from '../components/Page'

export default function Index() {
  const { loading, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (loading) return

    if (isAuthenticated) {
      Router.replace('/home')
    } else {
      Router.replace('/login')
    }
  }, [loading, isAuthenticated])

  return (
    <Page title="Uniconn">
      {console.log(isAuthenticated)}
      <CircularProgress color="primary" />
    </Page>
  )
}
