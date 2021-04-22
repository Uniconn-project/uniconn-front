import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import Header from '../components/Header'
import { MyProfileContext } from '../context/MyProfile'

export default function Home() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Home | Uniconn" loginRequired>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Home | Uniconn" loginRequired>
      <div className="flex flex-col w-full h-full justify-start items-center">
        <Header />
        <div className="flex h-full justify-center items-center">
          <h1>Bem vindo, {myProfile.first_name}!</h1>
        </div>
      </div>
    </Page>
  )
}
