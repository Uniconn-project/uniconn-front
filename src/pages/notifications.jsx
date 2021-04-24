import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'

export default function Notifications() {
  const { loading } = useContext(AuthContext)
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Notificações | Uniconn" loginRequired={!loading} center>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page
      title="Notificações | Uniconn"
      page="notifications"
      loginRequired
      header
    >
      <div className="flex h-full justify-center items-center">
        <h1>Notificações</h1>
      </div>
    </Page>
  )
}
