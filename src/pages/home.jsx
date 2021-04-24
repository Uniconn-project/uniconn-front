import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'

export default function Home() {
  const { loading } = useContext(AuthContext)
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Home | Uniconn" loginRequired={!loading} center>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Home | Uniconn" loginRequired header>
      <div className="flex h-full justify-center items-center">
        <h1>Bem vindo, {myProfile.first_name}!</h1>
      </div>
    </Page>
  )
}
