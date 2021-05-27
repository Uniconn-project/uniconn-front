import React, { useContext, useEffect, useState } from 'react'
import Page from '../../components/Page'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileInfo from '../../components/global/ProfileInfo'
import { fetcher } from '../../hooks/useFetch'
import { MyProfileContext } from '../../contexts/MyProfile'
import Router from 'next/router'
import Projects from '../../components/global/Projects'

export const getStaticProps = async context => {
  const profile = await fetcher(`profiles/get-profile/${context.params.slug}`)

  return {
    props: {
      profile: profile
    }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default function Profile({ profile }) {
  const { myProfile } = useContext(MyProfileContext)
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    if (!profile || !myProfile) return

    if (profile.id === myProfile.id) {
      Router.replace('/profile')
    }
  }, [profile, myProfile])

  useEffect(() => {
    if (!profile) return
    ;(async () => {
      const data = await fetcher(
        `profiles/get-profile-projects/${profile.user.username}`
      )
      await setProjects(data)
    })()
  }, [profile])

  if (!profile) {
    return (
      <Page loginRequired header>
        <CircularProgress />
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
            <div className="h-full px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProfileInfo profile={profile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 bg-light w-full h-14 rounded-md shadow-lg p-2 mb-4 flex justify-center items-center sm:top-32">
              {projects !== null ? (
                <span>Projetos ({projects.length})</span>
              ) : (
                <CircularProgress size={30} />
              )}
            </div>
            <div className="w-full px-2">
              <Projects projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
