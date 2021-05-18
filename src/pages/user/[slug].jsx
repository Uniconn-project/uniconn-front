import React, { useContext, useEffect } from 'react'
import Page from '../../components/Page'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileInfo from '../../components/global/ProfileInfo'
import { fetcher } from '../../hooks/useFetch'
import { MyProfileContext } from '../../contexts/MyProfile'
import Router from 'next/router'

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

  useEffect(() => {
    if (!profile || !myProfile) return

    if (profile.id === myProfile.id) {
      Router.replace('/profile')
    }
  }, [profile, myProfile])

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
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileInfo profile={profile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 bg-light w-full h-14 rounded-md shadow-lg p-2 mb-4 flex justify-center items-center sm:top-32"></div>
          </div>
        </div>
      </div>
    </Page>
  )
}
