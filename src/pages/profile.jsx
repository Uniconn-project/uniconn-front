import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import { MyProfileContext } from '../context/MyProfile'

export default function MyProfile() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Perfil | Uniconn" loginRequired center>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Perfil | Uniconn" loginRequired header>
      <div className="flex flex-col h-full justify-center items-center">
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
          style={{
            borderRadius: '50%',
            width: '20rem',
            height: '20rem'
          }}
        />
        <h1>
          {myProfile.first_name} {myProfile.last_name}
        </h1>
        <span>@{myProfile.user.username}</span>
      </div>
    </Page>
  )
}
