import React, { useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { IsAuthContext } from '../context/IsAuth'
import Page from '../components/Page'

export default function Index() {
  const [isAuth] = useContext(IsAuthContext)

  const router = useRouter()

  useEffect(() => {
    if (isAuth === null) return

    if (isAuth) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [isAuth])

  return (
    <Page title="Uniconn">
      <CircularProgress color="primary" />
    </Page>
  )
}
