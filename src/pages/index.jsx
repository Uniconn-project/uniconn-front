import React, { useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/Auth'
import Page from '../components/Page'

export default function Index() {
  const { loading, isAuthenticated } = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (isAuthenticated) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [loading, isAuthenticated, router])

  return (
    <Page title="Uniconn" center>
      <CircularProgress color="primary" />
    </Page>
  )
}
