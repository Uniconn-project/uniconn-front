import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../../components/Page'
import ProfileInfo from '../../components/global/profile-info/ProfileInfo'
import { fetcher } from '../../hooks/useFetch'
import { MyProfileContext } from '../../contexts/MyProfile'
import ProfileHeader from '../../components/pages/profile/ProfileHeader'
import Projects from '../../components/pages/profile/subpages/Projects'
import Links from '../../components/pages/profile/subpages/Links'

export const getServerSideProps = async context => {
  const profile = await fetcher(`profiles/get-profile/${context.params.slug}`)

  if (!profile || !profile.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      initialProfile: profile
    }
  }
}

export default function Profile({ initialProfile }) {
  const { myProfile } = useContext(MyProfileContext)
  const [profile, setProfile] = useState(initialProfile)
  const [page, setPage] = useState('projects')

  useEffect(() => {
    if (!profile || !myProfile) return

    if (profile.id === myProfile.id) {
      Router.replace('/my-projects')
    }
  }, [profile, myProfile])

  useEffect(() => {
    if (!profile) return
    ;(async () => {
      const projects = await fetcher(
        `profiles/get-profile-projects/${profile.user.username}`
      )
      setProfile({ ...profile, projects })
    })()
  }, [profile])

  if (!myProfile || !profile || !profile.projects) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page
      title={`${profile.first_name} ${profile.last_name} | Uniconn`}
      loginRequired
      header
    >
      <div className="w-full h-full flex flex-col justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProfileInfo profile={profile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProfileHeader profile={myProfile} page={page} setPage={setPage} />
            <div className="w-full px-2">
              {page === 'projects' && <Projects profile={profile} />}
              {page === 'links' && <Links profile={profile} />}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
