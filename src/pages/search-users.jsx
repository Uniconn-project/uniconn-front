import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Page from '../components/Page'
import ProfileInfo from '../components/global/ProfileInfo'
import ProfilesFilter from '../components/pages/search-users/ProfilesFilter'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'

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
        <div className="w-full p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProfilesFilter
              initialProfiles={initialProfiles}
              profiles={renderedProfiles}
              setProfiles={setRenderedProfiles}
            />
            <div className="w-full" style={{ maxWidth: 600 }}>
              {renderedProfiles.map(profile => (
                <Link key={profile.id} href={`/user/${profile.user.username}`}>
                  <div className="w-full flex bg-transparent rounded-md shadow-lg p-2 my-3 cursor-pointer bg-hover">
                    <div className="relative mr-2">
                      <img
                        src={process.env.NEXT_PUBLIC_API_HOST + profile.photo}
                        className={`profile-img-md img-${profile.type}`}
                      />
                      {profile.type === 'student' ? (
                        <SchoolIcon className="icon" />
                      ) : (
                        <AssignmentIcon className="icon" />
                      )}
                    </div>
                    <div>
                      <h5>
                        {profile.first_name} {profile.last_name}
                      </h5>
                      <p className="self-start break-all color-secondary">
                        @{profile.user.username}
                      </p>
                    </div>
                    <div className="flex items-center ml-auto mr-4">
                      <span className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {profile.bio}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
