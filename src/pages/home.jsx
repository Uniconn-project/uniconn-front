import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'

export default function Home() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Home | Uniconn" loginRequired center>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Home | Uniconn" loginRequired header>
      <div className="flex h-full justify-center items-center">
        <h1>Bem vindoo, {myProfile.first_name}!</h1>
      </div>
    </Page>
  )
}
