import React from 'react'
import Logout from '../components/helpers/Logout'
import Page from '../components/Page'

export default function Home() {
  return (
    <Page title="Home | Uniconn">
      <h1>Home</h1>
      <Logout className="m-4 cursor-pointer" />
    </Page>
  )
}
