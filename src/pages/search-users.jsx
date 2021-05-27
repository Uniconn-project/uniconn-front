import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import ProfileInfo from '../components/global/ProfileInfo'
import ProfilesFilter from '../components/pages/search-users/ProfilesFilter'
import { MyProfileContext } from '../contexts/MyProfile'

export default function SearchUser() {
  const { myProfile } = useContext(MyProfileContext)
  const [profiles, setProfiles] = useState([])

  if (!myProfile) {
    return (
      <Page
        title="Encontrar usuários | Uniconn"
        page="search-users"
        loginRequired
        header
      >
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page
      title="Encontrar usuários | Uniconn"
      page="search-users"
      loginRequired
      header
    >
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProfilesFilter profiles={profiles} setProfiles={setProfiles} />
          </div>
        </div>
      </div>
    </Page>
  )
}
