import React from 'react'
import Page from '../../components/Page'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileInfo from '../../components/global/ProfileInfo'
import { fetcher } from '../../hooks/useFetch'

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
      <ProfileInfo profile={profile} />
    </Page>
  )
}
