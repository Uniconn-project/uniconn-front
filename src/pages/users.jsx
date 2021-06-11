import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import ProfilesFilter from '../components/pages/users/ProfilesFilter'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'
import ProfileListItem from '../components/global/ProfileListItem'

export default function SearchUser() {
  const { myProfile } = useContext(MyProfileContext)
  const [initialProfiles, setInitialProfiles] = useState([])
  const [renderedProfiles, setRenderedProfiles] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await fetcher('profiles/get-profile-list')
      if (!renderedProfiles.length) setRenderedProfiles(data)
      setInitialProfiles(data)
    })()
  }, []) //eslint-disable-line

  if (!myProfile) {
    return (
      <Page
        title="Encontrar usuários | Uniconn"
        page="search-users"
        loginRequired
        header
      >
        <CircularProgress />
      </Page>
    )
  }

  return (
    <Page title="Usuários | Uniconn" page="users" loginRequired header>
      <div className="flex justify-center w-full h-full">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProfilesFilter
              initialProfiles={initialProfiles}
              profiles={renderedProfiles}
              setProfiles={setRenderedProfiles}
            />
            <div className="w-full" style={{ maxWidth: 600 }}>
              {renderedProfiles.map(profile => (
                <ProfileListItem key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
