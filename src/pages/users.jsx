import React, { useContext, useCallback, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import ProfilesFilter from '../components/pages/users/ProfilesFilter'
import { MyProfileContext } from '../contexts/MyProfile'
import useFetch from '../hooks/useFetch'
import ProfileListItem from '../components/global/ProfileListItem'
import { mutate } from 'swr'

export default function Users() {
  const { myProfile } = useContext(MyProfileContext)
  const { data: baseProfiles } = useFetch('profiles/get-profile-list')

  const [scrollCount, setScrollCount] = useState(1)
  const [renderedProfiles, setRenderedProfiles] = useState([])
  const [profilesAreFiltered, setProfilesAreFiltered] = useState(false)

  const handleScroll = useCallback(() => {
    if (profilesAreFiltered) return

    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      setScrollCount(scrollCount => scrollCount + 1)
    }
  }, [profilesAreFiltered])

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_HOST
      }/api/profiles/get-profile-list?length=${scrollCount * 20}`
    )
      .then(response => response.json())
      .then(data => {
        mutate('profiles/get-profile-list', data, false)
        setRenderedProfiles(data.profiles)
      })
  }, [scrollCount])

  useEffect(() => {
    if (!baseProfiles) return
    setProfilesAreFiltered(
      baseProfiles.profiles.length > renderedProfiles.length
    )
  }, [baseProfiles, renderedProfiles])

  useEffect(() => {
    if (!baseProfiles || renderedProfiles.length) return
    setRenderedProfiles(baseProfiles.profiles)
  }, [baseProfiles]) //eslint-disable-line

  if (!myProfile || !baseProfiles) {
    return (
      <Page title="Usuários | Uniconn" page="users" loginRequired header>
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
              baseProfiles={baseProfiles.profiles}
              profiles={renderedProfiles}
              setProfiles={setRenderedProfiles}
            />
            <div className="w-full px-2" style={{ maxWidth: 600 }}>
              {renderedProfiles.map(profile => (
                <ProfileListItem key={profile.id} profile={profile} />
              ))}
              {!profilesAreFiltered && !baseProfiles.isall && (
                <div className="w-full flex justify-center p-4">
                  <CircularProgress size={30} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
