import React, { useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/IsAuth'
import Page from '../components/Page'

export default function Index() {
  const [auth] = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (!auth) return

    if (auth.is_auth) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [auth, router])

  return (
    <Page title="Uniconn">
      {console.log(auth)}
      <CircularProgress color="primary" />
    </Page>
  )
}
